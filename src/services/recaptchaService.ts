/**
 * 
 * @param token - The token to verify.
 * @returns 
 */
export const verifyRecaptcha = async (token: string): Promise<{
  success: boolean;
  score?: number;
  action?: string;
  error?: string;
}> => {
  try {
    // ===== SIMULACIÓN (ACTUALMENTE ACTIVA) =====
    console.log(token);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay
    
    // Simular diferentes scores para hacerlo más realista
    const score = Math.random() > 0.1 ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.4;
    
    return {
      success: true,
      score: Math.round(score * 100) / 100,
      action: 'purchase_verification'
    };

    // ===== CÓDIGO FUNCIONAL CON BACKEND =====
    /*
    const response = await fetch('https://tu-backend.com/api/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
    */
  } catch (error) {
    console.error('Error verificando reCAPTCHA:', error);
    return {
      success: false,
      error: 'Error de conexión. Intenta nuevamente.'
    };
  }
};
