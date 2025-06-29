import React from 'react';
import { useBookingStore } from '../stores/useBookingStore';
import { Progress } from '../../../shared/components/ui/Progress';
import { Button } from '../../../shared/components/ui/Button';
import { ClubSelection } from './ClubSelection';
import { DateTimeSelection } from './DateTimeSelection';
import { BookingConfirmation } from './BookingConfirmation';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CourtReservation() {
  const navigate = useNavigate();
  const { currentStep, steps, nextStep, prevStep, resetBooking } = useBookingStore();

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/courts');
    } else {
      prevStep();
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <ClubSelection />;
      case 1:
        return <DateTimeSelection />;
      case 2:
        return <BookingConfirmation />;
      default:
        return <ClubSelection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Nazad
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Rezervacija terena
          </h1>
          <button
            onClick={resetBooking}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Poništi
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-md mx-auto">
          <Progress steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {renderCurrentStep()}
      </div>
    </div>
  );
}
