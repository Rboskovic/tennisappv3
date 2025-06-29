import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressProps {
  steps: Array<{ title: string; isComplete: boolean }>;
  currentStep: number;
}

export function Progress({ steps, currentStep }: ProgressProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors',
                  index <= currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-500'
                )}
              >
                {step.isComplete ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 ml-2',
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                'mt-2 text-xs font-medium text-center',
                index <= currentStep ? 'text-blue-600' : 'text-gray-500'
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
