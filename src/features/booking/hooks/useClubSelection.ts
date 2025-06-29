import { useState, useCallback } from 'react';
import { tennisClubs, additionalClubs } from '../../../data/clubs';
import type { Club } from '../types';

interface UseClubSelectionReturn {
  // Data
  primaryClubs: Club[];
  allClubs: Club[];
  selectedClubIds: string[];
  
  // UI State
  isModalOpen: boolean;
  
  // Actions
  toggleClub: (clubId: string) => void;
  setSelectedClubs: (clubIds: string[]) => void;
  openModal: () => void;
  closeModal: () => void;
  reset: () => void;
}

export function useClubSelection(initialSelected: string[] = ['baseline']): UseClubSelectionReturn {
  const [selectedClubIds, setSelectedClubIds] = useState<string[]>(initialSelected);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleClub = useCallback((clubId: string) => {
    setSelectedClubIds(prev => 
      prev.includes(clubId)
        ? prev.filter(id => id !== clubId)
        : [...prev, clubId]
    );
  }, []);

  const setSelectedClubs = useCallback((clubIds: string[]) => {
    setSelectedClubIds(clubIds);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const reset = useCallback(() => {
    setSelectedClubIds(initialSelected);
    setIsModalOpen(false);
  }, [initialSelected]);

  return {
    primaryClubs: tennisClubs,
    allClubs: [...tennisClubs, ...additionalClubs],
    selectedClubIds,
    isModalOpen,
    toggleClub,
    setSelectedClubs,
    openModal,
    closeModal,
    reset,
  };
}
