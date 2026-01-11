
export type ClassLevel = '9' | '10' | '11' | '12';
export type Difficulty = 'Low' | 'Medium' | 'High';
export type Section = 'dashboard' | 'ai-friend' | 'question-bank' | 'notes' | 'expected-questions' | 'papers' | 'profile' | 'science-hub' | 'answer-portal' | 'community';

export interface User {
  name: string;
  class: ClassLevel;
  board: string;
  goal?: string;
  avatarId: number;
  points: number;
  streak: number;
  lastActive?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface QuestionBankItem {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  type: 'MCQ' | 'Subjective' | 'Numerical';
}

export interface DPPItem {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  type: 'MCQ' | 'Subjective' | 'Numerical';
}

export interface CommunityUpdate {
  id: string;
  user: string;
  action: string;
  subject: string;
  timestamp: string;
}

export interface ResourceItem {
  title: string;
  content: string;
}
