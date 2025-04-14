
import { Question as QuestionType } from '../types';
import { Timer } from './Timer';

interface QuestionProps {
  question: QuestionType;
  selectedWords: (string | null)[];
  timeRemaining: number;
  onSelectWord: (index: number, word: string | null) => void;
  onNext: () => void;
}

export function Question({ question, selectedWords, timeRemaining, onSelectWord, onNext }: QuestionProps) {
 
  if (!question || !question.sentence || !question.options || !question.blanks) {
    return <div className="p-6 text-center text-gray-500">Loading question...</div>;
  }

  const words = question.sentence.split(' ');
  const availableWords = question.options.filter(
    option => !selectedWords.includes(option.text)
  );

  const isComplete = selectedWords.every(word => word !== null);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <Timer timeRemaining={timeRemaining} />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Complete the sentence:</h2>
        <div className="flex flex-wrap gap-2 items-center text-lg">
          {words.map((word, index) => {
            if (question.blanks.includes(index)) {
              const blankIndex = question.blanks.indexOf(index);
              const selectedWord = selectedWords[blankIndex];

              return (
                <button
                  key={index}
                  onClick={() => selectedWord && onSelectWord(blankIndex, null)}
                  className={`min-w-20 px-3 py-1 rounded ${
                    selectedWord
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      : 'bg-gray-100 border-2 border-dashed border-gray-300'
                  }`}
                >
                  {selectedWord || '_____'}
                </button>
              );
            }
            return <span key={index}>{word}</span>;
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">Available words:</h3>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word) => (
            <button
              key={word.id}
              onClick={() => {
                const emptyIndex = selectedWords.findIndex(w => w === null);
                if (emptyIndex !== -1) {
                  onSelectWord(emptyIndex, word.text);
                }
              }}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 transition-colors"
            >
              {word.text}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isComplete}
          className={`px-6 py-2 rounded-lg text-white transition-colors ${
            isComplete
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

