import React, { useState } from 'react';
import CharacterHeader from './CharacterHeader';
import Column1 from './Column1';
import Column2 from './Column2';

const CharacterSheet = ({ character, onUpdate, onNavigate }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (action, handler) => {
    setActiveButton(action);
    handler();
    setTimeout(() => {
      setActiveButton(null);
    }, 150);
  };

  const handleGenerate = () => {
    console.log('Generate clicked');
    const randomCharacter = {
      ...character,
      basicInfo: {
        characterName: 'Random Hero',
        destiny: 'Chosen One',
        gender: 'Non-binary',
        race: 'Half-Elf',
        player: 'GM',
        level: '3',
        experience: '900',
        firstClass: 'Rogue',
        hiddenClass: 'Spy'
      },
      classFeatures: {
        features: 'Sneak Attack, Cunning Action, Expertise'
      },
      proficiency: {
        bonus: '2'
      },
      attributes: {
        strength: {
          values: { r2c1: 8, r2c2: 0, r2c3: 0, r3c1: 0, r3c2: 0, r3c3: 0 }
        },
        dexterity: {
          values: { r2c1: 15, r2c2: 0, r2c3: 2, r3c1: 0, r3c2: 0, r3c3: 0 }
        },
        constitution: {
          values: { r2c1: 14, r2c2: 0, r2c3: 0, r3c1: 0, r3c2: 0, r3c3: 0 }
        },
        intelligence: {
          values: { r2c1: 10, r2c2: 0, r2c3: 0, r3c1: 0, r3c2: 0, r3c3: 0 }
        },
        wisdom: {
          values: { r2c1: 12, r2c2: 0, r2c3: 0, r3c1: 0, r3c2: 0, r3c3: 0 }
        },
        charisma: {
          values: { r2c1: 13, r2c2: 0, r2c3: 0, r3c1: 0, r3c2: 0, r3c3: 0 }
        }
      }
    };
    onUpdate(randomCharacter);
  };

  const handleLoad = () => {
    console.log('Load clicked');
    alert('Load feature coming soon!');
  };

  const handleSave = () => {
    console.log('Save clicked');
    alert('Save feature coming soon!');
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    if (window.confirm('Delete current character?')) {
      onUpdate({
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
    }
  };

  return (
    <div style={{ 
      background: '#f0f0f0', 
      minHeight: '100vh', 
      padding: '20px',
      fontFamily: '"Times New Roman", serif'
    }}>
      {/* Control Buttons Row */}
      <div style={styles.controlsRow}>
        {/* Left Buttons */}
        <div style={styles.leftButtons}>
          <button 
            style={{
              ...styles.button,
              ...(activeButton === 'generate' ? styles.buttonActive : {})
            }} 
            onClick={() => handleButtonClick('generate', handleGenerate)}
          >
            Generate
          </button>
          <button 
            style={{
              ...styles.button,
              ...(activeButton === 'load' ? styles.buttonActive : {})
            }} 
            onClick={() => handleButtonClick('load', handleLoad)}
          >
            Load
          </button>
        </div>
        
        {/* Center Title */}
        <h1 style={styles.title}>
          ⚡ ChaosBuilder - Character Sheet
        </h1>
        
        {/* Right Buttons */}
        <div style={styles.rightButtons}>
          <button 
            style={{
              ...styles.button,
              ...(activeButton === 'save' ? styles.buttonActive : {})
            }} 
            onClick={() => handleButtonClick('save', handleSave)}
          >
            Save
          </button>
          <button 
            style={{
              ...styles.button,
              ...(activeButton === 'delete' ? styles.buttonActive : {})
            }} 
            onClick={() => handleButtonClick('delete', handleDelete)}
          >
            Delete
          </button>
          <button 
            style={styles.homeButton}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
        </div>
      </div>
      
      {/* Header Section */}
      <CharacterHeader 
        character={character} 
        onUpdate={onUpdate} 
      />
      
      {/* Columns Section */}
      <div style={{ 
        display: 'flex', 
        gap: '20px',
        alignItems: 'stretch',
        marginTop: '20px'
      }}>
        {/* CL1 */}
        <div style={{ width: '240px', display: 'flex' }}>
          <Column1 character={character} onUpdate={onUpdate} />
        </div>
        
        {/* CL2 */}
        <div style={{ width: '200px', display: 'flex' }}>
          <Column2 character={character} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  controlsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
    padding: '10px',
    background: 'white',
    border: '2px solid #000',
    borderRadius: '5px'
  },
  leftButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start'
  },
  rightButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    margin: 0,
    fontSize: '24px'
  },
  button: {
    padding: '8px 16px',
    border: '2px solid #000',
    background: '#f0f0f0',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '3px',
    fontSize: '12px',
    minWidth: '70px',
    transition: 'all 0.1s ease',
    transform: 'translateY(0)',
    boxShadow: '2px 2px 0px #000',
    ':hover': {
      background: '#e8e8e8'
    }
  },
  buttonActive: {
    transform: 'translateY(2px)',
    boxShadow: '0px 0px 0px #000',
    background: '#d0d0d0'
  },
  homeButton: {
    padding: '8px 16px',
    border: '2px solid #0080ff',
    background: '#0080ff',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '3px',
    fontSize: '12px',
    minWidth: '70px',
    ':hover': {
      background: '#0066cc'
    }
  }
};

export default CharacterSheet;