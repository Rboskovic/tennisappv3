import React from 'react';
import { Bell, Menu, ChevronRight, MapPin, Clock, Star, Users } from 'lucide-react';
import { clubs } from '../../data/clubs';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'match-result' | 'confirmed' | 'info';
  title: string;
  message: string;
  time: string;
  actionText: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'confirmed',
    title: 'Termin potvrđen',
    message: 'Rezervacija za sutra u 14:00 u Baseline-u je potvrđena.',
    time: '10 min',
    actionText: 'Vidi detalje'
  },
  {
    id: '2', 
    type: 'match-result',
    title: 'Rezultat meča',
    message: 'Odigrao si odličan meč protiv Boška Simovića! 6-4, 7-6',
    time: '2h',
    actionText: 'Vidi statistike'
  }
];

export function HomePage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary-700 text-white">
        <div className="max-w-mobile mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQGNBofFZyCxww/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1676035626744?e=2147483647&v=beta&t=KC_7_KFUrScQDala3QM5fC5eQHlkYZBuONdWeZ8VjQE"
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h1 className="text-xl font-semibold flex items-center">
                  Dobro jutro, Marko!
                  <span className="ml-2 text-2xl animate-wave origin-[70%_70%]">👋</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-red rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-mobile mx-auto px-4 py-6 space-y-6">
        
        {/* Notifications */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-textPrimary">Obaveštenja</h2>
            <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
              Vidi sve
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="bg-white rounded-xl p-4 shadow-sm border border-border">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'confirmed' 
                      ? 'bg-secondary-50 text-secondary-600' 
                      : 'bg-accent-yellow/20 text-accent-yellow'
                  }`}>
                    {notification.type === 'confirmed' ? (
                      <Clock className="w-5 h-5" />
                    ) : (
                      <Star className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-textPrimary">{notification.title}</h3>
                      <span className="text-xs text-textHint">{notification.time}</span>
                    </div>
                    <p className="text-sm text-textSecondary mb-2">{notification.message}</p>
                    <button className="text-primary-600 text-sm font-medium flex items-center hover:text-primary-700">
                      {notification.actionText}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tennis Clubs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-textPrimary">Klubovi u blizini</h2>
            <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
              Vidi sve
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {clubs.map((club) => (
              <div 
                key={club.id} 
                className="bg-white rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/courts')}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-textPrimary">{club.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-accent-yellow fill-current" />
                        <span className="text-sm font-medium text-textPrimary">{club.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-textSecondary mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{club.distance} km</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{club.courts.available} dostupnih</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-secondary-50 text-secondary-700 px-2 py-1 rounded-md">
                        {club.courts.available > 0 ? 'Dostupno' : 'Zauzeto'}
                      </span>
                      <span className="text-sm font-medium text-textPrimary">
                        od {club.prices.weekday.singles} din
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
