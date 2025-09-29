import React from 'react';

interface NoScriptProps {
  children?: React.ReactNode;
}

const NoScript: React.FC<NoScriptProps> = ({ children }) => {
  return (
    <noscript>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat, sans-serif',
        padding: '1rem'
      }}>
        <div style={{
          maxWidth: '600px',
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          {/* Header */}
          <header style={{
            backgroundColor: '#ffe600',
            padding: '12px 24px',
            margin: '-2rem -2rem 2rem -2rem',
            borderRadius: '8px 8px 0 0'
          }}>
            <a href="https://www.mercadolibre.com/" style={{ display: 'inline-block' }}>
              <img 
                src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.150/mercadolibre/logo_large_plus@2x.webp" 
                alt="Mercado Libre" 
                style={{ height: '40px', display: 'block', margin: '0 auto' }}
              />
            </a>
          </header>
          
          {/* Language selector */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>
              Selecciona tu idioma / Select your language / Selecione seu idioma
            </h2>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <a 
                href="/es" 
                style={{
                  padding: '8px 16px',
                  background: '#3483fa',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}
              >
                Español
              </a>
              <a 
                href="/en" 
                style={{
                  padding: '8px 16px',
                  background: '#3483fa',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}
              >
                English
              </a>
              <a 
                href="/pt" 
                style={{
                  padding: '8px 16px',
                  background: '#3483fa',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}
              >
                Português
              </a>
            </div>
          </div>
          
          {/* Main content */}
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1rem'
            }}>
              Prueba de Mercado Libre
            </h1>
            <p style={{
              color: '#666',
              marginBottom: '2rem',
              lineHeight: '1.5'
            }}>
              Esta aplicación requiere JavaScript para funcionar correctamente. 
              Por favor, habilita JavaScript en tu navegador y recarga la página.
            </p>
            
            <div style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '4px',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>
                ¿Cómo habilitar JavaScript?
              </h3>
              <ul style={{
                textAlign: 'left',
                color: '#666',
                margin: '0',
                paddingLeft: '1.5rem'
              }}>
                <li>Chrome: Configuración → Privacidad y seguridad → Configuración del sitio → JavaScript</li>
                <li>Firefox: about:config → javascript.enabled</li>
                <li>Safari: Preferencias → Seguridad → Habilitar JavaScript</li>
              </ul>
            </div>
            
            <a 
              href="https://www.mercadolibre.com/" 
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#3483fa',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: '500'
              }}
            >
              Ir a Mercado Libre
            </a>
          </div>
          
          {/* Custom content if provided */}
          {children}
        </div>
      </div>
    </noscript>
  );
};

export default NoScript;
