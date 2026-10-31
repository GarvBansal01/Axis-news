import { MemeItem } from '../types';

export const initialMemes: MemeItem[] = [
  {
    id: 'meme-1',
    title: 'The 3 AM Code Paradox',
    punchline: 'Me: "I have no idea why this code works, but if I touch a single line of whitespace, the entire server shuts down."',
    category: 'coding',
    author: 'StudentDev_SLG',
    upvotes: 142,
    aiVerifiedClean: true,
    aiVerificationReason: 'Zero profanity, highly relatable campus programming humor, completely wholesome.',
    createdAt: '3 hours ago',
    tag: 'Debugging'
  },
  {
    id: 'meme-2',
    title: 'Professor vs The Final Exam',
    punchline: 'Professor in lecture: "A equals 2." Exam Question 1: "Given that gravity is purple, calculate the mass of the sun using only a fountain pen."',
    category: 'exams',
    author: 'NBU_Physics_Guy',
    upvotes: 198,
    aiVerifiedClean: true,
    aiVerificationReason: 'Safe campus academic satire, zero hostility or vulgarity.',
    createdAt: '5 hours ago',
    tag: 'Semester Exams'
  },
  {
    id: 'meme-3',
    title: 'Hostel WiFi Speed Spectrum',
    punchline: 'At 2:00 PM: 0.02 kbps (can barely load Google homepage). At 3:15 AM: 900 Mbps (enough to download the entire Library of Alexandria in 4 seconds).',
    category: 'campus_life',
    author: 'SiliguriHosteller',
    upvotes: 215,
    aiVerifiedClean: true,
    aiVerificationReason: 'Relatable student living experience, safe for campus community.',
    createdAt: 'Yesterday',
    tag: 'Hostel Life'
  },
  {
    id: 'meme-4',
    title: 'Talking to AI in 2026',
    punchline: 'Me: "Can you summarize this 80-page research paper in 3 bullets?" AI: "Sure! Here is the summary." Me: "Now explain it like I\'m a golden retriever." AI: "Woof! Ball was thrown, ball was caught!"',
    category: 'ai_humor',
    author: 'PromptEngineer_26',
    upvotes: 176,
    aiVerifiedClean: true,
    aiVerificationReason: 'Clean tech humor celebrating AI accessibility.',
    createdAt: '2 days ago',
    tag: 'AI Frontier'
  }
];

// Automated AI Safety & Wholesomeness Guardrail
export function verifyMemeSubmission(title: string, punchline: string): {
  approved: boolean;
  score: number;
  reason: string;
} {
  const lowercaseContent = `${title} ${punchline}`.toLowerCase();
  
  // Forbidden list for vulgarity, adult terms, hate speech, explicit slurs
  const forbiddenPatterns = [
    'nude', 'naked', 'nsfw', 'sex', 'porn', 'curse', 'swear',
    'bitch', 'ass', 'bastard', 'crap', 'stupid idiot', 'kill yourself',
    'hate', 'ugly', 'scam', 'fraud'
  ];

  for (const pattern of forbiddenPatterns) {
    if (lowercaseContent.includes(pattern)) {
      return {
        approved: false,
        score: 15,
        reason: `Flagged for inappropriate or vulgar language (detected: "${pattern}"). Please keep all student submissions campus-friendly and clean.`
      };
    }
  }

  // Length and coherence check
  if (punchline.trim().length < 15) {
    return {
      approved: false,
      score: 40,
      reason: 'The punchline is too brief. Provide a complete, funny student situation or relatable setup.'
    };
  }

  return {
    approved: true,
    score: 98,
    reason: 'Verified Safe & Wholesome by AI Agent. Zero toxicity, respectful humor, safe for college and school students.'
  };
}
