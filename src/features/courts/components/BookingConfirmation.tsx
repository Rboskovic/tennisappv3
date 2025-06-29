import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Alert } from '../../../shared/components/ui/Alert';
import { CourtSelector } from '../../../shared/components/ui/CourtSelector';
import { DurationSelector } from '../../../shared/components/ui/DurationSelector';
import { useBookingStore } from '../stores/useBookingStore';
import { validateBookingData } from '../../../shared/utils/validation';
import { formatDateTime } from '../../../shared/utils/dateConfig';
import { MapPin, Clock, Calendar, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function BookingConfirmation() {
  const navigate = useNavigate();
  const { 
    bookingData, 
    setCourt, 
    setDuration, 
    prevStep, 
    resetBooking 
  } = useBookingStore();
  
  const [selectedCourt, setSelectedCourt] = useState(bookingData.court || null);
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validationErrors = validateBookingData({
    ...bookingData,
    court: selectedCourt,
  });

  const handleCourtSelect = (court: typeof bookingData.club.courts[0]) => {
    setSelectedCourt(court);
    setCourt(court);
    setError(null);
  };

  const handleDurationChange = (duration: number) => {
    setDuration(duration);
    setError(null);
  };

  const handleConfirmBooking = async () => {
    // Final validation
    const errors = validateBookingData({
      ...bookingData,
      court: selectedCourt,
    });

    if (errors.length > 0) {
      setError('Molimo ispravite greške pre potvrde rezervacije');
      return;
    }

    setIsBooking(true);
    setError(null);
    
    try {
      // Simulate API call with possible failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 90% success rate for demo
          if (Math.random() > 0.1) {
            resolve(null);
          } else {
            reject(new Error('Teren nije više dostupan'));
          }
        }, 2000);
      });
      
      setIsBooked(true);
      
      // Navigate back to courts page after 3 seconds
      setTimeout(() => {
        resetBooking();
        navigate('/courts');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Došlo je do greške pri rezervaciji');
    } finally {
      setIsBooking(false);
    }
  };

  if (isBooked) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Rezervacija potvrđena!
          </h2>
          <p className="text-gray-600">
            Vaša rezervacija je uspešno kreirana. Uskoro ćete biti preusmereni...
          </p>
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Rezervacija ID:</span>
                <span className="font-medium">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Potvrđeno</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { club, date, timeSlot, duration, totalPrice } = bookingData;
  const hasErrors = validationErrors.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Potvrda rezervacije
        </h2>
        <p className="text-gray-600">
          Pregledajte detalje i potvrdite rezervaciju
        </p>
      </div>

      {/* Error Alert */}
      {(error || hasErrors) && (
        <Alert variant="error" title="Greška">
          {error || 'Molimo ispravite sledeće greške:'}
          {hasErrors && (
            <ul className="mt-2 list-disc list-inside">
              {validationErrors.map((err, index) => (
                <li key={index}>{err.message}</li>
              ))}
            </ul>
          )}
        </Alert>
      )}

      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detalji rezervacije</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">{club?.name}</div>
              <div className="text-sm text-gray-600">{club?.address}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div className="text-gray-900">
              {date && formatDateTime(date)}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div className="text-gray-900">
              {timeSlot?.time} - {timeSlot && (() => {
                const endTime = new Date(`2024-01-01T${timeSlot.time}:00`);
                endTime.setHours(endTime.getHours() + duration);
                return endTime.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
              })()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Court Selection */}
      {club && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Izaberite teren
              {!selectedCourt && <span className="text-red-500 ml-1">*</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CourtSelector
              courts={club.courts}
              selected={selectedCourt?.id}
              onSelect={handleCourtSelect}
            />
          </CardContent>
        </Card>
      )}

      {/* Duration Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trajanje rezervacije</CardTitle>
        </CardHeader>
        <CardContent>
          <DurationSelector
            duration={duration}
            onDurationChange={handleDurationChange}
            pricePerHour={timeSlot?.price || 0}
          />
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Ukupan iznos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cena po satu:</span>
              <span>{timeSlot?.price} RSD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Trajanje:</span>
              <span>{duration} {duration === 1 ? 'sat' : duration < 2 ? 'sata' : 'sati'}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between text-lg font-semibold">
                <span>Ukupno:</span>
                <span className="text-blue-600">{totalPrice} RSD</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={prevStep}
          className="flex-1"
          disabled={isBooking}
        >
          Nazad
        </Button>
        <Button
          onClick={handleConfirmBooking}
          disabled={!selectedCourt || isBooking || hasErrors}
          isLoading={isBooking}
          className="flex-1"
        >
          {isBooking ? 'Rezerviše se...' : 'Potvrdi rezervaciju'}
        </Button>
      </div>
    </div>
  );
}
