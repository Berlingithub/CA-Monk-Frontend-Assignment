// import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
}

export function Timer({ timeRemaining }: TimerProps) {
  const percentage = (timeRemaining / 30) * 100;
  
  return (
    <div className="flex items-center gap-2">
      <TimerIcon className="w-5 h-5 text-gray-600" />
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ${
            timeRemaining <= 5 ? 'bg-red-500' : timeRemaining <= 10 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium w-8">{timeRemaining}s</span>
    </div>
  );
}