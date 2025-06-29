import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./shared/components/layout/AppLayout";
import { Users, MapPin, Trophy, Calendar, Star, Clock, TrendingUp, Award } from "lucide-react";

// Import actual feature pages
import { 
  CourtsPage, 
  CourtReservationPage, 
  ClubSelectionPage, 
  DateTimePage, 
  BookingConfirmationPage, 
  MatchPage, 
  ProfilePage 
} from "./pages";

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
              <p className="text-white/80">Danas je idealan dan za tenis</p>
            </div>
            <div className="text-right">
              <div className="text-white text-sm">Sledeci meč</div>
              <div className="text-white font-semibold">14:00 • Baseline</div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-white text-2xl font-bold">1,250</div>
              <div className="text-white/70 text-sm">Poeni</div>
            </div>
            <div className="text-center">
              <div className="text-white text-2xl font-bold">32</div>
              <div className="text-white/70 text-sm">Mečevi</div>
            </div>
            <div className="text-center">
              <div className="text-white text-2xl font-bold">67%</div>
              <div className="text-white/70 text-sm">Pobede</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Find Match Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 w-fit mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Pronađi Meč</h3>
            <p className="text-gray-600 text-sm mb-3">Nađi protivnika u blizini</p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              <span>Započni</span>
              <TrendingUp className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Book Court Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 w-fit mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Rezerviši Teren</h3>
            <p className="text-gray-600 text-sm mb-3">5 dostupnih terena</p>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <span>Rezerviši</span>
              <Calendar className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        {/* Tournament Card */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Award className="w-6 h-6 mr-3" />
              <div>
                <h3 className="font-bold">Belgrade Open 2024</h3>
                <p className="text-purple-200 text-sm">Registracija do 15. maja</p>
              </div>
            </div>
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
              Prijavi se
            </button>
          </div>
        </div>

        {/* My Clubs Section */}
        <div className="mt-6">
          <h2 className="text-white text-lg font-semibold mb-4">Moji Klubovi</h2>
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">BL</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Baseline Tennis Club</div>
                    <div className="text-white/70 text-sm">3 dostupna terena</div>
                  </div>
                </div>
                <div className="text-white/70">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">PR</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Privilege Sport Centar</div>
                    <div className="text-white/70 text-sm">1 dostupan teren</div>
                  </div>
                </div>
                <div className="text-white/70">
                  <Star className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
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
            {/* Home */}
            <Route path="/" element={<HomePage />} />
            
            {/* Courts - Full reservation system */}
            <Route path="/courts" element={<CourtsPage />} />
            <Route path="/courts/reserve" element={<CourtReservationPage />} />
            <Route path="/courts/reserve/club" element={<ClubSelectionPage />} />
            <Route path="/courts/reserve/datetime" element={<DateTimePage />} />
            <Route path="/courts/reserve/confirm" element={<BookingConfirmationPage />} />
            
            {/* Match Finding - To be implemented in Phase 2B */}
            <Route path="/match" element={<MatchPage />} />
            
            {/* Profile - To be implemented in Phase 2C */}
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
