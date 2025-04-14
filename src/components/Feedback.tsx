// import { GameState, Question } from '../types';

// interface FeedbackProps {
//   gameState: GameState;
//   questions: Question[];
// }

// export function Feedback({ gameState, questions }: FeedbackProps) {
//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">Your Results</h2>
//       <p className="text-lg mb-6">Score: {gameState.score} / {questions.length}</p>

//       {questions.map((question, idx) => {
//         const userAnswers = gameState.answers[idx];
//         const isCorrect = JSON.stringify(userAnswers) === JSON.stringify(question.correctAnswers);

//         return (
//           <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50">
//             <p className="font-semibold mb-2">Q{idx + 1}: {question.sentence}</p>
//             <p className="mb-1">
//               Your Answers: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
//                 {userAnswers.join(', ')}
//               </span>
//             </p>
//             {!isCorrect && (
//               <p className="text-green-600">
//                 Correct Answers: {question.correctAnswers.join(', ')}
//               </p>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }


import { Question } from '../types';

interface FeedbackProps {
  questions: Question[];
  userAnswers: (string | null)[][];
  score: number;
}

export function Feedback({ questions, userAnswers, score }: FeedbackProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Quiz Feedback</h2>
      <p className="text-lg mb-4">Your score: <strong>{score}/10</strong></p>

      {questions.map((question, idx) => {
        const userAnswer = userAnswers[idx];
        const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswers);

        return (
          <div key={idx} className="mb-6 p-4 border rounded-md">
            <h3 className="font-semibold">Q{idx + 1}: {question.sentence}</h3>
            <p>
              <strong>Your answer:</strong>{" "}
              {userAnswer.filter(Boolean).join(' ')}
            </p>
            {!isCorrect && (
              <p className="text-red-600">
                <strong>Correct answer:</strong>{" "}
                {question.correctAnswers.filter(Boolean).join(' ')}
              </p>
            )}
            <p className={`mt-1 font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✔ Correct' : '✘ Incorrect'}
            </p>
          </div>
        );
      })}
    </div>
  );
}

