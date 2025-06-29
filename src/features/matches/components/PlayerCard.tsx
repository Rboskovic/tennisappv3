// src/features/matches/components/PlayerCard.tsx
import React from 'react';
import { Star, MapPin, Trophy, Zap, Shield, Clock } from 'lucide-react';
import { Player } from '../types';
import { cn } from '../../../shared/utils/cn';

interface PlayerCardProps {
  player: Player;
  variant?: 'default' | 'compact' | 'detailed';
  showOnlineStatus?: boolean;
  showStats?: boolean;
  showAvailability?: boolean;
  onPlayerClick?: (player: Player) => void;
  onChallengeClick?: (player: Player) => void;
  className?: string;
}

export function PlayerCard({
  player,
  variant = 'default',
  showOnlineStatus = true,
  showStats = true,
  showAvailability = false,
  onPlayerClick,
  onChallengeClick,
  className
}: PlayerCardProps) {
  
  const getSkillLevelInfo = (level: string) => {
    const levels = {
      'beginner': { label: 'Početnik', color: 'bg-gray-100 text-gray-700', icon: '🟢' },
      'lower-intermediate': { label: 'Niži srednji', color: 'bg-blue-100 text-blue-700', icon: '🔵' },
      'intermediate': { label: 'Srednji', color: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
      'advanced': { label: 'Napredni', color: 'bg-orange-100 text-orange-700', icon: '🟠' },
      'expert': { label: 'Ekspert', color: 'bg-red-100 text-red-700', icon: '🔴' },
      'professional': { label: 'Profesionalac', color: 'bg-purple-100 text-purple-700', icon: '🟣' }
    };
    return levels[level as keyof typeof levels] || levels.beginner;
  };

  const getPlayStyleIcon = (style: string) => {
    const styles = {
      'aggressive': '⚡',
      'defensive': '🛡️', 
      'all-court': '🎯',
      'serve-volley': '🚀',
      'baseline': '📍',
      'recreational': '😊'
    };
    return styles[style as keyof typeof styles] || '🎾';
  };

  const skillInfo = getSkillLevelInfo(player.skillLevel);
  const playStyleIcon = getPlayStyleIcon(player.preferredPlayStyle);

  if (variant === 'compact') {
    return (
      <div
        onClick={() => onPlayerClick?.(player)}
        className={cn(
          "bg-white rounded-lg p-3 border border-gray-200 cursor-pointer hover:shadow-md transition-all",
          className
        )}
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={player.avatar}
              alt={player.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {showOnlineStatus && (
              <div className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full",
                player.isOnline ? "bg-green-500" : "bg-gray-400"
              )} />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900 truncate">{player.name}</h4>
              {player.verified && <Shield className="w-4 h-4 text-blue-500" />}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{skillInfo.icon}</span>
              <span>{player.ntrpRating}</span>
              <span>•</span>
              <span>{playStyleIcon}</span>
            </div>
          </div>
          
          {onChallengeClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChallengeClick(player);
              }}
              className="bg-primary-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Pozovi
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onPlayerClick?.(player)}
      className={cn(
        "bg-white rounded-xl p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition-all duration-200",
        "hover:border-primary-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={player.avatar}
              alt={player.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {showOnlineStatus && (
              <div className={cn(
                "absolute -bottom-1 -right-1 w-5 h-5 border-2 border-white rounded-full",
                player.isOnline ? "bg-green-500" : "bg-gray-400"
              )} />
            )}
            {player.isOnline && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900">{player.name}</h3>
              {player.verified && <Shield className="w-5 h-5 text-blue-500" />}
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{player.location}</span>
              <span>•</span>
              <span>{player.age} godina</span>
            </div>
          </div>
        </div>

        {onChallengeClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChallengeClick(player);
            }}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Trophy className="w-4 h-4" />
            <span>Pozovi na meč</span>
          </button>
        )}
      </div>

      {/* Skills & Rating */}
      <div className="flex items-center space-x-3 mb-4">
        <span className={cn("px-3 py-1 rounded-full text-sm font-medium", skillInfo.color)}>
          {skillInfo.icon} {skillInfo.label}
        </span>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-semibold text-gray-900">{player.ntrpRating}</span>
        </div>
        <span className="text-sm text-gray-600">
          {playStyleIcon} {player.preferredPlayStyle}
        </span>
      </div>

      {/* Bio */}
      {player.bio && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{player.bio}</p>
      )}

      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{player.stats.winRate.toFixed(0)}%</div>
            <div className="text-xs text-gray-600">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{player.stats.matchesPlayed}</div>
            <div className="text-xs text-gray-600">Mečevi</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{player.rankingPoints}</div>
            <div className="text-xs text-gray-600">Poeni</div>
          </div>
        </div>
      )}

      {/* Recent Form */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-600">Forma:</span>
          {player.stats.recentForm.map((result, index) => (
            <span
              key={index}
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                result === 'W' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}
            >
              {result}
            </span>
          ))}
        </div>

        {showAvailability && player.isOnline && (
          <div className="flex items-center space-x-1 text-green-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>Dostupan sada</span>
          </div>
        )}
      </div>

      {/* Achievements */}
      {player.achievements.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Dostignuća:</span>
            {player.achievements.slice(0, 3).map((achievement) => (
              <span
                key={achievement.id}
                title={achievement.description}
                className="text-lg"
              >
                {achievement.icon}
              </span>
            ))}
            {player.achievements.length > 3 && (
              <span className="text-sm text-gray-500">+{player.achievements.length - 3}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
