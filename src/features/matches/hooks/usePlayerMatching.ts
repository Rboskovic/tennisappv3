// src/features/matches/hooks/usePlayerMatching.ts
import { useState, useCallback, useEffect } from 'react';
import { Player, MatchRequest, Match, RequestStatus, MatchType, MatchFormat } from '../types';
import { players, getPlayerById } from '../data/players';

interface UsePlayerMatchingReturn {
  // Match requests
  pendingRequests: MatchRequest[];
  sentRequests: MatchRequest[];
  receivedRequests: MatchRequest[];
  
  // Match actions
  sendMatchRequest: (
    toPlayer: Player, 
    message?: string, 
    proposedDate?: string, 
    proposedTime?: string
  ) => Promise<MatchRequest>;
  
  respondToRequest: (requestId: string, response: 'accepted' | 'declined', message?: string) => Promise<void>;
  cancelRequest: (requestId: string) => Promise<void>;
  
  // Match management
  activeMatches: Match[];
  scheduleMatch: (request: MatchRequest, finalDetails: {
    date: string;
    time: string;
    location: string;
    format: MatchFormat;
  }) => Promise<Match>;
  
  // State
  isLoading: boolean;
  error: string | null;
}

// Mock current user - in real app this would come from auth context
const currentUser: Player = players[0]; // Ana Jovanović

export function usePlayerMatching(): UsePlayerMatchingReturn {
  const [matchRequests, setMatchRequests] = useState<MatchRequest[]>([]);
  const [activeMatches, setActiveMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with some mock data
  useEffect(() => {
    // Mock some existing requests for demo
    const mockRequests: MatchRequest[] = [
      {
        id: 'req-1',
        from: players[1], // Marko
        to: currentUser,
        status: 'pending',
        message: 'Zdravo Ana! Da li si slobodna sutra posle posla za jedan set?',
        proposedDate: '2025-06-30',
        proposedTime: '18:00',
        createdAt: '2025-06-29T10:00:00Z',
        expiresAt: '2025-07-01T10:00:00Z'
      },
      {
        id: 'req-2', 
        from: currentUser,
        to: players[2], // Stefan
        status: 'pending',
        message: 'Stefane, čuo sam da imaš odličan bekhand. Hoćeš da testiramo? 😊',
        proposedDate: '2025-07-01',
        proposedTime: '19:00',
        createdAt: '2025-06-29T12:00:00Z',
        expiresAt: '2025-07-01T12:00:00Z'
      }
    ];
    
    setMatchRequests(mockRequests);
  }, []);

  // Computed values
  const pendingRequests = matchRequests.filter(req => req.status === 'pending');
  const sentRequests = matchRequests.filter(req => req.from.id === currentUser.id);
  const receivedRequests = matchRequests.filter(req => req.to.id === currentUser.id);

  // Send match request
  const sendMatchRequest = useCallback(async (
    toPlayer: Player,
    message = '',
    proposedDate?: string,
    proposedTime?: string
  ): Promise<MatchRequest> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if request already exists
      const existingRequest = matchRequests.find(req => 
        req.from.id === currentUser.id && 
        req.to.id === toPlayer.id && 
        req.status === 'pending'
      );

      if (existingRequest) {
        throw new Error('Već ste poslali zahtev ovom igraču');
      }

      const newRequest: MatchRequest = {
        id: `req-${Date.now()}`,
        from: currentUser,
        to: toPlayer,
        status: 'pending',
        message,
        proposedDate,
        proposedTime,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // 48h expiry
      };

      setMatchRequests(prev => [...prev, newRequest]);
      
      // Show success notification
      console.log(`Zahtev poslat igraču ${toPlayer.name}!`);
      
      return newRequest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Greška pri slanju zahteva';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [matchRequests]);

  // Respond to match request
  const respondToRequest = useCallback(async (
    requestId: string, 
    response: 'accepted' | 'declined', 
    message?: string
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setMatchRequests(prev => prev.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: response as RequestStatus,
            response: message
          };
        }
        return req;
      }));

      const request = matchRequests.find(req => req.id === requestId);
      if (request && response === 'accepted') {
        // Auto-schedule match if accepted
        await autoScheduleMatch(request);
      }

    } catch (err) {
      setError('Greška pri odgovaranju na zahtev');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [matchRequests]);

  // Auto-schedule match after acceptance
  const autoScheduleMatch = async (request: MatchRequest): Promise<Match> => {
    const newMatch: Match = {
      id: `match-${Date.now()}`,
      status: 'confirmed',
      type: 'casual' as MatchType,
      format: 'singles',
      player1: request.from,
      player2: request.to,
      hostId: request.from.id,
      scheduledFor: request.proposedDate ? 
        `${request.proposedDate}T${request.proposedTime || '18:00'}:00Z` : 
        undefined,
      duration: 90, // 90 minutes estimated
      location: {
        type: 'club',
        name: 'Baseline',
        address: 'Novi Beograd',
        courtType: 'hard',
        indoor: true
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: request.message
    };

    setActiveMatches(prev => [...prev, newMatch]);
    return newMatch;
  };

  // Cancel request
  const cancelRequest = useCallback(async (requestId: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setMatchRequests(prev => prev.map(req => {
        if (req.id === requestId) {
          return { ...req, status: 'cancelled' as RequestStatus };
        }
        return req;
      }));
    } catch (err) {
      setError('Greška pri otkazivanju zahteva');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Schedule match with custom details
  const scheduleMatch = useCallback(async (
    request: MatchRequest,
    finalDetails: {
      date: string;
      time: string;
      location: string;
      format: MatchFormat;
    }
  ): Promise<Match> => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      const newMatch: Match = {
        id: `match-${Date.now()}`,
        status: 'confirmed',
        type: 'casual',
        format: finalDetails.format,
        player1: request.from,
        player2: request.to,
        hostId: request.from.id,
        scheduledFor: `${finalDetails.date}T${finalDetails.time}:00Z`,
        duration: finalDetails.format === 'singles' ? 90 : 120,
        location: {
          type: 'club',
          name: finalDetails.location,
          address: 'Belgrade',
          courtType: 'hard',
          indoor: true
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setActiveMatches(prev => [...prev, newMatch]);
      
      // Update request status
      setMatchRequests(prev => prev.map(req => 
        req.id === request.id ? { ...req, status: 'accepted' as RequestStatus } : req
      ));

      return newMatch;
    } catch (err) {
      setError('Greška pri zakazivanju meča');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // Match requests
    pendingRequests,
    sentRequests,
    receivedRequests,
    
    // Match actions
    sendMatchRequest,
    respondToRequest,
    cancelRequest,
    
    // Match management
    activeMatches,
    scheduleMatch,
    
    // State
    isLoading,
    error
  };
}
