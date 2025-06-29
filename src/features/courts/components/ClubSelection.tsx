import React from 'react';
import { Card, CardContent } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { useBookingStore } from '../stores/useBookingStore';
import { mockClubs } from '../services/mockData';
import { MapPin, Star, Wifi, Car, Coffee } from 'lucide-react';

export function ClubSelection() {
  const { setClub, nextStep, bookingData } = useBookingStore();

  const handleClubSelect = (club: typeof mockClubs[0]) => {
    setClub(club);
    nextStep();
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('parking')) return <Car className="w-4 h-4" />;
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (amenity.toLowerCase().includes('kafić') || amenity.toLowerCase().includes('restoran')) return <Coffee className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Izaberite klub
        </h2>
        <p className="text-gray-600">
          Odaberite tenis klub gde želite da rezervišete teren
        </p>
      </div>

      {mockClubs.map((club) => (
        <Card 
          key={club.id} 
          className={`cursor-pointer transition-all hover:shadow-md border-2 ${
            bookingData.club?.id === club.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          onClick={() => handleClubSelect(club)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{club.name}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {club.address}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">
                  {club.pricePerHour} RSD
                </div>
                <div className="text-xs text-gray-500">po satu</div>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="mr-4">{club.courts.length} terena</span>
              <div className="flex space-x-1">
                {club.courts.some(c => c.surface === 'hard') && (
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">Hard</span>
                )}
                {club.courts.some(c => c.surface === 'clay') && (
                  <span className="px-2 py-1 bg-orange-100 rounded text-xs">Clay</span>
                )}
                {club.courts.some(c => c.isIndoor) && (
                  <span className="px-2 py-1 bg-blue-100 rounded text-xs">Indoor</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {club.amenities.slice(0, 3).map((amenity, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  {getAmenityIcon(amenity)}
                  <span className="ml-1">{amenity}</span>
                </div>
              ))}
              {club.amenities.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{club.amenities.length - 3} više
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
