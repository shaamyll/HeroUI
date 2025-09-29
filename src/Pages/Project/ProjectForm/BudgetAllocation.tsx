import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import CustomInput from "../../../components/common/CustomInput";

// Define the Phase interface
interface Phase {
  id: string;
  name: string;
  budget: number;
}

interface BudgetAllocationProps {
  phases: Phase[];
  totalBudget: number;
  currency?: string;
  onPhaseBudgetChange?: (phaseId: string, budget: number) => void;
}

const BudgetAllocation: React.FC<BudgetAllocationProps> = ({
  phases,
  totalBudget,
  currency = 'SAR',
  onPhaseBudgetChange,
}) => {
  const [phasesBudget, setPhasesBudget] = useState<Record<string, number>>(
    phases.reduce((acc, phase) => {
      acc[phase.id] = phase.budget || 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleNumericInput = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue.replace(/^0+/, '') || '0';
  };

  const handleBudgetChange = (phaseId: string, value: string) => {
    const cleanedValue = handleNumericInput(value);
    const numericValue = cleanedValue === '' ? 0 : Number(cleanedValue);

    setPhasesBudget((prev) => ({
      ...prev,
      [phaseId]: numericValue,
    }));

    if (onPhaseBudgetChange) {
      onPhaseBudgetChange(phaseId, numericValue);
    }
  };

  const calculateRemainingBudget = (excludePhaseId: string) => {
    const allocatedBudget = Object.entries(phasesBudget).reduce(
      (acc, [id, budget]) => {
        if (id !== excludePhaseId) {
          return acc + budget;
        }
        return acc;
      },
      0
    );
    return totalBudget - allocatedBudget;
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-gray-700 text-lg font-semibold">
        Budget Allocation
      </h3>

      {phases.map((phase) => {
        const phaseBudget = phasesBudget[phase.id] || 0;
        const remainingBudget = calculateRemainingBudget(phase.id);
        const percentage = totalBudget > 0 ? (phaseBudget / totalBudget) * 100 : 0;
        const isOverBudget = phaseBudget > remainingBudget;

        return (
          <div
            key={phase.id}
            className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md md:p-6"
          >
            <CustomInput
              label={
                <span className="font-semibold text-gray-800">
                  {phase.name}{' '}
                  <span className="text-xs italic font-normal"> (optional)</span>
                </span>
              }
              placeholder={`${phase.name} Budget`}
              value={String(phaseBudget || '')}
              onChange={(value) => handleBudgetChange(phase.id, value)}
              type="text"
              variant="bordered"
              color={isOverBudget ? 'danger' : 'default'}
              isInvalid={isOverBudget}
              errorMessage={isOverBudget ? 'Budget exceeds remaining amount' : ''}
              classNames={{
                input: 'text-base',
                inputWrapper: isOverBudget ? 'border-red-500' : '',
              }}
            />

            <div className="flex w-full flex-col items-start">
              <div className="relative h-3 w-full rounded-md bg-gray-200">
                <div
                  className={`h-full rounded-md ${
                    isOverBudget
                      ? 'bg-red-500'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  } transition-all duration-500`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>

              <div className="mt-2 flex w-full items-center justify-between text-sm text-gray-600">
                <span
                  className={`font-medium ${
                    isOverBudget ? 'text-red-500' : 'text-gray-800'
                  }`}
                >
                  {percentage.toFixed(2)}%
                </span>
                <span className="font-medium text-gray-800">
                  {`${currency} ${phaseBudget.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export { BudgetAllocation };