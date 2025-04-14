import { useEffect, useState, useCallback } from 'react';
import { Question as QuestionType } from './types';
import { Question } from './components/Question';
import { Results } from './components/Results';
import { useGameState } from './hooks/useGameState';
import { BookOpen } from 'lucide-react';

const API_URL = 'https://raw.githubusercontent.com/yghugardare/Sample/main/sample.json';

interface ApiResponse {
  data?: {
    questions?: QuestionType[];
  };
}

function isValidApiResponse(data: unknown): data is ApiResponse {
  return !!data && typeof data === 'object' && 'data' in data;
}

function App() {
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL, { signal });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data: unknown = await response.json();
      
      if (!isValidApiResponse(data)) {
        throw new Error('Invalid API response structure');
      }
      
      if (!data.data?.questions?.length) {
        throw new Error('No questions found in response');
      }
      
      setQuestions(data.data.questions);
      setError(null);
    } catch (err) {
      if (signal?.aborted) return;
      const message = err instanceof Error ? err.message : 'Failed to load questions';
      setError(message);
      setQuestions(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchQuestions(controller.signal);
    return () => controller.abort();
  }, [fetchQuestions]);

  const {
    gameState,
    setAnswer,
    moveToNextQuestion,
    
  } = useGameState(questions || []);

  const handleRetry = useCallback(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleRestart = useCallback(() => {
    setQuestions(null);
    fetchQuestions();
  }, [fetchQuestions]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !questions) {
    return <ErrorScreen error={error} onRetry={handleRetry} />;
  }

  if (!gameState) {
    return <GameInitFailed />;
  }

  const currentQuestionIndex = gameState.currentQuestionIndex;
  const isValidIndex = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader />
        
        {!gameState.isComplete && isValidIndex ? (
          <Question
            question={questions[currentQuestionIndex]}
            // selectedWords={gameState.answers[currentQuestionIndex] || []}
            selectedWords={
              (gameState.answers[currentQuestionIndex] as (string | null)) || []
            }
            
            timeRemaining={gameState.timeRemaining}
            onSelectWord={setAnswer}
            onNext={moveToNextQuestion}
          />
        ) : (
          <Results
            questions={questions}
            // answers={gameState.answers}
            answers={gameState.answers as (string | null)[]}

            score={gameState.score}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

// Extracted components for better readability
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div 
      className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      role="status"
      aria-label="Loading questions"
    />
  </div>
);

const ErrorScreen = ({ error, onRetry }: { error: string | null, onRetry: () => void }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div className="text-red-600 mb-4 text-center max-w-md">
      {error || 'Failed to load questions'}
    </div>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      aria-label="Retry loading questions"
    >
      Try Again
    </button>
  </div>
);

const GameInitFailed = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-red-600">Game initialization failed</div>
  </div>
);

const GameHeader = () => (
  <header className="text-center mb-8">
    <div className="flex items-center justify-center gap-2 mb-4">
      <BookOpen className="w-8 h-8 text-blue-600" aria-hidden="true" />
      <h1 className="text-3xl font-bold text-gray-900">Sentence Builder</h1>
    </div>
    <p className="text-gray-600">Complete the sentences by selecting the correct words</p>
  </header>
);

export default App;


