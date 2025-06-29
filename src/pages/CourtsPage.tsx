// src/pages/CourtsPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Star, Calendar, ArrowRight, Search } from "lucide-react";

export function CourtsPage() {
  const navigate = useNavigate();

  const recentBookings = [
    {
      id: 1,
      club: "Baseline",
      date: "Danas",
      time: "18:00",
      court: "Teren 2",
      status: "confirmed"
    },
    {
      id: 2,
      club: "Gemax",
      date: "Sutra",
      time: "10:00",
      court: "Teren 1",
      status: "pending"
    }
  ];

  const favoriteClubs = [
    {
      id: "baseline",
      name: "Baseline",
      location: "Novi Beograd",
      distance: "2.1 km",
      rating: 4.8,
      priceFrom: 1200,
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400",
      available: true
    },
    {
      id: "gemax",
      name: "Gemax",
      location: "Zemun",
      distance: "5.3 km",
      rating: 4.6,
      priceFrom: 1100,
      image: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=400",
      available: true
    },
    {
      id: "privilege",
      name: "Privilege",
      location: "Vračar",
      distance: "4.7 km",
      rating: 4.9,
      priceFrom: 1500,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Rezervacija Terena</h1>
        <p className="text-green-100 mb-6">
          Pronađite i rezervišite idealan teren za vašu igru
        </p>
        
        {/* Quick Reserve Button */}
        <button
          onClick={() => navigate('/courts/reserve')}
          className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Pronađi dostupne terene
        </button>
      </div>

      {/* Quick Stats */}
      <div className="p-6 pb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-1">12</div>
            <div className="text-xs text-gray-600">Rezervacija</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-1">6</div>
            <div className="text-xs text-gray-600">Klubova</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600 mb-1">4.8</div>
            <div className="text-xs text-gray-600">Prosek</div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      {recentBookings.length > 0 && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Nadolazeće rezervacije</h2>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <Calendar className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{booking.club}</p>
                      <p className="text-gray-600 text-xs">{booking.date} u {booking.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{booking.court}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status === 'confirmed' ? 'Potvrđeno' : 'Na čekanju'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favorite Clubs */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Omiljeni klubovi</h2>
          <button className="text-green-600 font-medium text-sm">Vidi sve</button>
        </div>
        
        <div className="space-y-4">
          {favoriteClubs.map((club) => (
            <div 
              key={club.id}
              onClick={() => navigate('/courts/reserve')}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img 
                    src={club.image} 
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{club.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{club.location} • {club.distance}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-700">{club.rating}</span>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">
                        od {club.priceFrom} RSD
                      </div>
                      <div className={`text-xs ${club.available ? 'text-green-600' : 'text-red-600'}`}>
                        {club.available ? 'Dostupno' : 'Zauzeto'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white text-center">
          <h3 className="font-bold text-lg mb-2">Rezervišite sada!</h3>
          <p className="text-green-100 text-sm mb-4">
            Najbolji tereni na jednom mestu
          </p>
          <button
            onClick={() => navigate('/courts/reserve')}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Započni rezervaciju
          </button>
        </div>
      </div>
    </div>
  );
}
