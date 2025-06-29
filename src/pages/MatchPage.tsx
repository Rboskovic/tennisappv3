// src/pages/MatchPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Search, Zap, Target, Trophy, Star, Clock, Calendar, Award } from "lucide-react";
import { useMatchSearch } from "../features/matches/hooks/useMatchSearch";
import { usePlayerMatching } from "../features/matches/hooks/usePlayerMatching";
import { PlayerCard } from "../features/matches/components/PlayerCard";

export function MatchPage() {
  const navigate = useNavigate();
  
  const { onlinePlayersCount, featuredPlayers, suggestedMatches } = useMatchSearch();
  const { receivedRequests, sentRequests } = usePlayerMatching();
  
  const totalRequests = receivedRequests.length + sentRequests.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Pronađi Meč</h1>
        <p className="text-blue-100 mb-6">
          Igraj protiv igrača na tvom nivou
        </p>
        
        <button
          onClick={() => navigate('/match/search')}
          className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Započni pretragu igrača
        </button>
      </div>

      {/* Quick Stats */}
      <div className="p-6 pb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-1">{onlinePlayersCount}</div>
            <div className="text-xs text-gray-600">Online sada</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-1">{suggestedMatches.length}</div>
            <div className="text-xs text-gray-600">Preporučeni</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600 mb-1">{totalRequests}</div>
            <div className="text-xs text-gray-600">Zahtevi</div>
          </div>
        </div>
      </div>

      {/* Match Types */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tip meča</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/match/search')}
            className="bg-white rounded-xl p-4 border-2 border-orange-200 bg-orange-50 text-left hover:shadow-md transition-shadow"
          >
            <Zap className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-gray-900 text-sm mb-1">Brzi meč</h3>
            <p className="text-gray-600 text-xs">Pronađi dostupnog protivnika</p>
          </button>
          
          <button
            onClick={() => navigate('/match/search')}
            className="bg-white rounded-xl p-4 border-2 border-gray-200 text-left hover:shadow-md transition-shadow"
          >
            <Target className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-gray-900 text-sm mb-1">Takmičarski</h3>
            <p className="text-gray-600 text-xs">Za rangiranje i poene</p>
          </button>
        </div>
      </div>

      {/* Featured Players */}
      {featuredPlayers.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Top igrači</h2>
            <button
              onClick={() => navigate('/match/search')}
              className="text-blue-600 font-medium text-sm"
            >
              Vidi sve
            </button>
          </div>
          
          <div className="space-y-3">
            {featuredPlayers.slice(0, 2).map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                variant="compact"
                showOnlineStatus={true}
                onPlayerClick={() => navigate('/match/search')}
                onChallengeClick={() => navigate('/match/search')}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Brze akcije</h2>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/match/search')}
            className="w-full bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Online igrači</h3>
                <p className="text-gray-600 text-sm">{onlinePlayersCount} dostupno sada</p>
              </div>
            </div>
            <div className="text-gray-400">›</div>
          </button>

          <button
            onClick={() => navigate('/match/search')}
            className="w-full bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Preporučeni mečevi</h3>
                <p className="text-gray-600 text-sm">Igrači na vašem nivou</p>
              </div>
            </div>
            <div className="text-gray-400">›</div>
          </button>

          {totalRequests > 0 && (
            <button
              onClick={() => navigate('/match/search')}
              className="w-full bg-white rounded-xl p-4 border border-purple-200 bg-purple-50 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Zahtevi za mečeve</h3>
                  <p className="text-gray-600 text-sm">{totalRequests} novih zahteva</p>
                </div>
              </div>
              <div className="bg-purple-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                {totalRequests}
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
