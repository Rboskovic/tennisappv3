import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { DatePicker } from '../../../shared/components/ui/DatePicker';
import { TimeSlots } from '../../../shared/components/ui/TimeSlots';
import { useBookingStore } from '../stores/useBookingStore';
import { availableTimeSlots } from '../services/mockData';
import dayjs from 'dayjs';

export function DateTimeSelection() {
  const { bookingData, setDateTime, nextStep, prevStep } = useBookingStore();
  const [selectedDate, setSelectedDate] = useState<string>(bookingData.date || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(bookingData.timeSlot || null);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Reset time slot when date changes
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot: typeof availableTimeSlots[0]) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      setDateTime(selectedDate, selectedTimeSlot);
      nextStep();
    }
  };

  const canContinue = selectedDate && selectedTimeSlot;
  const selectedClub = bookingData.club;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Datum i vreme
        </h2>
        <p className="text-gray-600">
          Rezervacija za {selectedClub?.name}
        </p>
      </div>

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Izaberite datum</CardTitle>
        </CardHeader>
        <CardContent>
          <DatePicker
            selected={selectedDate}
            onSelect={handleDateSelect}
            minDate={dayjs().format('YYYY-MM-DD')}
            maxDate={dayjs().add(30, 'day').format('YYYY-MM-DD')}
          />
        </CardContent>
      </Card>

      {/* Time Selection */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Dostupni termini - {dayjs(selectedDate).format('DD.MM.YYYY')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TimeSlots
              timeSlots={availableTimeSlots}
              selected={selectedTimeSlot?.id}
              onSelect={handleTimeSlotSelect}
            />
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={prevStep}
          className="flex-1"
        >
          Nazad
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!canContinue}
          className="flex-1"
        >
          Nastavi
        </Button>
      </div>
    </div>
  );
}
