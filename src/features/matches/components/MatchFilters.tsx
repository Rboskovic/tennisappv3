// src/features/matches/components/MatchFilters.tsx
import React, { useState } from 'react';
import { Filter, X, MapPin, Star, Users, Clock, Zap } from 'lucide-react';
import { MatchSearchFilters, SkillLevel, MatchType, PlayStyle } from '../types';
import { cn } from '../../../shared/utils/cn';

interface MatchFiltersProps {
  filters: MatchSearchFilters;
  onFiltersChange: (filters: MatchSearchFilters) => void;
  onlinePlayersCount?: number;
  className?: string;
}

export function MatchFilters({ 
  filters, 
  onFiltersChange, 
  onlinePlayersCount = 0,
  className 
}: MatchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const skillLevelOptions: { value: SkillLevel; label: string; color: string }[] = [
    { value: 'beginner', label: 'Početnik', color: 'bg-gray-100 text-gray-700' },
    { value: 'lower-intermediate', label: 'Niži srednji', color: 'bg-blue-100 text-blue-700' },
    { value: 'intermediate', label: 'Srednji', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'advanced', label: 'Napredni', color: 'bg-orange-100 text-orange-700' },
    { value: 'expert', label: 'Ekspert', color: 'bg-red-100 text-red-700' },
    { value: 'professional', label: 'Profesionalac', color: 'bg-purple-100 text-purple-700' }
  ];

  const matchTypeOptions: { value: MatchType; label: string; icon: React.ReactNode }[] = [
    { value: 'casual', label: 'Opušteno', icon: <Users className="w-4 h-4" /> },
    { value: 'competitive', label: 'Takmičarski', icon: <Star className="w-4 h-4" /> },
    { value: 'practice', label: 'Trening', icon: <Clock className="w-4 h-4" /> },
    { value: 'league', label: 'Liga', icon: <Trophy className="w-4 h-4" /> },
    { value: 'tournament', label: 'Turnir', icon: <Award className="w-4 h-4" /> }
  ];

  const playStyleOptions: { value: PlayStyle; label: string; emoji: string }[] = [
    { value: 'aggressive', label: 'Agresivni', emoji: '⚡' },
    { value: 'defensive', label: 'Obrambeni', emoji: '🛡️' },
    { value: 'all-court', label: 'Univerzalni', emoji: '🎯' },
    { value: 'serve-volley', label: 'Servis-Volej', emoji: '🚀' },
    { value: 'baseline', label: 'Osnovni', emoji: '📍' },
    { value: 'recreational', label: 'Rekreativni', emoji: '😊' }
  ];

  const locationOptions = [
    'Novi Beograd',
    'Zemun', 
    'Vračar',
    'Banovo Brdo',
    'Stari Grad',
    'Voždovac',
    'Palilula'
  ];

  const handleSkillLevelToggle = (level: SkillLevel) => {
    const newLevels = filters.skillLevels.includes(level)
      ? filters.skillLevels.filter(l => l !== level)
      : [...filters.skillLevels, level];
    
    onFiltersChange({ ...filters, skillLevels: newLevels });
  };

  const handleMatchTypeToggle = (type: MatchType) => {
    const newTypes = filters.matchTypes.includes(type)
      ? filters.matchTypes.filter(t => t !== type)
      : [...filters.matchTypes, type];
    
    onFiltersChange({ ...filters, matchTypes: newTypes });
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    
    onFiltersChange({ ...filters, locations: newLocations });
  };

  const handleRatingRangeChange = (field: 'min' | 'max', value: number) => {
    onFiltersChange({
      ...filters,
      ratingRange: { ...filters.ratingRange, [field]: value }
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.skillLevels.length > 0) count++;
    if (filters.matchTypes.length > 0) count++;
    if (filters.locations.length > 0) count++;
    if (filters.onlineOnly) count++;
    if (filters.availableToday) count++;
    if (filters.availableThisWeek) count++;
    return count;
  };

  const clearAllFilters = () => {
    onFiltersChange({
      skillLevels: [],
      ratingRange: { min: 1.0, max: 7.0 },
      locations: [],
      matchTypes: [],
      onlineOnly: false,
      availableToday: false,
      availableThisWeek: false
    });
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 overflow-hidden", className)}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filteri</span>
          {activeFilterCount > 0 && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center space-x-2">
          {onlinePlayersCount > 0 && (
            <div className="flex items-center space-x-1 text-green-600 text-sm">
              <Zap className="w-4 h-4" />
              <span>{onlinePlayersCount} online</span>
            </div>
          )}
          
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Quick Filters */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Brzi filteri</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onFiltersChange({ ...filters, onlineOnly: !filters.onlineOnly })}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  filters.onlineOnly
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <Zap className="w-4 h-4 inline mr-1" />
                Samo online
              </button>
              
              <button
                onClick={() => onFiltersChange({ ...filters, availableToday: !filters.availableToday })}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  filters.availableToday
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <Clock className="w-4 h-4 inline mr-1" />
                Dostupan danas
              </button>
            </div>
          </div>

          {/* Rating Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">NTRP rejting</h4>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Od</label>
                <input
                  type="number"
                  min="1.0"
                  max="7.0"
                  step="0.5"
                  value={filters.ratingRange.min}
                  onChange={(e) => handleRatingRangeChange('min', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Do</label>
                <input
                  type="number"
                  min="1.0"
                  max="7.0"
                  step="0.5"
                  value={filters.ratingRange.max}
                  onChange={(e) => handleRatingRangeChange('max', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Skill Levels */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Nivo igre</h4>
            <div className="flex flex-wrap gap-2">
              {skillLevelOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSkillLevelToggle(option.value)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors border",
                    filters.skillLevels.includes(option.value)
                      ? `${option.color} border-current`
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Match Types */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Tip meča</h4>
            <div className="flex flex-wrap gap-2">
              {matchTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMatchTypeToggle(option.value)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors border flex items-center space-x-1",
                    filters.matchTypes.includes(option.value)
                      ? "bg-primary-100 text-primary-700 border-primary-200"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  )}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Lokacija</h4>
            <div className="flex flex-wrap gap-2">
              {locationOptions.map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationToggle(location)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors border flex items-center space-x-1",
                    filters.locations.includes(location)
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  )}
                >
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
