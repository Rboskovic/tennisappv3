import React from 'react';
import { MapPin, Plus, Check } from 'lucide-react';
import { Card, Badge, Button } from '../../../../shared/components/ui';
import { cn } from '../../../../shared/utils/cn';
import type { Club } from '../../types';

interface ClubSelectorProps {
  clubs: Club[];
  selectedClubIds: string[];
  onToggleClub: (clubId: string) => void;
  onShowMore?: () => void;
  showMoreButton?: boolean;
  maxDisplayed?: number;
  className?: string;
}

export function ClubSelector({
  clubs,
  selectedClubIds,
  onToggleClub,
  onShowMore,
  showMoreButton = true,
  maxDisplayed = 3,
  className,
}: ClubSelectorProps): JSX.Element {
  const displayedClubs = clubs.slice(0, maxDisplayed);
  const hasMoreClubs = clubs.length > maxDisplayed;

  return (
    <div className={cn('space-y-3', className)}>
      {displayedClubs.map((club) => (
        <ClubCard
          key={club.id}
          club={club}
          isSelected={selectedClubIds.includes(club.id)}
          onToggle={() => onToggleClub(club.id)}
        />
      ))}
      
      {showMoreButton && hasMoreClubs && onShowMore && (
        <Button
          variant="outline"
          onClick={onShowMore}
          className="w-full justify-center border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Prikaži još klubova ({clubs.length - maxDisplayed})
        </Button>
      )}
    </div>
  );
}

interface ClubCardProps {
  club: Club;
  isSelected: boolean;
  onToggle: () => void;
}

function ClubCard({ club, isSelected, onToggle }: ClubCardProps): JSX.Element {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 border-2',
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      )}
      padding="md"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* Club Logo/Icon */}
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {club.logo ? (
              <img
                src={club.logo}
                alt={club.name}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {club.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Club Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {club.name}
              </h3>
              {club.type && (
                <Badge variant="info" size="sm">
                  {club.type}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{club.distance.toFixed(1)} km</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>
                <span className="font-medium text-green-600">
                  {club.courts.available}
                </span>{' '}
                dostupno
              </span>
              <span>
                {club.courts.indoor} unutrašnji
              </span>
              <span>
                {club.courts.outdoor} spoljašnji
              </span>
            </div>
          </div>
        </div>

        {/* Selection Indicator */}
        <div
          className={cn(
            'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
            isSelected
              ? 'bg-blue-600 border-blue-600'
              : 'border-gray-300'
          )}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
    </Card>
  );
}
