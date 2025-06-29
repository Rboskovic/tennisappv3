// src/features/matches/hooks/useMatchSearch.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Player, MatchSearchFilters, MatchSearchResult, SuggestedMatch } from '../types';
import { players, getOnlinePlayers, getPlayersBySkillLevel, getPlayersInRatingRange } from '../data/players';

interface UseMatchSearchOptions {
  initialFilters?: Partial<MatchSearchFilters>;
  debounceMs?: number;
  enableCaching?: boolean;
}

interface UseMatchSearchReturn {
  // Search state
  searchResults: MatchSearchResult;
  isSearching: boolean;
  searchError: string | null;
  
  // Filters
  filters: MatchSearchFilters;
  setFilters: (filters: MatchSearchFilters) => void;
  updateFilter: <K extends keyof MatchSearchFilters>(key: K, value: MatchSearchFilters[K]) => void;
  clearFilters: () => void;
  
  // Search actions
  searchPlayers: (customFilters?: Partial<MatchSearchFilters>) => Promise<void>;
  refreshSearch: () => void;
  
  // Quick access
  onlinePlayersCount: number;
  suggestedMatches: SuggestedMatch[];
  featuredPlayers: Player[];
}

const defaultFilters: MatchSearchFilters = {
  skillLevels: [],
  ratingRange: { min: 1.0, max: 7.0 },
  locations: [],
  matchTypes: [],
  onlineOnly: false,
  availableToday: false,
  availableThisWeek: false
};

