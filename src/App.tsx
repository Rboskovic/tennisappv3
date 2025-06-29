import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./shared/components/layout/AppLayout";
import { Users, MapPin, Trophy, Calendar, Star, Clock, TrendingUp, Award } from "lucide-react";
import { CourtReservationPage } from "./features/booking";

const queryClient = new QueryClient();

// Premium Home Page with glassmorphic design
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      {/* Hero Section with glassmorphic card */}
      <div className="p-6 pb-0">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Dobro jutro, Marko!</h1>
              <p className="text-white/80">Nađite savršenog partnera za tenis</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎾</span>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24</div>
              <div className="text-sm text-white/70">Mečeva</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-sm text-white/70">Rejting</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">87%</div>
              <div className="text-sm text-white/70">Pobede</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tennis Clubs Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Popularni Klubovi</h2>
        <div className="space-y-3">
          {['Baseline', 'Gemax', 'Privilege'].map((club, index) => (
            <div key={club} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{club[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{club}</h3>
                    <p className="text-sm text-white/70">{2.3 + index * 0.5} km</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-300">
                    {3 - index} dostupno
                  </div>
                  <div className="text-xs text-white/60">{5 + index} terena</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tournament Banner */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-white" />
          <h3 className="text-lg font-bold text-white mb-2">Letnji Turnir 2024</h3>
          <p className="text-white/90 text-sm mb-4">Prijavite se do 15. jula</p>
          <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold">
            Saznaj više
          </button>
        </div>
      </div>
    </div>
  );
}

function MatchPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Pronađi Meč</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="font-semibold text-blue-900 mb-2">Pronađi protivnika</h3>
        <p className="text-blue-700 mb-4">Ovde ćete moći da pronađete protivnike za tenis.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Započni pretragu
        </button>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Profil</h2>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-xl font-bold">MP</span>
        </div>
        <h3 className="font-semibold text-purple-900 mb-2">Marko Petrović</h3>
        <p className="text-purple-700 mb-4">Vaš korisnički profil i statistike.</p>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Uredi profil
        </button>
      </div>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/courts" element={<CourtReservationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
