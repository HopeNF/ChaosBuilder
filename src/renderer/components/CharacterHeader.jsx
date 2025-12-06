import React from 'react';

const CharacterHeader = ({ character, onUpdate }) => {
  const handleFieldChange = (section, field, value) => {
    onUpdate({
      ...character,
      [section]: {
        ...character[section],
        [field]: value
      }
    });
  };

  // Define the 2x4 grid structure
  const gridFields = [
    // Row 1
    [
      { key: 'destiny', label: 'Destiny' },
      { key: 'gender', label: 'Gender' },
      { key: 'race', label: 'Race' },
      { key: 'player', label: 'Player' }
    ],
    // Row 2
    [
      { key: 'level', label: 'Level', type: 'number' },
      { key: 'experience', label: 'XP', type: 'number' },
      { key: 'firstClass', label: 'First Class' },
      { key: 'hiddenClass', label: 'Hidden Class' }
    ]
  ];

  return (
    <div style={styles.headerContainer}>
      {/* LEFT: Character Name Block with Dragon */}
      <div style={styles.nameBlock}>
        <div style={styles.dragonIcon}>🐉</div>
        <div style={styles.nameField}>
          <div style={styles.fieldLabel}>CHARACTER NAME</div>
          <input
            type="text"
            value={character.basicInfo?.characterName || ''}
            onChange={(e) => handleFieldChange('basicInfo', 'characterName', e.target.value)}
            style={styles.nameInput}
            placeholder="Enter character name"
          />
        </div>
      </div>

      {/* RIGHT: True 2x4 Table */}
      <div style={styles.tableGrid}>
        {gridFields.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.tableRow}>
            {row.map((cell, cellIndex) => (
              <div key={cell.key} style={styles.tableCell}>
                <div style={styles.cellLabel}>{cell.label}</div>
                <input
                  type={cell.type || 'text'}
                  value={character.basicInfo?.[cell.key] || ''}
                  onChange={(e) => handleFieldChange('basicInfo', cell.key, e.target.value)}
                  style={styles.cellInput}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  headerContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gap: '15px',
    marginBottom: '20px',
    border: '2px solid #000',
    padding: '15px',
    background: 'white'
  },
  nameBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid #000',
    padding: '10px',
    background: '#f9f9f9'
  },
  dragonIcon: {
    fontSize: '24px',
    padding: '5px'
  },
  nameField: {
    flex: 1
  },
  fieldLabel: {
    fontSize: '10px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#000000'
  },
  nameInput: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #000',
    background: 'transparent',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '2px 0',
    outline: 'none',
    color: '#000000'
  },
  // True 2x4 Table Styles
  tableGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr', // 4 equal columns
    gap: '10px'
  },
  tableCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    minWidth: '0' // Important for flexbox shrinking
  },
  cellLabel: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#000000',
    whiteSpace: 'nowrap',
    flexShrink: 0 // Don't shrink the label
  },
  cellInput: {
    border: 'none',
    borderBottom: '1px solid #000',
    background: 'transparent',
    fontSize: '10px',
    padding: '2px 4px',
    outline: 'none',
    color: '#000000',
    flex: 1, // Take remaining space
    minWidth: '0' // Allow shrinking
  }
};

export default CharacterHeader;