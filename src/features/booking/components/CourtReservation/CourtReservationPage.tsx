import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Repeat, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button, 
  Badge 
} from '../../../../shared/components/ui';
import { ClubSelector, ClubSelectionModal } from '../ClubSelector';
import { DateTimePicker, DateTimeDisplay } from '../DateTimePicker';
import { useClubSelection } from '../../hooks/useClubSelection';
import { useDateTimeSelection } from '../../hooks/useDateTimeSelection';
import { useBookingStore, useBookingActions } from '../../stores/bookingStore';
import { cn } from '../../../../shared/utils/cn';

export function CourtReservationPage(): JSX.Element {
  const navigate = useNavigate();
  
  // Club selection state
  const {
    primaryClubs,
    allClubs,
    selectedClubIds,
    isModalOpen,
    toggleClub,
    openModal,
    closeModal,
  } = useClubSelection();

  // Date/time selection state
  const {
    selectedDate,
    selectedTime,
    isPickerOpen,
    setDateTime,
    openPicker,
    closePicker,
  } = useDateTimeSelection();

  // Duration selection
  const [selectedDuration, setSelectedDuration] = useState<60 | 120>(60);
  
  // Booking store
  const { isLoading } = useBookingStore();
  const { searchAvailableCourts, createBooking } = useBookingActions();

  // Handle search for available courts
  const handleSearchCourts = async () => {
    if (!selectedDate || !selectedTime || selectedClubIds.length === 0) {
      alert('Molimo vas da izaberete klub, datum i vreme');
      return;
    }

    try {
      const filters = {
        date: selectedDate,
        minTime: selectedTime,
        maxTime: selectedTime,
      };

      const availableCourts = await searchAvailableCourts(filters);
      
      // In a real app, navigate to court selection screen
      // For now, show success message and simulate booking
      const selectedClubNames = allClubs
        .filter(club => selectedClubIds.includes(club.id))
        .map(club => club.name)
        .join(', ');

      const confirmMessage = `Pronađeni su dostupni tereni!\n\nKlubovi: ${selectedClubNames}\nDatum: ${selectedDate}\nVreme: ${selectedTime}h\nTrajanje: ${selectedDuration} min\n\nDa li želite da završite rezervaciju?`;
      
      if (window.confirm(confirmMessage)) {
        // Create booking
        const booking = await createBooking({
          clubId: selectedClubIds[0], // Use first selected club
          date: selectedDate,
          timeSlot: selectedTime,
          duration: selectedDuration,
        });

        alert(`Rezervacija je uspešno kreirana!\nID: ${booking.id}\nCena: ${booking.totalPrice} RSD`);
        navigate('/'); // Return to home
      }
    } catch (error) {
      console.error('Error searching courts:', error);
      alert('Greška pri pretrazi terena. Molimo pokušajte ponovo.');
    }
  };

  const canSearch = selectedDate && selectedTime && selectedClubIds.length > 0 && !isLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Rezervacija Terena
          </h1>
          <p className="text-gray-600">
            Izaberite vaše preference za rezervaciju terena
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Club Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Izaberite Klubove
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ClubSelector
              clubs={primaryClubs}
              selectedClubIds={selectedClubIds}
              onToggleClub={toggleClub}
              onShowMore={openModal}
              showMoreButton
              maxDisplayed={3}
            />
            <div className="mt-4 text-sm text-gray-600">
              {selectedClubIds.length} klub(ova) izabrano
            </div>
          </CardContent>
        </Card>

        {/* Date & Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Datum i Vreme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DateTimeDisplay
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onOpenPicker={openPicker}
              placeholder="Kada želite da igrate?"
            />
          </CardContent>
        </Card>

        {/* Duration Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Trajanje Rezervacije
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[60, 120].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration as 60 | 120)}
                  className={cn(
                    'p-4 rounded-lg border-2 text-center transition-all',
                    selectedDuration === duration
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <div className="font-semibold">{duration} min</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {duration === 60 ? '2.000 RSD' : '3.500 RSD'}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recurring Booking Option */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => alert('Opcije za ponavljajuću rezervaciju će biti dostupne uskoro!')}
        >
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Repeat className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Ponavljajuća rezervacija?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ostvarite do 20% popusta
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Search Button */}
        <Button
          onClick={handleSearchCourts}
          disabled={!canSearch}
          loading={isLoading}
          fullWidth
          size="lg"
          className="mt-8"
        >
          {isLoading 
            ? 'Pretraživanje...' 
            : 'Pretražite Dostupne Terene'
          }
        </Button>

        {/* Requirements Help */}
        {!canSearch && !isLoading && (
          <div className="text-center text-sm text-gray-500 mt-4">
            {!selectedClubIds.length && '• Izaberite najmanje jedan klub'}
            {selectedClubIds.length > 0 && !selectedDate && '• Izaberite datum'}
            {selectedDate && !selectedTime && '• Izaberite vreme'}
          </div>
        )}
      </div>

      {/* Modals */}
      <ClubSelectionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        clubs={allClubs}
        selectedClubIds={selectedClubIds}
        onToggleClub={toggleClub}
        onConfirm={closeModal}
      />

      <DateTimePicker
        isOpen={isPickerOpen}
        onClose={closePicker}
        selectedDate={selectedDate || undefined}
        selectedTime={selectedTime || undefined}
        onConfirm={setDateTime}
        mode="datetime"
        title="Izaberite Datum i Vreme"
      />
    </div>
  );
}
