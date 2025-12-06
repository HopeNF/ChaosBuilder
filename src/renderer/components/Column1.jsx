import React from 'react';

const Column1 = ({ character, onUpdate }) => {
  const handleFieldChange = (tableId, row, col, value) => {
    // Only allow integers (positive and negative)
    const intValue = value === '' ? '' : parseInt(value) || 0;
    
    const updatedCharacter = { ...character };
    
    // Initialize the table if it doesn't exist
    if (!updatedCharacter.attributes) {
      updatedCharacter.attributes = {};
    }
    if (!updatedCharacter.attributes[tableId]) {
      updatedCharacter.attributes[tableId] = {};
    }
    if (!updatedCharacter.attributes[tableId].values) {
      updatedCharacter.attributes[tableId].values = {};
    }
    
    // Store the field value
    const fieldKey = `r${row}c${col}`;
    updatedCharacter.attributes[tableId].values[fieldKey] = intValue;
    
    // Auto-calculate modifier whenever any field changes
    if (tableId !== 'guide') {
      calculateModifier(updatedCharacter, tableId);
    }
    
    onUpdate(updatedCharacter);
  };

  // Calculate modifier: (sum of 6 fields - 10) / 2
  const calculateModifier = (charData, tableId) => {
    const table = charData.attributes[tableId];
    if (!table || !table.values) return;

    // Sum all 6 input fields (r2c1, r2c2, r2c3, r3c1, r3c2, r3c3)
    const fields = ['r2c1', 'r2c2', 'r2c3', 'r3c1', 'r3c2', 'r3c3'];
    let sum = 0;
    
    fields.forEach(field => {
      const value = table.values[field];
      sum += value !== undefined && value !== '' ? value : 0;
    });

    // Calculate modifier: (sum - 10) / 2
    const modifier = Math.floor((sum - 10) / 2);
    
    // Store the calculated modifier
    if (!charData.attributes[tableId].calculated) {
      charData.attributes[tableId].calculated = {};
    }
    charData.attributes[tableId].calculated.modifier = modifier;
  };

  // Get field value with fallback
  const getFieldValue = (tableId, fieldKey) => {
    return character.attributes?.[tableId]?.values?.[fieldKey] ?? '';
  };

  // Get calculated modifier
  const getModifier = (tableId) => {
    return character.attributes?.[tableId]?.calculated?.modifier ?? 0;
  };

  // Define the 7 tables
  const tables = [
    { 
      id: 'guide', 
      label: 'ATTRIBUTES',
      r2: ['Basic', 'Training', 'Racial'],
      r3: ['Extra', 'Lvl Up', 'Item'],
      r4: '(Sum-10)/2'
    },
    { id: 'strength', label: 'STRENGTH', r4: 'Modifier: ' },
    { id: 'dexterity', label: 'DEXTERITY', r4: 'Modifier: ' },
    { id: 'constitution', label: 'CONSTITUTION', r4: 'Modifier: ' },
    { id: 'intelligence', label: 'INTELLIGENCE', r4: 'Modifier: ' },
    { id: 'wisdom', label: 'WISDOM', r4: 'Modifier: ' },
    { id: 'charisma', label: 'CHARISMA', r4: 'Modifier: ' }
  ];

  // Render a single 4x3 table
  const renderTable = (table) => {
    const isGuide = table.id === 'guide';

    return (
      <div key={table.id} style={styles.tableContainer}>
        {/* Row 1: Single column label */}
        <div style={styles.row1}>
          <div style={styles.tableLabel}>{table.label}</div>
        </div>

        {/* Row 2: 3 columns */}
        <div style={styles.row2}>
          <div style={styles.cell}>
            {isGuide ? (
              <div style={styles.guideLabel}>{table.r2[0]}</div>
            ) : (
              <NumberInput
                value={getFieldValue(table.id, 'r2c1')}
                onChange={(value) => handleFieldChange(table.id, 2, 1, value)}
              />
            )}
          </div>
          <div style={styles.cell}>
            {isGuide ? (
              <div style={styles.guideLabel}>{table.r2[1]}</div>
            ) : (
              <NumberInput
                value={getFieldValue(table.id, 'r2c2')}
                onChange={(value) => handleFieldChange(table.id, 2, 2, value)}
              />
            )}
          </div>
          <div style={styles.cell}>
            {isGuide ? (
              <div style={styles.guideLabel}>{table.r2[2]}</div>
            ) : (
              <NumberInput
                value={getFieldValue(table.id, 'r2c3')}
                onChange={(value) => handleFieldChange(table.id, 2, 3, value)}
              />
            )}
          </div>
        </div>

        {/* Row 3: 3 columns */}
        <div style={styles.row3}>
          <div style={styles.cell}>
            {isGuide ? (
              <div style={styles.guideLabel}>{table.r3[0]}</div>
            ) : (
              <NumberInput
                value={getFieldValue(table.id, 'r3c1')}
                onChange={(value) => handleFieldChange(table.id, 3, 1, value)}
              />
            )}
          </div>
          <div style={styles.cell}>
            {isGuide ? (
              <div style={styles.guideLabel}>{table.r3[1]}</div>
            ) : (
              <NumberInput
                value={getFieldValue(table.id, 'r3c2')}
                onChange={(value) => handleFieldChange(table.id, 3, 2, value)}
              />
            )}
          </div>
          <div style={styles.cell}>
            {isGuide ? (
              <div style={styles.guideLabel}>{table.r3[2]}</div>
            ) : (
              <NumberInput
                value={getFieldValue(table.id, 'r3c3')}
                onChange={(value) => handleFieldChange(table.id, 3, 3, value)}
              />
            )}
          </div>
        </div>

        {/* Row 4: Single column */}
        <div style={styles.row4}>
          <div style={styles.cell}>
            {isGuide ? (
              <div style={styles.guideLabel}>{table.r4}</div>
            ) : (
              <div style={styles.modifierCell}>
                <span style={styles.modifierLabel}>Modifier: </span>
                <div style={styles.modifierDisplay}>
                  {getModifier(table.id)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.column}>
      {tables.map(renderTable)}
    </div>
  );
};

// Special NumberInput component that only allows integers
const NumberInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const input = e.target.value;
    
    // Allow empty or convert to integer
    if (input === '') {
      onChange('');
    } else {
      const intValue = parseInt(input);
      // Only update if it's a valid number (not NaN)
      if (!isNaN(intValue)) {
        onChange(intValue.toString());
      }
    }
  };

  return (
    <input
      type="number"  // This automatically handles negatives
      value={value}
      onChange={handleChange}
      style={styles.input}
      placeholder="0"
      step="1"  // Integer steps only
    />
  );
};

const styles = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%'
  },
  tableContainer: {
    border: '1px solid #000',
    background: 'white'
  },
  row1: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    borderBottom: '1px solid #000'
  },
  tableLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '5px',
    textAlign: 'center',
    color: '#000000',
    background: '#f0f0f0'
  },
  row2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    borderBottom: '1px solid #000'
  },
  row3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    borderBottom: '1px solid #000'
  },
  row4: {
    display: 'grid',
    gridTemplateColumns: '1fr'
  },
  cell: {
    borderRight: '1px solid #000',
    padding: '5px',
    minHeight: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':last-child': {
      borderRight: 'none'
    }
  },
  input: {
    width: '100%',
    border: 'none',
    background: 'transparent',
    fontSize: '10px',
    textAlign: 'center',
    outline: 'none',
    color: '#000000'
  },
  guideLabel: {
    fontSize: '9px',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center'
  },
  modifierCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    width: '100%',
    justifyContent: 'center'
  },
  modifierLabel: {
    fontSize: '9px',
    fontWeight: 'bold',
    color: '#000000',
    whiteSpace: 'nowrap'
  },
  modifierDisplay: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#000000',
    minWidth: '20px',
    textAlign: 'center'
  }
};

export default Column1;