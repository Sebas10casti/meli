/**
 * Returns a promise that resolves after a specified delay.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));