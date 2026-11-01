// Bulletproof audio engine for Web Speech API & WhatsApp-style subtle notification sounds

export function isAudioChimeMuted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('axis_chime_muted') === 'true';
}

export function setAudioChimeMuted(muted: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('axis_chime_muted', muted ? 'true' : 'false');
}

/**
 * WhatsApp-style soft, pleasant dual-harmonic notification ping.
 * Uses gentle sine waves with soft attack (zero audio click) and a natural bell decay.
 */
export function playAudioChime() {
  if (isAudioChimeMuted()) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Master volume: soft and subtle (never harsh or annoying)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.04, now);
    masterGain.connect(ctx.destination);

    // Tone 1: Gentle initial warm tap (A5 - 880 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    
    // Soft 10ms fade-in to eliminate sharp pop, then gentle decay
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.05, now + 0.012);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    osc1.connect(gain1);
    gain1.connect(masterGain);

    // Tone 2: Classic WhatsApp-style sweet harmonic chime (E6 - 1318.5 Hz) offset by 35ms
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1318.51, now + 0.035);
    
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.setValueAtTime(0.0001, now + 0.035);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.048);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(masterGain);

    osc1.start(now);
    osc1.stop(now + 0.16);

    osc2.start(now + 0.035);
    osc2.stop(now + 0.38);
  } catch (err) {
    console.debug('AudioContext not available:', err);
  }
}

export function speakText(
  text: string,
  rate: number = 1.0,
  onEnd?: () => void,
  onError?: () => void
): boolean {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported on this browser.');
    return false;
  }

  try {
    // Play subtle chime to confirm speaker activation
    playAudioChime();

    // Reset and resume speech engine
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    // Try finding an English or natural voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const preferredVoice = voices.find(
        (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('India'))
      ) || voices.find((v) => v.lang.startsWith('en'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      if (onError) onError();
    };

    // Chrome bug workaround: periodic resume during long speech
    const resumeTimer = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(resumeTimer);
      } else if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 5000);

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Failed to trigger speech synthesis:', err);
    if (onError) onError();
    return false;
  }
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
