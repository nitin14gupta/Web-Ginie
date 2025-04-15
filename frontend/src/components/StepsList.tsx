import React from 'react';
import { CheckCircle, Circle, Clock, ListTodo } from 'lucide-react';
import { Step, StepsListProps } from '../types/bolt';

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      <div className="relative h-full bg-black/80 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
            <div className="relative bg-black rounded-lg p-2">
              <ListTodo className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Build Steps
          </h2>
        </div>
        
        <div className="space-y-3 overflow-auto max-h-[calc(100%-4rem)]">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={`relative group/step cursor-pointer transition-all duration-300 ${
                currentStep === step.id ? 'scale-[1.02]' : ''
              }`}
            >
              <div className={`absolute -inset-0.5 rounded-lg blur opacity-20 transition duration-300 ${
                currentStep === step.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 opacity-50'
                  : 'bg-gray-600 group-hover/step:opacity-30'
              }`}></div>
              <div className={`relative p-3 rounded-lg border transition-colors duration-300 ${
                currentStep === step.id
                  ? 'bg-black/90 border-gray-800'
                  : 'bg-black/50 border-gray-800/50 hover:bg-black/70'
              }`}>
                <div className="flex items-center gap-3">
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : step.status === 'in-progress' ? (
                    <Clock className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <h3 className={`font-medium transition-colors duration-300 ${
                      currentStep === step.id ? 'text-white' : 'text-gray-200'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}