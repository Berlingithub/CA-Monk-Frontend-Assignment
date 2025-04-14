// import React from 'react';
import { Question } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultsProps {
  questions: Question[];
  answers: (string | null)[][];
  score: number;
  onRestart: () => void;
}

export function Results({ questions, answers, score, onRestart }: ResultsProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Results</h2>
        <div className="text-5xl font-bold text-blue-600">
          {score} / {questions.length}
        </div>
        <p className="text-gray-600 mt-2">
          {score === questions.length
            ? "Perfect score! Excellent work! 🎉"
            : score >= questions.length / 2
            ? "Good job! Keep practicing! 👍"
            : "Keep practicing to improve! 💪"}
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswers = answers[index];
          const isCorrect = JSON.stringify(userAnswers) === JSON.stringify(question.correctAnswers);

          return (
            <div
              key={question.id}
              className={`p-4 rounded-lg border ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <h3 className="font-medium">Question {index + 1}</h3>
              </div>

              <div className="mb-2">
                <p className="text-gray-700">Your answer:</p>
                <p className="font-medium">{question.sentence}</p>
              </div>

              {!isCorrect && (
                <div className="mt-2 pt-2 border-t border-red-200">
                  <p className="text-gray-700">Correct answer:</p>
                  <p className="font-medium text-green-700">
                    {question.sentence}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}