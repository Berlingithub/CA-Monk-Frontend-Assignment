// import { useState, useEffect, useCallback } from 'react';
// import { GameState, Question } from '../types';

// const TIMER_DURATION = 30;

// export function useGameState(questions: Question[]) {
//   const [gameState, setGameState] = useState<GameState>({
//     currentQuestionIndex: 0,
//     answers: questions.length > 0
//       ? Array.from({ length: questions.length }, () => Array<string | null>(4).fill(null))
//       : [],
//     timeRemaining: TIMER_DURATION,
//     isComplete: false,
//     score: 0,
//   });

//   const resetTimer = useCallback(() => {
//     setGameState((prev) => ({ ...prev, timeRemaining: TIMER_DURATION }));
//   }, []);

//   const moveToNextQuestion = useCallback(() => {
//     setGameState((prev) => {
//       if (!questions?.length) return prev;

//       if (prev.currentQuestionIndex < questions.length - 1) {
//         return {
//           ...prev,
//           currentQuestionIndex: prev.currentQuestionIndex + 1,
//           timeRemaining: TIMER_DURATION,
//         };
//       } else {
//         // Calculate final score
//         const score = questions.reduce((acc, question, idx) => {
//           const userAnswers = prev.answers[idx];
//           const correctAnswers = question.correctAnswers;
//           return acc + (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers) ? 1 : 0);
//         }, 0);

//         return {
//           ...prev,
//           isComplete: true,
//           score,
//         };
//       }
//     });
//   }, [questions]);

//   useEffect(() => {
//     if (questions?.length > 0) {
//       setGameState((prev) => ({
//         ...prev,
//         answers: Array.from({ length: questions.length }, () => Array<string | null>(4).fill(null)),
//       }));
//     }
//   }, [questions]);

//   useEffect(() => {
//     if (gameState.isComplete || !questions?.length) return;

//     const timer = setInterval(() => {
//       setGameState((prev) => {
//         if (prev.timeRemaining <= 1) {
//           clearInterval(timer);
//           setTimeout(moveToNextQuestion, 0);
//           return { ...prev, timeRemaining: 0 };
//         }
//         return { ...prev, timeRemaining: prev.timeRemaining - 1 };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [gameState.isComplete, moveToNextQuestion, questions?.length]);

//   const setAnswer = useCallback((blankIndex: number, word: string | null) => {
//     setGameState((prev) => {
//       const newAnswers = [...prev.answers];
//       const currentAnswers: (string | null)[] = [...(newAnswers[prev.currentQuestionIndex] || Array<string | null>(4).fill(null))];
//       currentAnswers[blankIndex] = word;
//       newAnswers[prev.currentQuestionIndex] = currentAnswers;
//       return { ...prev, answers: newAnswers };
//     });
//   }, []);

//   return {
//     gameState,
//     setAnswer,
//     moveToNextQuestion,
//     resetTimer,
//   };
// }



import { useState, useEffect, useCallback } from 'react';
import { GameState, Question } from '../types';

const TIMER_DURATION = 30;

export function useGameState(questions: Question[]) {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    answers: questions.length > 0
      ? Array.from({ length: questions.length }, () => Array<string | null>(4).fill(null))
      : [],
    timeRemaining: TIMER_DURATION,
    isComplete: false,
    score: 0,
  });

  const resetTimer = useCallback(() => {
    setGameState((prev) => ({ ...prev, timeRemaining: TIMER_DURATION }));
  }, []);

  const moveToNextQuestion = useCallback(() => {
    setGameState((prev) => {
      if (!questions?.length) return prev;

      if (prev.currentQuestionIndex < questions.length - 1) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          timeRemaining: TIMER_DURATION,
        };
      } else {
        // Calculate final score
        const score = questions.reduce((acc, question, idx) => {
          const userAnswers = prev.answers[idx];
          const correctAnswers = question.correctAnswers;
          return acc + (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers) ? 1 : 0);
        }, 0);

        return {
          ...prev,
          isComplete: true,
          score,
        };
      }
    });
  }, [questions]);

  useEffect(() => {
    if (questions?.length > 0) {
      setGameState((prev) => ({
        ...prev,
        answers: Array.from({ length: questions.length }, () => Array<string | null>(4).fill(null)),
      }));
    }
  }, [questions]);

  useEffect(() => {
    if (gameState.isComplete || !questions?.length) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          setTimeout(moveToNextQuestion, 0);
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isComplete, moveToNextQuestion, questions?.length]);

  const setAnswer = useCallback((blankIndex: number, word: string | null) => {
    setGameState((prev) => {
      const updatedAnswers = [...prev.answers];
      const currentAnswerRow = [...(updatedAnswers[prev.currentQuestionIndex] || Array<string | null>(4).fill(null))];
      currentAnswerRow[blankIndex] = word;
      updatedAnswers[prev.currentQuestionIndex] = currentAnswerRow;

      return {
        ...prev,
        answers: updatedAnswers,
      };
    });
  }, []);

  return {
    gameState,
    setAnswer,
    moveToNextQuestion,
    resetTimer,
  };
}
