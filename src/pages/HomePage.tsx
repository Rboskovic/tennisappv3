import React from "react";
import { 
  Users, 
  MapPin, 
  Trophy, 
  Calendar, 
  Star, 
  Clock, 
  TrendingUp, 
  Award
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-gray-50 -mt-4">
      <div className="p-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 rounded-lg p-3 w-fit mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Pronađi Meč</h3>
            <p className="text-gray-600 text-sm">Nađi protivnika u blizini</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 rounded-lg p-3 w-fit mb-3">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Rezerviši Teren</h3>
            <p className="text-gray-600 text-sm">5 dostupnih terena</p>
          </div>
        </div>

        {/* Clubs Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Dostupni tereni</h2>
            <button className="text-blue-600 text-sm font-medium">Pogledaj sve</button>
          </div>
          
          <div className="space-y-3">
            {/* Baseline Club */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-lg">B</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Baseline</h3>
                    <p className="text-gray-600 text-sm">1.2 km • 4 terena dostupno</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                  <span className="text-xs text-gray-500">2000 RSD/h</span>
                </div>
              </div>
            </div>

            {/* Gemax Club */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-lg">G</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Gemax</h3>
                    <p className="text-gray-600 text-sm">2.1 km • 2 terena dostupno</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">4.6</span>
                  </div>
                  <span className="text-xs text-gray-500">1800 RSD/h</span>
                </div>
              </div>
            </div>

            {/* Privilege Club */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-lg">P</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Privilege</h3>
                    <p className="text-gray-600 text-sm">3.5 km • 6 terena dostupno</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                  <span className="text-xs text-gray-500">2500 RSD/h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white">
          <div className="flex items-center">
            <Award className="w-8 h-8 mr-3" />
            <div className="flex-1">
              <h3 className="font-bold">Belgrade Open 2024</h3>
              <p className="text-purple-200 text-sm">Registracija do 15. maja</p>
            </div>
            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
              Prijavi se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
