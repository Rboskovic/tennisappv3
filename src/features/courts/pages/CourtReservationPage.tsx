// src/features/courts/pages/CourtReservationPage.tsx
import React, { useState } from 'react';
import { ArrowLeft, Search, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ClubSelector } from '../components/ClubSelector';
import { DateTimePicker } from '../components/DateTimePicker';
import { useCourtBooking } from '../hooks/useCourtBooking';
import { clubs } from '../data/clubs';
import { cn } from '../../../shared/utils/cn';

export function CourtReservationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'selection' | 'results' | 'booking' | 'confirmation'>('selection');
  const [selectedCourtResult, setSelectedCourtResult] = useState<any>(null);
  
  const {
    selectedClubIds,
    selectedDate,
    selectedTime,
    selectedDuration,
    isLoading,
    availableSlots,
    selectClub,
    deselectClub,
    setDate,
    setTime,
    setDuration,
    searchAvailableCourts,
    bookCourt,
  } = useCourtBooking();

  const handleSearch = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Molimo izaberite datum i vreme');
      return;
    }
    
    await searchAvailableCourts();
    setStep('results');
  };

  const handleBookCourt = async (courtResult: any, timeSlot: any) => {
    setSelectedCourtResult({ courtResult, timeSlot });
    setStep('booking');
  };

  const handleConfirmBooking = async () => {
    if (!selectedCourtResult) return;
    
    try {
      const booking = await bookCourt({
        clubId: selectedCourtResult.courtResult.club.id,
        courtId: selectedCourtResult.timeSlot.court?.id,
        date: selectedDate,
        time: selectedTime,
        duration: selectedDuration,
        type: 'single',
      });
      
      setStep('confirmation');
    } catch (error) {
      alert('Greška pri rezervaciji. Pokušajte ponovo.');
    }
  };

  const renderStepSelection = () => (
    <div className="space-y-6">
      {/* Preferences Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Izaberite vaše preference
        </h2>
        <p className="text-gray-600">
          Odaberite željene klubove, datum i vreme za rezervaciju terena.
        </p>
      </div>

      {/* Club Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Izaberite klubove</h3>
        <ClubSelector
          clubs={clubs}
          selectedClubIds={selectedClubIds}
          onClubSelect={selectClub}
          onClubDeselect={deselectClub}
        />
      </div>

      {/* Date and Time Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <DateTimePicker
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateSelect={setDate}
          onTimeSelect={setTime}
        />
      </div>

      {/* Duration Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Trajanje rezervacije</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[60, 120].map((duration) => (
            <button
              key={duration}
              onClick={() => setDuration(duration)}
              className={cn(
                "py-3 px-4 rounded-lg border-2 font-medium transition-all",
                selectedDuration === duration
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              )}
            >
              {duration} minuta
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={!selectedDate || !selectedTime || selectedClubIds.length === 0}
        className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        <Search className="w-5 h-5 mr-2" />
        Pronađi dostupne terene
      </button>
    </div>
  );

  const renderStepResults = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Dostupni tereni
        </h2>
        <button
          onClick={() => setStep('selection')}
          className="text-primary-600 font-medium"
        >
          Izmeni pretragu
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Pretražujemo dostupne terene...</p>
        </div>
      ) : availableSlots.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <p className="text-gray-600 mb-4">Nema dostupnih terena za izabrano vreme.</p>
          <button
            onClick={() => setStep('selection')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Probaj drugo vreme
          </button>
        </div>
      ) : (
        availableSlots.map((result) => (
          <div key={result.club.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{result.club.name}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {result.club.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary-600">
                  {result.club.pricePerHour} RSD
                </div>
                <div className="text-xs text-gray-500">po satu</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {result.availableSlots.filter(slot => slot.time === selectedTime).map((slot) => (
                <button
                  key={`${result.club.id}-${slot.time}`}
                  onClick={() => handleBookCourt(result, slot)}
                  className="bg-green-50 border border-green-200 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                >
                  {slot.time}
                  {slot.court && (
                    <div className="text-xs text-green-600">
                      Teren {slot.court.number}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderStepBooking = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Potvrdi rezervaciju</h2>
      
      {selectedCourtResult && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">{selectedCourtResult.courtResult.club.name}</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Datum:</span>
              <span className="font-medium">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vreme:</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trajanje:</span>
              <span className="font-medium">{selectedDuration} minuta</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Teren:</span>
              <span className="font-medium">
                Teren {selectedCourtResult.timeSlot.court?.number}
              </span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span>Ukupno:</span>
              <span className="text-primary-600">
                {Math.round((selectedCourtResult.timeSlot.price * selectedDuration) / 60)} RSD
              </span>
            </div>
          </div>
          
          <button
            onClick={handleConfirmBooking}
            disabled={isLoading}
            className="w-full mt-6 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Rezervišem...' : 'Potvrdi rezervaciju'}
          </button>
        </div>
      )}
    </div>
  );

  const renderStepConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Rezervacija potvrđena!
        </h2>
        <p className="text-gray-600 mb-6">
          Vaša rezervacija je uspešno kreirana. Detalji su poslati na email.
        </p>
        
        <div className="space-y-2 text-sm text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">ID rezervacije:</span>
            <span className="font-mono">#{Date.now().toString().slice(-8)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => navigate('/')}
        className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
      >
        Nazad na početnu
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={() => step === 'selection' ? navigate('/') : setStep('selection')}
              className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Rezervacija Terena
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4">
        {step === 'selection' && renderStepSelection()}
        {step === 'results' && renderStepResults()}
        {step === 'booking' && renderStepBooking()}
        {step === 'confirmation' && renderStepConfirmation()}
      </div>
    </div>
  );
}
