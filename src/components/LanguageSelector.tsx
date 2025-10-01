import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n';
import { SUPPORTED_LANGUAGES, LANGUAGE_NAMES, type SupportedLanguage } from '../config/languages';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = i18n.language as SupportedLanguage;

  const handleLanguageChange = (language: SupportedLanguage) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  const selectorStyle = {
    position: 'relative' as const,
    display: 'inline-block',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '1px solid #3483fa',
    borderRadius: '6px',
    color: '#3483fa',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    minWidth: '120px',
    justifyContent: 'space-between',
  };

  const dropdownStyle = {
    position: 'absolute' as const,
    top: '100%',
    right: '0',
    backgroundColor: 'white',
    border: '1px solid #e6e6e6',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    minWidth: '120px',
    marginTop: '4px',
  };

  const optionStyle = {
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const lastOptionStyle = {
    ...optionStyle,
    borderBottom: 'none',
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
  };

  const firstOptionStyle = {
    ...optionStyle,
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
  };

  const flagStyle = {
    width: '20px',
    height: '15px',
    borderRadius: '2px',
    objectFit: 'cover' as const,
  };

  const getFlagUrl = (language: SupportedLanguage) => {
    const flags = {
      es: 'https://flagcdn.com/w20/es.png',
      en: 'https://flagcdn.com/w20/us.png',
      pt: 'https://flagcdn.com/w20/br.png',
    };
    return flags[language];
  };

  return (
    <div style={selectorStyle}>
      <button
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img
            src={getFlagUrl(currentLanguage)}
            alt={currentLanguage}
            style={flagStyle}
          />
          <span>{LANGUAGE_NAMES[currentLanguage]}</span>
        </div>
        <span style={{ fontSize: '12px' }}>▼</span>
      </button>
      
      {isOpen && (
        <div style={dropdownStyle}>
          {SUPPORTED_LANGUAGES.map((language, index) => {
            const isSelected = language === currentLanguage;
            const isFirst = index === 0;
            const isLast = index === SUPPORTED_LANGUAGES.length - 1;
            
            return (
              <div
                key={language}
                style={{
                  ...(isFirst ? firstOptionStyle : isLast ? lastOptionStyle : optionStyle),
                  backgroundColor: isSelected ? '#f8f9fa' : 'white',
                  fontWeight: isSelected ? '600' : '400',
                }}
                onClick={() => handleLanguageChange(language)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                <img
                  src={getFlagUrl(language)}
                  alt={language}
                  style={flagStyle}
                />
                <span>{LANGUAGE_NAMES[language]}</span>
                {isSelected && <span style={{ marginLeft: 'auto', fontSize: '12px' }}>✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
