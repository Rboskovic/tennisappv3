// src/features/courts/hooks/useCourtBooking.ts
import { useState, useCallback } from 'react';
import { BookingFormData, Booking, CourtSearchResult, TimeSlot } from '../types';
import { clubs, generateAvailabilityForClub, getClubsByIds } from '../data/clubs';

interface UseCourtBookingReturn {
  // State
  selectedClubIds: string[];
  selectedDate: string;
  selectedTime: string;
  selectedDuration: number;
  isLoading: boolean;
  availableSlots: CourtSearchResult[];
  
  // Actions
  selectClub: (clubId: string) => void;
  deselectClub: (clubId: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setDuration: (duration: number) => void;
  searchAvailableCourts: () => Promise<void>;
  bookCourt: (bookingData: BookingFormData) => Promise<Booking>;
  reset: () => void;
}

export function useCourtBooking(): UseCourtBookingReturn {
  const [selectedClubIds, setSelectedClubIds] = useState<string[]>(['baseline']);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableSlots, setAvailableSlots] = useState<CourtSearchResult[]>([]);

  const selectClub = useCallback((clubId: string) => {
    setSelectedClubIds(prev => {
      if (!prev.includes(clubId)) {
        return [...prev, clubId];
      }
      return prev;
    });
  }, []);

  const deselectClub = useCallback((clubId: string) => {
    setSelectedClubIds(prev => prev.filter(id => id !== clubId));
  }, []);

  const setDate = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const setTime = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const setDuration = useCallback((duration: number) => {
    setSelectedDuration(duration);
  }, []);

  const searchAvailableCourts = useCallback(async () => {
    if (!selectedDate || selectedClubIds.length === 0) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const results: CourtSearchResult[] = [];
      
      for (const clubId of selectedClubIds) {
        const club = clubs.find(c => c.id === clubId);
        if (club) {
          const availability = generateAvailabilityForClub(clubId, selectedDate);
          const availableSlots = availability.filter(slot => slot.isAvailable);
          
          results.push({
            club,
            availableSlots,
            totalSlots: availability.length,
          });
        }
      }
      
      setAvailableSlots(results);
    } catch (error) {
      console.error('Error searching courts:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [selectedClubIds, selectedDate]);

  const bookCourt = useCallback(async (bookingData: BookingFormData): Promise<Booking> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const club = clubs.find(c => c.id === bookingData.clubId);
      if (!club) {
        throw new Error('Club not found');
      }

      // Create mock booking
      const booking: Booking = {
        id: `booking-${Date.now()}`,
        clubId: bookingData.clubId,
        clubName: club.name,
        courtId: bookingData.courtId || club.courts[0].id,
        courtNumber: club.courts.find(c => c.id === bookingData.courtId)?.number || 1,
        date: bookingData.date,
        time: bookingData.time,
        duration: bookingData.duration,
        totalPrice: (club.pricePerHour * bookingData.duration) / 60,
        status: 'confirmed',
        userId: 'current-user',
        createdAt: new Date().toISOString(),
      };

      return booking;
    } catch (error) {
      console.error('Error booking court:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSelectedClubIds(['baseline']);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDuration(60);
    setAvailableSlots([]);
  }, []);

  return {
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
    reset,
  };
}
