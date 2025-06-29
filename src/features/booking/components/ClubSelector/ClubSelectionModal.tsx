import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Modal, Button, Badge } from '../../../../shared/components/ui';
import { cn } from '../../../../shared/utils/cn';
import type { Club } from '../../types';

interface ClubSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubs: Club[];
  selectedClubIds: string[];
  onToggleClub: (clubId: string) => void;
  onConfirm: () => void;
}

export function ClubSelectionModal({
  isOpen,
  onClose,
  clubs,
  selectedClubIds,
  onToggleClub,
  onConfirm,
}: ClubSelectionModalProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'tennis' | 'padel'>('all');

  // Filter clubs based on search and type
  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || club.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Izaberite Klubove"
      size="large"
    >
      <div className="p-6">
        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Pretražite klubove..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Svi' },
              { key: 'tennis', label: 'Tenis' },
              { key: 'padel', label: 'Padel' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterType(filter.key as any)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  filterType === filter.key
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Count */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedClubIds.length} klub(ova) izabrano
          </span>
          <Badge variant="info" size="sm">
            {filteredClubs.length} rezultata
          </Badge>
        </div>

        {/* Club List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredClubs.map((club) => (
            <ClubSelectionItem
              key={club.id}
              club={club}
              isSelected={selectedClubIds.includes(club.id)}
              onToggle={() => onToggleClub(club.id)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredClubs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Filter className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nema rezultata za "{searchQuery}"</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Otkaži
          </Button>
          <Button onClick={handleConfirm} className="flex-1">
            Gotovo ({selectedClubIds.length})
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface ClubSelectionItemProps {
  club: Club;
  isSelected: boolean;
  onToggle: () => void;
}

function ClubSelectionItem({ club, isSelected, onToggle }: ClubSelectionItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={cn(
        'flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all',
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      )}
    >
      <div className="flex items-center space-x-4">
        {/* Club Logo */}
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          {club.logo ? (
            <img src={club.logo} alt={club.name} className="w-6 h-6 object-contain" />
          ) : (
            <span className="text-blue-600 font-bold text-sm">
              {club.name.charAt(0)}
            </span>
          )}
        </div>

        {/* Club Details */}
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900">{club.name}</h4>
            {club.type && (
              <Badge variant="info" size="sm">
                {club.type}
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{club.distance.toFixed(1)} km</span>
            <span className="mx-2">•</span>
            <span className="text-green-600 font-medium">
              {club.courts.available} dostupno
            </span>
          </div>
        </div>
      </div>

      {/* Toggle Switch */}
      <div
        className={cn(
          'w-12 h-6 rounded-full transition-colors relative',
          isSelected ? 'bg-blue-600' : 'bg-gray-300'
        )}
      >
        <div
          className={cn(
            'absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform',
            isSelected ? 'translate-x-6' : 'translate-x-0.5'
          )}
        />
      </div>
    </div>
  );
}
