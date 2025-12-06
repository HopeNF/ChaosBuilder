import React, { useState } from 'react';
import HomePage from './components/HomePage';
import CharacterSheet from './components/CharacterSheet';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'character-sheet', 'data-manager'
  const [character, setCharacter] = useState({
    basicInfo: {
      characterName: '',
      destiny: '',
      gender: '',
      race: '',
      player: '',
      level: '',
      experience: '',
      firstClass: '',
      hiddenClass: ''
    },
    classFeatures: { features: '' },
    proficiency: { bonus: '' },
    attributes: {}
  });

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleCharacterUpdate = (updatedCharacter) => {
    setCharacter(updatedCharacter);
  };

  // Render the appropriate page
  const renderPage = () => {
    switch (currentPage) {
      case 'character-sheet':
        return (
          <div style={styles.characterSheetContainer}>
            <button 
              onClick={() => handleNavigate('home')}
              style={styles.backButton}
            >
              ← Back to Home
            </button>
            <CharacterSheet 
              character={character} 
              onUpdate={handleCharacterUpdate}
              onNavigate={handleNavigate}
            />
          </div>
        );
      case 'data-manager':
        return (
          <div style={styles.dataManagerContainer}>
            <button 
              onClick={() => handleNavigate('home')}
              style={styles.backButton}
            >
              ← Back to Home
            </button>
            <div style={styles.dataManagerPlaceholder}>
              <h2>📚 Data Manager</h2>
              <p>Coming soon! This is where you'll manage races, classes, items, and homebrew content.</p>
            </div>
          </div>
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={styles.appContainer}>
      {renderPage()}
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: '100vh',
    overflow: 'auto'
  },
  characterSheetContainer: {
    background: '#f0f0f0',
    minHeight: '100vh',
    padding: '20px'
  },
  dataManagerContainer: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '20px'
  },
  backButton: {
    padding: '10px 20px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(0, 255, 255, 0.1)',
      borderColor: 'rgba(0, 255, 255, 0.4)'
    }
  },
  dataManagerPlaceholder: {
    textAlign: 'center',
    padding: '50px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxWidth: '600px',
    margin: '0 auto'
  }
};

export default App;