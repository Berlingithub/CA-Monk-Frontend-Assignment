export interface Word {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  sentence: string;
  blanks: number[];
  options: Word[];
  correctAnswers: string[];
}

export interface GameState {
  currentQuestionIndex: number;
  answers: (string | null)[];
  timeRemaining: number;
  isComplete: boolean;
  score: number;
}

export interface QuestionResponse {
  questions: Question[];
}