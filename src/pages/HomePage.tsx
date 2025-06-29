import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  
  // State for modals
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Notification count - in a real app this would come from an API
  const notificationCount = 2;

  // Close all modals when component mounts or when the ESC key is pressed
  useEffect(() => {
    // Close any open modals when the component first loads
    setIsNotificationsModalOpen(false);
    setIsMenuOpen(false);

    // Event listener for the ESC key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNotificationsModalOpen(false);
        setIsMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleEscKey);

    // Clean up event listener
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  // Handle menu toggle
  const handleMenuToggle = () => {
    // Make sure to close notifications if opening menu
    if (!isMenuOpen) {
      setIsNotificationsModalOpen(false);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle notification toggle
  const handleNotificationsToggle = () => {
    // Make sure to close menu if opening notifications
    if (!isNotificationsModalOpen) {
      setIsMenuOpen(false);
    }
    setIsNotificationsModalOpen(!isNotificationsModalOpen);
  };

  // Close all modals when clicking outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal-overlay")) {
      setIsNotificationsModalOpen(false);
      setIsMenuOpen(false);
    }
  };

  // Handle club card clicks
  const handleClubClick = (clubName: string) => {
    // Navigate to courts page for immediate booking
    navigate('/courts');
  };

  // Handle top-up credits
  const handleBuyCredits = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Opening credits top-up screen");
  };

  return (
    <div className="main-container">
      <header className="app-header">
        <div className="header-content">
          <div className="user-greeting">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User Avatar"
              className="avatar"
            />
            <h2>
              Ćao, Goran{" "}
              <img
                src="https://em-content.zobj.net/source/microsoft-teams/337/waving-hand_1f44b.png"
                alt="Waving hand"
                className="waving-hand-emoji"
              />
            </h2>
          </div>
          <div className="header-actions">
            <button
              className="notification-btn"
              onClick={handleNotificationsToggle}
              aria-label="Notifications"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {notificationCount > 0 && (
                <span
                  className="notification-badge"
                  aria-label={`${notificationCount} notifications`}
                >
                  {notificationCount}
                </span>
              )}
            </button>
            <button
              className="menu-btn"
              onClick={handleMenuToggle}
              aria-label="Menu"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="clubs-section">
          <div className="section-header">
            <h3>Dostupni tereni</h3>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/courts');
              }}
            >
              Pogledaj Sve
            </a>
          </div>

          <div className="clubs-list">
            {/* Baseline Club */}
            <div className="club-card" onClick={() => handleClubClick('Baseline')}>
              <div className="club-icon baseline-icon">
                <img
                  src="https://poslovi-ugostiteljstvo.com/wp-content/uploads/wp-job-board-pro-uploads/_employer_featured_image/2023/05/Slika1-1.png"
                  alt="Baseline"
                />
              </div>
              <div className="club-details">
                <h4>Baseline</h4>
                <div className="club-status">
                  <span className="available">3 dostupno</span>
                  <span className="distance">1.2 km</span>
                </div>
              </div>
            </div>

            {/* Gemax Club */}
            <div className="club-card" onClick={() => handleClubClick('Gemax')}>
              <div className="club-icon">
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a73e8' }}>G</span>
              </div>
              <div className="club-details">
                <h4>Gemax</h4>
                <div className="club-status">
                  <span className="available">2 dostupno</span>
                  <span className="distance">2.3 km</span>
                </div>
              </div>
            </div>

            {/* Privilege Club */}
            <div className="club-card" onClick={() => handleClubClick('Privilege')}>
              <div className="club-icon">
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a73e8' }}>P</span>
              </div>
              <div className="club-details">
                <h4>Privilege</h4>
                <div className="club-status">
                  <span className="available">1 dostupno</span>
                  <span className="distance">3.1 km</span>
                </div>
              </div>
            </div>

            {/* Padel Center */}
            <div className="club-card" onClick={() => handleClubClick('Padel Center')}>
              <div className="club-icon padel-icon">
                <img
                  src="https://padelcentar.rs/wp-content/uploads/2022/08/logo.png"
                  alt="Padel Center"
                />
              </div>
              <div className="club-details">
                <h4>Padel Center</h4>
                <div className="club-status">
                  <span className="available">2 dostupno</span>
                  <span className="distance">1.8 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Banner */}
        <div className="tournament-banner">
          <div className="tournament-content">
            <div className="tournament-icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
            <div className="tournament-info">
              <h4>Letnji Turnir 2024</h4>
              <p>Prijavite se do 15. jula</p>
            </div>
            <button className="tournament-btn">Saznaj više</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h3>Poslednja aktivnost</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="activity-content">
                <p><strong>Pobeda protiv Nikole</strong></p>
                <span>Pre 2 dana</span>
              </div>
              <span className="activity-points">+25</span>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="activity-content">
                <p><strong>Rezervisan teren</strong></p>
                <span>Pre 3 dana</span>
              </div>
              <span className="activity-points">Teren 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      {isNotificationsModalOpen && (
        <div className="modal-overlay active" onClick={handleOutsideClick}>
          <div className="notifications-modal">
            <div className="modal-header">
              <h3>Notifications</h3>
              <button onClick={() => setIsNotificationsModalOpen(false)}>×</button>
            </div>
            <div className="notifications-list">
              <div className="notification-item">
                <div className="notification-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div className="notification-content">
                  <h4>Reservation Confirmed</h4>
                  <p>Your court at Baseline is confirmed for tomorrow at 2 PM</p>
                  <span className="notification-time">2 hours ago</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </div>
                <div className="notification-content">
                  <h4>Match Result</h4>
                  <p>You won against Nikola Petrović!</p>
                  <span className="notification-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {isMenuOpen && (
        <div className="modal-overlay active" onClick={handleOutsideClick}>
          <div className="menu-modal">
            <div className="menu-header">
              <div className="user-profile">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                  className="user-picture"
                />
                <div className="user-info">
                  <h2>Goran Petrović</h2>
                  <p>Član od 2023</p>
                </div>
              </div>
              <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>
                ×
              </button>
            </div>
            
            <div className="credits-display">
              <div className="din-coin-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
                  <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#8B4513">D</text>
                </svg>
              </div>
              <div className="credits-info">
                <div className="credits-label">Vaši Din Coin-ovi</div>
                <div className="credits-amount">
                  <span className="credits-value">142</span>
                  <span className="din-text-icon">DIN</span>
                </div>
              </div>
              <button className="buy-more-btn" onClick={handleBuyCredits}>
                Kupi još
              </button>
            </div>

            <div className="menu-items">
              <div className="menu-item" onClick={() => navigate('/profile')}>
                <span>Moj Profil</span>
              </div>
              <div className="menu-item" onClick={() => navigate('/courts')}>
                <span>Rezervacije</span>
              </div>
              <div className="menu-item">
                <span>Turniri</span>
              </div>
              <div className="menu-item">
                <span>Statistike</span>
              </div>
              <div className="menu-item">
                <span>Podešavanja</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
