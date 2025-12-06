import React from 'react';

const HomePage = ({ onNavigate }) => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>⚡ CHAOS BUILDER ⚡</h1>
        <div style={styles.subtitle}>Your Custom Tabletop RPG Game Engine</div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.welcomeSection}>
          <h2 style={styles.welcomeTitle}>Welcome, Game Master</h2>
          <p style={styles.welcomeText}>
            ChaosBuilder is your all-in-one tool for managing custom tabletop RPG campaigns.
            Build characters, manage data, and create your own game systems.
          </p>
        </div>

        {/* Navigation Cards */}
        <div style={styles.navGrid}>
          {/* Character Sheet Card */}
          <div 
            style={styles.navCard}
            onClick={() => onNavigate('character-sheet')}
          >
            <div style={styles.cardIcon}>📊</div>
            <h3 style={styles.cardTitle}>Character Sheet</h3>
            <p style={styles.cardDescription}>
              Create and manage player characters with custom attribute systems
            </p>
            <div style={styles.cardButton}>Open</div>
          </div>

          {/* Data Manager Card */}
          <div 
            style={styles.navCard}
            onClick={() => onNavigate('data-manager')}
          >
            <div style={styles.cardIcon}>📚</div>
            <h3 style={styles.cardTitle}>Data Manager</h3>
            <p style={styles.cardDescription}>
              Manage races, classes, items, creatures, and homebrew content
            </p>
            <div style={styles.cardButton}>Open</div>
          </div>

          {/* Campaign Manager Card (Coming Soon) */}
          <div style={styles.navCardComingSoon}>
            <div style={styles.cardIcon}>🗺️</div>
            <h3 style={styles.cardTitle}>Campaign Manager</h3>
            <p style={styles.cardDescription}>
              Track stories, NPCs, sessions, and world events
            </p>
            <div style={styles.cardComingSoon}>Coming Soon</div>
          </div>

          {/* Map Tool Card (Coming Soon) */}
          <div style={styles.navCardComingSoon}>
            <div style={styles.cardIcon}>🎯</div>
            <h3 style={styles.cardTitle}>Map Tool</h3>
            <p style={styles.cardDescription}>
              Create and manage interactive battle maps with tokens
            </p>
            <div style={styles.cardComingSoon}>Coming Soon</div>
          </div>
        </div>

        {/* Recent Characters/Quick Actions */}
        <div style={styles.quickActions}>
          <h3 style={styles.quickActionsTitle}>Quick Actions</h3>
          <div style={styles.quickActionsGrid}>
            <button style={styles.quickButton}>
              New Character
            </button>
            <button style={styles.quickButton}>
              Load Campaign
            </button>
            <button style={styles.quickButton}>
              Open Rules
            </button>
            <button style={styles.quickButton}>
              Settings
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerText}>
          ChaosBuilder v1.0 • Built for Custom RPG Systems
        </div>
        <div style={styles.footerLinks}>
          <span style={styles.footerLink}>Guide</span>
          •
          <span style={styles.footerLink}>Export</span>
          •
          <span style={styles.footerLink}>Backup</span>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    color: '#ffffff',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    textAlign: 'center',
    padding: '40px 20px 20px 20px',
    background: 'rgba(0, 0, 0, 0.3)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    letterSpacing: '2px',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
  },
  subtitle: {
    fontSize: '18px',
    color: '#a0a0c0',
    letterSpacing: '1px'
  },
  main: {
    flex: 1,
    padding: '30px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  welcomeSection: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  welcomeTitle: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#ffffff'
  },
  welcomeText: {
    fontSize: '16px',
    color: '#c0c0e0',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto'
  },
  navGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    marginBottom: '40px'
  },
  navCard: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    ':hover': {
      background: 'rgba(0, 255, 255, 0.1)',
      borderColor: 'rgba(0, 255, 255, 0.4)',
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
    }
  },
  navCardComingSoon: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    opacity: 0.7
  },
  cardIcon: {
    fontSize: '48px',
    marginBottom: '15px'
  },
  cardTitle: {
    fontSize: '22px',
    margin: '0 0 10px 0',
    color: '#ffffff'
  },
  cardDescription: {
    fontSize: '14px',
    color: '#a0a0c0',
    lineHeight: '1.5',
    marginBottom: '20px',
    flex: 1
  },
  cardButton: {
    background: 'linear-gradient(90deg, #00ffff, #0080ff)',
    color: '#000000',
    padding: '8px 20px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  cardComingSoon: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    padding: '8px 20px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  quickActions: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    padding: '25px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  quickActionsTitle: {
    fontSize: '20px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  quickButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(0, 255, 255, 0.1)',
      borderColor: 'rgba(0, 255, 255, 0.4)'
    }
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.3)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: '14px',
    color: '#a0a0c0'
  },
  footerText: {
    marginBottom: '10px'
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px'
  },
  footerLink: {
    cursor: 'pointer',
    ':hover': {
      color: '#00ffff',
      textDecoration: 'underline'
    }
  }
};

export default HomePage;