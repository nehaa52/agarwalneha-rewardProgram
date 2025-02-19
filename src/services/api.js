export const fetchTransactions = async (logger) => {
  try {
    const response = await fetch('/rewardData.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (logger) logger.error(`${error.message}`);
    throw error;
  }
};