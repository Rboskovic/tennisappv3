// src/features/matches/components/OnlineStatus.tsx
import React from 'react';
import { Zap, Clock, Calendar } from 'lucide-react';
import { cn } from '../../../shared/utils/cn';

interface OnlineStatusProps {
  isOnline: boolean;
  lastSeen?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function OnlineStatus({ 
  isOnline, 
  lastSeen, 
  showLabel = false, 
  size = 'md',
  className 
}: OnlineStatusProps) {
  
  const getLastSeenText = (lastSeen: string): string => {
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Upravo sada';
    if (diffInMinutes < 60) return `Pre ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Pre ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Pre ${diffInDays}d`;
    
    return 'Pre više od nedelje';
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3', 
    lg: 'w-4 h-4'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (isOnline) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div className="relative">
          <div className={cn(
            "rounded-full bg-green-500 animate-pulse",
            sizeClasses[size]
          )} />
          <div className={cn(
            "absolute inset-0 rounded-full bg-green-400 animate-ping",
            sizeClasses[size]
          )} />
        </div>
        
        {showLabel && (
          <div className="flex items-center space-x-1">
            <Zap className={cn("text-green-500", iconSizeClasses[size])} />
            <span className="text-green-600 font-medium text-sm">Online</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn(
        "rounded-full bg-gray-400",
        sizeClasses[size]
      )} />
      
      {showLabel && lastSeen && (
        <div className="flex items-center space-x-1">
          <Clock className={cn("text-gray-400", iconSizeClasses[size])} />
          <span className="text-gray-500 text-sm">{getLastSeenText(lastSeen)}</span>
        </div>
      )}
    </div>
  );
}

// Bulk online status for player lists
interface BulkOnlineStatusProps {
  players: Array<{ isOnline: boolean; name: string }>;
  className?: string;
}

export function BulkOnlineStatus({ players, className }: BulkOnlineStatusProps) {
  const onlineCount = players.filter(p => p.isOnline).length;
  const totalCount = players.length;
  
  return (
    <div className={cn("flex items-center space-x-2 text-sm", className)}>
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="font-medium text-green-600">{onlineCount} online</span>
      </div>
      <span className="text-gray-500">od {totalCount} igrača</span>
    </div>
  );
}
