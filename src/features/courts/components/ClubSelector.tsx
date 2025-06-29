// src/features/courts/components/ClubSelector.tsx
import React, { useState } from 'react';
import { MapPin, Star, Users, Check } from 'lucide-react';
import { Club } from '../types';
import { cn } from '../../../shared/utils/cn';

interface ClubSelectorProps {
  clubs: Club[];
  selectedClubIds: string[];
  onClubSelect: (clubId: string) => void;
  onClubDeselect: (clubId: string) => void;
  allowMultiple?: boolean;
  className?: string;
}

export function ClubSelector({ 
  clubs, 
  selectedClubIds, 
  onClubSelect, 
  onClubDeselect,
  allowMultiple = true,
  className 
}: ClubSelectorProps) {
  const [showAllClubs, setShowAllClubs] = useState(false);
  
  // Show first 3 clubs by default, all if expanded
  const visibleClubs = showAllClubs ? clubs : clubs.slice(0, 3);
  const hasMoreClubs = clubs.length > 3;

  const handleClubClick = (clubId: string) => {
    if (selectedClubIds.includes(clubId)) {
      onClubDeselect(clubId);
    } else {
      if (!allowMultiple) {
        // If single selection, deselect all others first
        selectedClubIds.forEach(id => onClubDeselect(id));
      }
      onClubSelect(clubId);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {visibleClubs.map((club) => {
        const isSelected = selectedClubIds.includes(club.id);
        
        return (
          <div
            key={club.id}
            onClick={() => handleClubClick(club.id)}
            className={cn(
              "relative bg-white rounded-xl p-4 border-2 cursor-pointer transition-all duration-200",
              "hover:shadow-md active:scale-[0.99]",
              isSelected 
                ? "border-primary-500 bg-primary-50 shadow-md" 
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            <div className="flex items-start space-x-4">
              {/* Club image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src={club.image} 
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Club info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {club.name}
                  </h3>
                  <div className="text-right ml-2">
                    <div className="text-lg font-bold text-primary-600">
                      {club.pricePerHour} RSD
                    </div>
                    <div className="text-xs text-gray-500">po satu</div>
                  </div>
                </div>

                {/* Location and distance */}
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{club.location}</span>
                  {club.distance && (
                    <span className="ml-2 text-primary-600 font-medium">
                      {club.distance} km
                    </span>
                  )}
                </div>

                {/* Courts and amenities */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{club.courts.length} terena</span>
                  </div>
                  
                  <div className="flex items-center text-amber-600">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="font-medium">4.{Math.floor(Math.random() * 9)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Show more clubs button */}
      {hasMoreClubs && !showAllClubs && (
        <button
          onClick={() => setShowAllClubs(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          Prikaži sve klubove (+{clubs.length - 3})
        </button>
      )}

      {/* Selected clubs summary */}
      {selectedClubIds.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
          <div className="text-sm font-medium text-primary-900 mb-1">
            Izabrani klubovi ({selectedClubIds.length})
          </div>
          <div className="text-sm text-primary-700">
            {selectedClubIds.map(id => {
              const club = clubs.find(c => c.id === id);
              return club?.name;
            }).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}
