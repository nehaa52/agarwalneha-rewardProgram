import { useLogger } from '../utils/logger';

export const fetchTransactions = async () => {
  try {
    const response = await fetch('/rewardData.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    useLogger.error('Error fetching transactions:', error);
    throw error;
  }
};