export function useMatchSearch(options: UseMatchSearchOptions = {}): UseMatchSearchReturn {
  const {
    initialFilters = {},
    debounceMs = 300,
    enableCaching = true
  } = options;

  // State
  const [filters, setFilters] = useState<MatchSearchFilters>({
    ...defaultFilters,
    ...initialFilters
  });
  
  const [searchResults, setSearchResults] = useState<MatchSearchResult>({
    players: [],
    totalCount: 0,
    suggestedMatches: [],
    filters: filters
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchCache, setSearchCache] = useState<Map<string, MatchSearchResult>>(new Map());

  // Memoized values
  const onlinePlayersCount = useMemo(() => getOnlinePlayers().length, []);
  
  const featuredPlayers = useMemo(() => {
    // Return top players by rating and activity
    return players
      .filter(player => player.isOnline && player.stats.winRate > 70)
      .sort((a, b) => b.ntrpRating - a.ntrpRating)
      .slice(0, 3);
  }, []);

  // Advanced filtering logic
  const filterPlayers = useCallback((allPlayers: Player[], searchFilters: MatchSearchFilters): Player[] => {
    let filteredPlayers = [...allPlayers];

    // Online filter
    if (searchFilters.onlineOnly) {
      filteredPlayers = filteredPlayers.filter(player => player.isOnline);
    }

    // Skill level filter
    if (searchFilters.skillLevels.length > 0) {
      filteredPlayers = filteredPlayers.filter(player => 
        searchFilters.skillLevels.includes(player.skillLevel)
      );
    }

    // Rating range filter
    filteredPlayers = filteredPlayers.filter(player => 
      player.ntrpRating >= searchFilters.ratingRange.min && 
      player.ntrpRating <= searchFilters.ratingRange.max
    );

    // Location filter
    if (searchFilters.locations.length > 0) {
      filteredPlayers = filteredPlayers.filter(player => 
        searchFilters.locations.includes(player.location)
      );
    }

    // Age range filter
    if (searchFilters.ageRange) {
      filteredPlayers = filteredPlayers.filter(player => 
        player.age >= searchFilters.ageRange!.min && 
        player.age <= searchFilters.ageRange!.max
      );
    }

    // Play style filter
    if (searchFilters.preferredPlayStyles && searchFilters.preferredPlayStyles.length > 0) {
      filteredPlayers = filteredPlayers.filter(player => 
        searchFilters.preferredPlayStyles!.includes(player.preferredPlayStyle)
      );
    }

    // Availability filters
    if (searchFilters.availableToday) {
      const today = new Date().toLocaleLowerCase();
      const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
      
      filteredPlayers = filteredPlayers.filter(player => {
        const dayAvailability = player.availability.weeklySchedule[dayOfWeek as keyof typeof player.availability.weeklySchedule];
        return dayAvailability.available && dayAvailability.timeSlots.length > 0;
      });
    }

    return filteredPlayers;
  }, []);

  // Compatibility scoring algorithm
  const calculateCompatibilityScore = useCallback((player1: Player, player2: Player): number => {
    let score = 0;
    
    // Rating similarity (40% weight)
    const ratingDiff = Math.abs(player1.ntrpRating - player2.ntrpRating);
    const ratingScore = Math.max(0, 100 - (ratingDiff * 25)); // Penalty for large rating differences
    score += ratingScore * 0.4;
    
    // Location proximity (25% weight) 
    const locationScore = player1.location === player2.location ? 100 : 50;
    score += locationScore * 0.25;
    
    // Common clubs (20% weight)
    const commonClubs = player1.clubs.filter(club => player2.clubs.includes(club));
    const clubScore = commonClubs.length > 0 ? 100 : 0;
    score += clubScore * 0.2;
    
    // Play style compatibility (15% weight)
    const styleCompatibility = getPlayStyleCompatibility(player1.preferredPlayStyle, player2.preferredPlayStyle);
    score += styleCompatibility * 0.15;
    
    return Math.round(score);
  }, []);

  // Play style compatibility matrix
  const getPlayStyleCompatibility = (style1: string, style2: string): number => {
    const compatibilityMatrix: Record<string, Record<string, number>> = {
      'aggressive': { 'defensive': 100, 'all-court': 90, 'baseline': 70, 'aggressive': 60, 'recreational': 50 },
      'defensive': { 'aggressive': 100, 'baseline': 90, 'all-court': 80, 'defensive': 60, 'recreational': 70 },
      'all-court': { 'all-court': 100, 'aggressive': 90, 'defensive': 80, 'baseline': 85, 'recreational': 75 },
      'baseline': { 'baseline': 90, 'defensive': 90, 'all-court': 85, 'aggressive': 70, 'recreational': 80 },
      'recreational': { 'recreational': 100, 'defensive': 70, 'baseline': 80, 'all-court': 75, 'aggressive': 50 }
    };
    
    return compatibilityMatrix[style1]?.[style2] || 50;
  };

  // Generate suggested matches with AI-like intelligence
  const generateSuggestedMatches = useCallback((filteredPlayers: Player[], currentUser?: Player): SuggestedMatch[] => {
    if (!currentUser) {
      // If no current user, suggest based on popular players
      return filteredPlayers
        .filter(player => player.isOnline && player.stats.winRate > 60)
        .slice(0, 5)
        .map(player => ({
          player,
          compatibilityScore: 75 + Math.random() * 25, // Random score for demo
          reasons: ['Dobar rejting', 'Online sada', 'Aktivni igrač'],
          estimatedMatchQuality: 'good' as const,
          availableSlots: []
        }));
    }

    return filteredPlayers
      .map(player => {
        const compatibilityScore = calculateCompatibilityScore(currentUser, player);
        const reasons = generateCompatibilityReasons(currentUser, player, compatibilityScore);
        
        return {
          player,
          compatibilityScore,
          reasons,
          estimatedMatchQuality: getMatchQuality(compatibilityScore),
          availableSlots: [] // Would be populated with real availability data
        };
      })
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, 8); // Top 8 suggestions
  }, [calculateCompatibilityScore]);

  // Generate human-readable compatibility reasons
  const generateCompatibilityReasons = (user: Player, opponent: Player, score: number): string[] => {
    const reasons: string[] = [];
    
    const ratingDiff = Math.abs(user.ntrpRating - opponent.ntrpRating);
    if (ratingDiff <= 0.5) reasons.push('Sličan nivo igre');
    
    if (user.location === opponent.location) reasons.push('Ista lokacija');
    
    const commonClubs = user.clubs.filter(club => opponent.clubs.includes(club));
    if (commonClubs.length > 0) reasons.push(`Igra u ${commonClubs[0]}`);
    
    if (opponent.isOnline) reasons.push('Online sada');
    
    if (opponent.stats.winRate > 70) reasons.push('Odličan win rate');
    
    if (opponent.verified) reasons.push('Verifikovani igrač');
    
    const styleCompatibility = getPlayStyleCompatibility(user.preferredPlayStyle, opponent.preferredPlayStyle);
    if (styleCompatibility > 80) reasons.push('Kompatibilan stil igre');
    
    return reasons.slice(0, 3); // Max 3 reasons
  };

  const getMatchQuality = (score: number): 'excellent' | 'good' | 'fair' => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    return 'fair';
  };

  // Generate cache key for filters
  const getCacheKey = (searchFilters: MatchSearchFilters): string => {
    return JSON.stringify(searchFilters);
  };

  // Main search function
  const searchPlayers = useCallback(async (customFilters?: Partial<MatchSearchFilters>) => {
    const searchFilters = customFilters ? { ...filters, ...customFilters } : filters;
    const cacheKey = getCacheKey(searchFilters);
    
    // Check cache first
    if (enableCaching && searchCache.has(cacheKey)) {
      const cachedResult = searchCache.get(cacheKey)!;
      setSearchResults(cachedResult);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      // Simulate API delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
      
      const filteredPlayers = filterPlayers(players, searchFilters);
      const suggestedMatches = generateSuggestedMatches(filteredPlayers);
      
      const result: MatchSearchResult = {
        players: filteredPlayers,
        totalCount: filteredPlayers.length,
        suggestedMatches,
        filters: searchFilters
      };

      // Cache the result
      if (enableCaching) {
        setSearchCache(prev => new Map(prev).set(cacheKey, result));
      }

      setSearchResults(result);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Greška pri pretraživanju igrača. Pokušajte ponovo.');
    } finally {
      setIsSearching(false);
    }
  }, [filters, filterPlayers, generateSuggestedMatches, enableCaching, searchCache]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPlayers();
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [filters, searchPlayers, debounceMs]);

  // Helper functions
  const updateFilter = useCallback(<K extends keyof MatchSearchFilters>(
    key: K, 
    value: MatchSearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const refreshSearch = useCallback(() => {
    // Clear cache and re-search
    setSearchCache(new Map());
    searchPlayers();
  }, [searchPlayers]);

  return {
    // Search state
    searchResults,
    isSearching,
    searchError,
    
    // Filters
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    
    // Search actions
    searchPlayers,
    refreshSearch,
    
    // Quick access
    onlinePlayersCount,
    suggestedMatches: searchResults.suggestedMatches,
    featuredPlayers
  };
}
