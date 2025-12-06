import React from 'react';

const Column2 = ({ character = {}, onUpdate = () => {}, cl1Height = 0 }) => {
  const classFeatures = character?.classFeatures?.features || '';
  const proficiencyBonus = character?.proficiency?.bonus || '';
  
  // Saving throws data with defaults for all 6 abilities
  const savingThrows = character?.savingThrows || {
    strength: { proficient: false, value: '' },
    dexterity: { proficient: false, value: '' },
    constitution: { proficient: false, value: '' },
    intelligence: { proficient: false, value: '' },
    wisdom: { proficient: false, value: '' },
    charisma: { proficient: false, value: '' }
  };

  // Skills data
  const skills = character?.skills || {
    acrobatics: { proficient: false, expert: false, value: '' },
    animalHandling: { proficient: false, expert: false, value: '' },
    arcana: { proficient: false, expert: false, value: '' },
    athletics: { proficient: false, expert: false, value: '' },
    deception: { proficient: false, expert: false, value: '' },
    history: { proficient: false, expert: false, value: '' },
    insight: { proficient: false, expert: false, value: '' },
    intimidation: { proficient: false, expert: false, value: '' },
    investigation: { proficient: false, expert: false, value: '' },
    medicine: { proficient: false, expert: false, value: '' },
    nature: { proficient: false, expert: false, value: '' },
    perception: { proficient: false, expert: false, value: '' },
    performance: { proficient: false, expert: false, value: '' },
    persuasion: { proficient: false, expert: false, value: '' },
    religion: { proficient: false, expert: false, value: '' },
    sleightOfHand: { proficient: false, expert: false, value: '' },
    stealth: { proficient: false, expert: false, value: '' },
    survival: { proficient: false, expert: false, value: '' }
  };

  // Calculate Passive Perception
  const calculatePassivePerception = () => {
    const wisdomModifier = character?.attributes?.wisdom?.calculated?.modifier || 0;
    const pb = parseInt(proficiencyBonus) || 0;
    const isPerceptionProficient = skills.perception?.proficient || false;
    
    const base = 10 + wisdomModifier;
    const proficiencyBonusToAdd = isPerceptionProficient ? pb : 0;
    
    return base + proficiencyBonusToAdd;
  };

  const passivePerception = calculatePassivePerception();

  const handleFieldChange = (section, field, value, subField = null) => {
    const updatedCharacter = {
      ...character,
      [section]: subField 
        ? {
            ...character[section],
            [field]: {
              ...character[section]?.[field],
              [subField]: value
            }
          }
        : {
            ...character[section],
            [field]: value
          }
    };
    onUpdate(updatedCharacter);
  };

  const toggleProficient = (ability) => {
    const updatedCharacter = {
      ...character,
      savingThrows: {
        ...character.savingThrows,
        [ability]: {
          ...character.savingThrows?.[ability],
          proficient: !savingThrows[ability]?.proficient
        }
      }
    };
    onUpdate(updatedCharacter);
  };

  const toggleSkillCheckbox = (skill, checkboxType) => {
    const updatedCharacter = {
      ...character,
      skills: {
        ...character.skills,
        [skill]: {
          ...character.skills?.[skill],
          [checkboxType]: !skills[skill]?.[checkboxType]
        }
      }
    };
    onUpdate(updatedCharacter);
  };

  // Skill names with proper labels (alphabetical order)
  const skillLabels = {
    acrobatics: 'Acrobatics',
    animalHandling: 'Animal Handling',
    arcana: 'Arcana',
    athletics: 'Athletics',
    deception: 'Deception',
    history: 'History',
    insight: 'Insight',
    intimidation: 'Intimidation',
    investigation: 'Investigation',
    medicine: 'Medicine',
    nature: 'Nature',
    perception: 'Perception',
    performance: 'Performance',
    persuasion: 'Persuasion',
    religion: 'Religion',
    sleightOfHand: 'Sleight of Hand',
    stealth: 'Stealth',
    survival: 'Survival'
  };

  // Alphabetical order of skills
  const alphabeticalSkills = Object.keys(skillLabels).sort();

  return (
    <div style={styles.column}>
      {/* Use dynamic height if provided */}
      <div style={{
        ...styles.fixedHeightContainer,
        height: cl1Height > 0 ? `${cl1Height}px` : 'auto'
      }}>
        {/* Block 1: Class Features & Proficiency Bonus */}
        <div style={styles.mainBlock}>
          <div style={styles.subBlock}>
            <div style={styles.blockLabel}>CLASS FEATURE (C.F)</div>
            <textarea
              value={classFeatures}
              onChange={(e) => handleFieldChange('classFeatures', 'features', e.target.value)}
              style={styles.textArea}
              placeholder="e.g., Channel Divinity, Superiority Dice, Rage, etc."
              rows={2}
            />
          </div>

          <div style={styles.subBlock}>
            <div style={styles.blockLabel}>PROFICIENCY BONUS (P.B)</div>
            <div style={styles.pbContainer}>
              <input
                type="number"
                value={proficiencyBonus}
                onChange={(e) => handleFieldChange('proficiency', 'bonus', e.target.value)}
                style={styles.numberInput}
                placeholder="+2"
              />
            </div>
          </div>
        </div>

        {/* Block 2: 6 Saving Throws */}
        <div style={styles.savingThrowsBlock}>
          <div style={styles.savingThrowsLabel}>SAVING THROWS</div>
          
          {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((ability) => (
            <div key={ability} style={styles.savingThrowRow}>
              <div 
                style={{
                  ...styles.checkbox,
                  ...(savingThrows[ability]?.proficient ? styles.checkboxChecked : {})
                }}
                onClick={() => toggleProficient(ability)}
              >
                {savingThrows[ability]?.proficient ? '✓' : ''}
              </div>
              <input
                type="text"
                value={savingThrows[ability]?.value || ''}
                onChange={(e) => handleFieldChange('savingThrows', ability, e.target.value, 'value')}
                style={styles.stValueInput}
                placeholder="+0"
                maxLength={3}
              />
              <div style={styles.stLabel}>
                {ability.charAt(0).toUpperCase() + ability.slice(1)}
              </div>
            </div>
          ))}
        </div>

        {/* Block 3: 18 Skills with 2 checkboxes each - PROPER SIZING */}
        <div style={styles.skillsBlock}>
          <div style={styles.skillsLabel}>SKILLS</div>
          
          <div style={styles.skillsHeader}>
            <div style={styles.skillCheckboxLabel}>P</div>
            <div style={styles.skillCheckboxLabel}>E</div>
            <div style={styles.skillValueLabel}>Bonus</div>
            <div style={styles.skillNameLabel}>Skill</div>
          </div>
          
          <div style={styles.skillsListContainer}>
            {alphabeticalSkills.map((skillKey) => (
              <div key={skillKey} style={styles.skillRow}>
                {/* Proficiency Checkbox */}
                <div 
                  style={{
                    ...styles.skillCheckbox,
                    ...(skills[skillKey]?.proficient ? styles.skillCheckboxChecked : {})
                  }}
                  onClick={() => toggleSkillCheckbox(skillKey, 'proficient')}
                >
                  {skills[skillKey]?.proficient ? '✓' : ''}
                </div>
                
                {/* Expertise Checkbox */}
                <div 
                  style={{
                    ...styles.skillCheckbox,
                    ...(skills[skillKey]?.expert ? styles.skillCheckboxChecked : {})
                  }}
                  onClick={() => toggleSkillCheckbox(skillKey, 'expert')}
                >
                  {skills[skillKey]?.expert ? '✓' : ''}
                </div>
                
                {/* Bonus Value Input */}
                <input
                  type="text"
                  value={skills[skillKey]?.value || ''}
                  onChange={(e) => handleFieldChange('skills', skillKey, e.target.value, 'value')}
                  style={styles.skillValueInput}
                  placeholder="+0"
                  maxLength={3}
                />
                
                {/* Skill Name */}
                <div style={styles.skillName}>
                  {skillLabels[skillKey]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 4: Passive Perception */}
        <div style={styles.passivePerceptionBlock}>
          <div style={styles.passivePerceptionLabel}>PASSIVE PERCEPTION</div>
          <div style={styles.passivePerceptionValue}>
            {passivePerception}
          </div>
          <div style={styles.passivePerceptionFormula}>
            10 + Wisdom Modifier + P.B
          </div>
        </div>

        {/* Block 5: Initiative, Speed, HP */}
        <div style={styles.combatStatsBlock}>
          <div style={styles.combatStatsLabel}>COMBAT STATS</div>
          
          <div style={styles.combatStatsGrid}>
            {/* Initiative */}
            <div style={styles.combatStat}>
              <div style={styles.combatStatLabel}>INITIATIVE</div>
              <div style={styles.combatStatValue}>
                +0
              </div>
            </div>
            
            {/* Speed */}
            <div style={styles.combatStat}>
              <div style={styles.combatStatLabel}>SPEED</div>
              <div style={styles.combatStatValue}>
                30 ft
              </div>
            </div>
            
            {/* HP */}
            <div style={styles.combatStat}>
              <div style={styles.combatStatLabel}>HIT POINTS</div>
              <div style={styles.combatStatValue}>
                10
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1
  },
  fixedHeightContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px', // Just reduce this from 10px to 6px
    flex: 1,
    minHeight: '100%',
    overflow: 'hidden'
    },
  // Block 1 Styles
  mainBlock: {
    border: '1px solid #000',
    background: 'white',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    boxSizing: 'border-box',
    flexShrink: 0
  },
  subBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  blockLabel: {
    fontSize: '9px',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    padding: '2px',
    background: '#f0f0f0',
    border: '1px solid #000'
  },
  textArea: {
    width: '100%',
    border: '1px solid #000',
    background: '#ffffff',
    fontSize: '8px',
    padding: '3px',
    outline: 'none',
    color: '#000000',
    resize: 'none',
    minHeight: '45px',
    maxHeight: '45px',
    fontFamily: '"Times New Roman", serif',
    lineHeight: '1.1',
    overflow: 'auto',
    boxSizing: 'border-box'
  },
  pbContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 0'
  },
  numberInput: {
    width: '50px',
    border: '1px solid #000',
    background: '#ffffff',
    fontSize: '12px',
    padding: '4px',
    outline: 'none',
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    boxSizing: 'border-box'
  },
  
  // Block 2: Saving Throws
  savingThrowsBlock: {
    border: '1px solid #000',
    background: 'white',
    padding: '8px 5px',
    boxSizing: 'border-box',
    flexShrink: 0
  },
  savingThrowsLabel: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    padding: '3px',
    background: '#f0f0f0',
    border: '1px solid #000',
    marginBottom: '8px'
  },
  savingThrowRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '5px',
    padding: '2px 0'
  },
  checkbox: {
    width: '12px',
    height: '12px',
    border: '1px solid #000',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    cursor: 'pointer',
    background: '#ffffff',
    flexShrink: 0
  },
  checkboxChecked: {
    background: '#000000',
    color: '#ffffff'
  },
  stValueInput: {
    width: '30px',
    border: '1px solid #000',
    background: '#ffffff',
    fontSize: '9px',
    padding: '2px',
    outline: 'none',
    color: '#000000',
    textAlign: 'center',
    boxSizing: 'border-box',
    flexShrink: 0
  },
  stLabel: {
    fontSize: '9px',
    color: '#000000',
    marginLeft: '3px',
    flex: 1
  },
  
  // Block 3: Skills - MATCHING SAVING THROWS SIZE
  skillsBlock: {
    border: '1px solid #000',
    background: 'white',
    padding: '8px 5px',
    boxSizing: 'border-box',
    flex: 1, // Take available space to fill height
    display: 'flex',
    flexDirection: 'column',
    minHeight: '0'
  },
  skillsLabel: {
    fontSize: '11px', // Same as saving throws
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    padding: '3px',
    background: '#f0f0f0',
    border: '1px solid #000',
    marginBottom: '8px',
    flexShrink: 0
  },
  skillsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px', // Same as saving throws
    marginBottom: '5px',
    padding: '0 2px',
    fontSize: '8px', // Same as saving throws
    fontWeight: 'bold',
    color: '#666',
    flexShrink: 0
  },
  skillCheckboxLabel: {
    width: '14px',
    textAlign: 'center'
  },
  skillValueLabel: {
    width: '30px',
    textAlign: 'center'
  },
  skillNameLabel: {
    flex: 1,
    marginLeft: '3px'
  },
  skillsListContainer: {
    flex: 1,
    overflowY: 'auto',
    minHeight: '0'
  },
  skillRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px', // Same as saving throws
    marginBottom: '5px', // Same spacing as saving throws
    padding: '2px 0',
    flexShrink: 0
  },
  skillCheckbox: {
    width: '12px', // Same as saving throws
    height: '12px',
    border: '1px solid #000',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px', // Same as saving throws
    cursor: 'pointer',
    background: '#ffffff',
    flexShrink: 0
  },
  skillCheckboxChecked: {
    background: '#000000',
    color: '#ffffff'
  },
  skillValueInput: {
    width: '30px', // Same as saving throws
    border: '1px solid #000',
    background: '#ffffff',
    fontSize: '9px', // Same as saving throws
    padding: '2px',
    outline: 'none',
    color: '#000000',
    textAlign: 'center',
    boxSizing: 'border-box',
    flexShrink: 0
  },
  skillName: {
    fontSize: '9px', // Same as saving throws labels
    color: '#000000',
    marginLeft: '3px',
    flex: 1
  },
  
  // Block 4: Passive Perception
  passivePerceptionBlock: {
    border: '1px solid #000',
    background: 'white',
    padding: '8px 5px',
    boxSizing: 'border-box',
    textAlign: 'center',
    flexShrink: 0
  },
  passivePerceptionLabel: {
    fontSize: '9px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '5px'
  },
  passivePerceptionValue: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '3px'
  },
  passivePerceptionFormula: {
    fontSize: '7px',
    color: '#666',
    fontStyle: 'italic'
  },
  
  // Block 5: Initiative, Speed, HP
  combatStatsBlock: {
    border: '1px solid #000',
    background: 'white',
    padding: '8px 5px',
    boxSizing: 'border-box',
    flexShrink: 0
  },
  combatStatsLabel: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    padding: '3px',
    background: '#f0f0f0',
    border: '1px solid #000',
    marginBottom: '10px'
  },
  combatStatsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '8px'
  },
  combatStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px'
  },
  combatStatLabel: {
    fontSize: '8px',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center'
  },
  combatStatValue: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    minHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Column2;