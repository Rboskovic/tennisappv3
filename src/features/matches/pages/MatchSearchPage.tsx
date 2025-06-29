// src/features/matches/pages/MatchSearchPage.tsx
import React, { useState } from 'react';
import { Search, Users, Zap, Star, ArrowLeft, Send, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PlayerCard } from '../components/PlayerCard';
import { MatchFilters } from '../components/MatchFilters';
import { OnlineStatus, BulkOnlineStatus } from '../components/OnlineStatus';
import { useMatchSearch } from '../hooks/useMatchSearch';
import { usePlayerMatching } from '../hooks/usePlayerMatching';
import { Player } from '../types';
import { cn } from '../../../shared/utils/cn';

type ViewMode = 'search' | 'suggested' | 'online' | 'requests';

export function MatchSearchPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('suggested');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showMatchRequest, setShowMatchRequest] = useState(false);

  // Hooks
  const {
    searchResults,
    isSearching,
    filters,
    setFilters,
    onlinePlayersCount,
    suggestedMatches,
    featuredPlayers
  } = useMatchSearch({
    initialFilters: { onlineOnly: false }
  });

  const {
    sendMatchRequest,
    receivedRequests,
    sentRequests,
    respondToRequest,
    isLoading: isMatchLoading
  } = usePlayerMatching();

  // Handle player challenge
  const handleChallengePlayer = (player: Player) => {
    setSelectedPlayer(player);
    setShowMatchRequest(true);
  };

  // Handle match request
  const handleSendMatchRequest = async (message: string) => {
    if (!selectedPlayer) return;
    
    try {
      await sendMatchRequest(selectedPlayer, message);
      setShowMatchRequest(false);
      setSelectedPlayer(null);
      alert(`Zahtev poslat igraču ${selectedPlayer.name}!`);
    } catch (error) {
      console.error('Error sending match request:', error);
    }
  };

  // Get view data based on current mode
  const getViewData = () => {
    switch (viewMode) {
      case 'search':
        return {
          title: 'Rezultati pretrage',
          players: searchResults.players,
          isEmpty: searchResults.players.length === 0,
          emptyMessage: 'Nema igrača koji odgovaraju vašim kriterijumima'
        };
      case 'suggested':
        return {
          title: 'Preporučeni igrači',
          players: suggestedMatches.map(match => match.player),
          isEmpty: suggestedMatches.length === 0,
          emptyMessage: 'Nema preporučenih igrača trenutno'
        };
      case 'online':
        return {
          title: 'Online igrači',
          players: searchResults.players.filter(p => p.isOnline),
          isEmpty: searchResults.players.filter(p => p.isOnline).length === 0,
          emptyMessage: 'Nema online igrača trenutno'
        };
      case 'requests':
        return {
          title: 'Zahtevi za mečeve',
          players: [],
          isEmpty: receivedRequests.length === 0 && sentRequests.length === 0,
          emptyMessage: 'Nemate zahteve za mečeve'
        };
      default:
        return { title: '', players: [], isEmpty: true, emptyMessage: '' };
    }
  };

  const viewData = getViewData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/match')}
              className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Pronađi Meč</h1>
            <div className="w-8" /> {/* Spacer */}
          </div>
        </div>
      </div>

      {/* Search Stats */}
      <div className="max-w-md mx-auto p-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg">Igrači u tvom gradu</h2>
            <Search className="w-6 h-6" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold">{searchResults.totalCount}</div>
              <div className="text-blue-100 text-sm">Ukupno igrača</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-300">{onlinePlayersCount}</div>
              <div className="text-blue-100 text-sm">Online sada</div>
            </div>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex bg-white rounded-xl border border-gray-200 p-1 mb-4">
          {[
            { mode: 'suggested' as ViewMode, label: 'Preporučeni', icon: Star },
            { mode: 'online' as ViewMode, label: 'Online', icon: Zap },
            { mode: 'search' as ViewMode, label: 'Svi', icon: Users },
            { mode: 'requests' as ViewMode, label: 'Zahtevi', icon: Send }
          ].map(({ mode, label, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                "flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                viewMode === mode
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              {mode === 'requests' && (receivedRequests.length > 0) && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {receivedRequests.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filters (only show in search mode) */}
        {viewMode === 'search' && (
          <div className="mb-4">
            <MatchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onlinePlayersCount={onlinePlayersCount}
            />
          </div>
        )}

        {/* Content based on view mode */}
        {viewMode === 'requests' ? (
          <div className="space-y-4">
            {/* Received Requests */}
            {receivedRequests.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Primljeni zahtevi</h3>
                <div className="space-y-3">
                  {receivedRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start space-x-3">
                        <img
                          src={request.from.avatar}
                          alt={request.from.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{request.from.name}</h4>
                            <OnlineStatus 
                              isOnline={request.from.isOnline}
                              lastSeen={request.from.lastSeen}
                            />
                          </div>
                          {request.message && (
                            <p className="text-gray-700 text-sm mb-3">{request.message}</p>
                          )}
                          {request.proposedDate && (
                            <p className="text-gray-600 text-sm mb-3">
                              Predlog: {request.proposedDate} u {request.proposedTime}
                            </p>
                          )}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => respondToRequest(request.id, 'accepted')}
                              disabled={isMatchLoading}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                            >
                              Prihvati
                            </button>
                            <button
                              onClick={() => respondToRequest(request.id, 'declined')}
                              disabled={isMatchLoading}
                              className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
                            >
                              Odbij
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sent Requests */}
            {sentRequests.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Poslani zahtevi</h3>
                <div className="space-y-3">
                  {sentRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={request.to.avatar}
                            alt={request.to.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{request.to.name}</h4>
                            <p className="text-gray-600 text-sm">Čeka odgovor...</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-600 text-sm font-medium">Na čekanju</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {receivedRequests.length === 0 && sentRequests.length === 0 && (
              <div className="text-center py-8">
                <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nemate zahteve za mečeve</p>
                <p className="text-gray-500 text-sm">Pozovite nekog igrača na meč!</p>
              </div>
            )}
          </div>
        ) : (
          /* Player Results */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{viewData.title}</h3>
              {viewMode === 'online' && (
                <BulkOnlineStatus 
                  players={viewData.players.map(p => ({ isOnline: p.isOnline, name: p.name }))}
                />
              )}
            </div>

            {isSearching ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : viewData.isEmpty ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">{viewData.emptyMessage}</p>
                <p className="text-gray-500 text-sm">Probajte da promenite filtere pretrage</p>
              </div>
            ) : (
              <div className="space-y-4">
                {viewData.players.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    showOnlineStatus={true}
                    showStats={true}
                    showAvailability={viewMode === 'online'}
                    onPlayerClick={(player) => console.log('View profile:', player.name)}
                    onChallengeClick={handleChallengePlayer}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Match Request Modal */}
      {showMatchRequest && selectedPlayer && (
        <MatchRequestModal
          player={selectedPlayer}
          onSend={handleSendMatchRequest}
          onClose={() => {
            setShowMatchRequest(false);
            setSelectedPlayer(null);
          }}
          isLoading={isMatchLoading}
        />
      )}
    </div>
  );
}

// Match Request Modal Component
interface MatchRequestModalProps {
  player: Player;
  onSend: (message: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

function MatchRequestModal({ player, onSend, onClose, isLoading }: MatchRequestModalProps) {
  const [message, setMessage] = useState('');

  const predefinedMessages = [
    `Zdravo ${player.name}! Hoćeš da igramo tenis?`,
    `Pozdrav! Da li si slobodan/na za jedan set?`,
    `Vidim da si ${player.skillLevel} igrač. Hoćemo da testiramo naše veštine? 🎾`,
    `Pozivam te na prijateljski meč u našem klubu!`
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Pozovi na meč</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <img
              src={player.avatar}
              alt={player.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{player.name}</h4>
              <p className="text-gray-600 text-sm">{player.ntrpRating} NTRP • {player.location}</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vaša poruka
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Napišite poruku igraču..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 resize-none"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Ili izaberite predefinisanu poruku:</p>
            <div className="space-y-2">
              {predefinedMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(msg)}
                  className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                >
                  {msg}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Otkaži
            </button>
            <button
              onClick={() => onSend(message)}
              disabled={!message.trim() || isLoading}
              className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Pošalji poziv
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
