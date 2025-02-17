// Filter last 3 months data:

export function getLatestDataMonth(data) {
  const dates = data.map(item => new Date(item.purchaseDate));
  const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
  return maxDate;
}

export function filterLastThreeMonths(data) {
  const latestDate = getLatestDataMonth(data);
  const threeMonthsAgo = new Date(latestDate);
  threeMonthsAgo.setMonth(latestDate.getMonth() - 2);

  return data.filter(obj => {
    const purchaseDate = new Date(obj.purchaseDate);
    return purchaseDate >= threeMonthsAgo && purchaseDate <= latestDate;
  });
}

// Calculate points for each transaction
export function calculatePointsPerTransaction(data) {
  const price = Math.floor(data.amount);
  if (isNaN(price) || price === null || price === undefined) {
    return 0;
  }
  let points = 0;
  price > 100 ? (points += (2 * (price - 100)) + 50) : ((price > 50) ? points += 1 * (price - 50) : 0);
  return points;
}

// Calculate total rewards
export function filterDataByName(data) {
  const result = data.reduce((acc, obj) => {
    if (!acc[obj.customerName]) {
      acc[obj.customerName] = { customerName: obj.customerName, price: 0 };
    }

    acc[obj.customerName].price += calculatePointsPerTransaction(obj);

    return acc;
  }, {});
  const aggregatedArray = Object.values(result);
  return aggregatedArray;
}

//responsible for convert date to local date format.
export function toLocalDate(data) {
  return new Date(data.purchaseDate).toLocaleDateString();
}

// Sort data by date
export function sortDataByDate(userData) {
  const cloneUserData = [...userData];
  const dateSort = (a, b) => {
    const dateA = new Date(a.purchaseDate);
    const dateB = new Date(b.purchaseDate);
    return dateA - dateB;
  };
  return cloneUserData.sort(dateSort);
}

// Aggregate monthly data
export function aggregateMonthly(data) {
  const result = data.reduce((acc, obj) => {
    const dateObj = new Date(obj.purchaseDate);
    const monthYear = dateObj.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    const transactionYear = dateObj.getFullYear();
    const transactionDate = toLocalDate(obj);
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }

    acc[monthYear].push({
      customerId: obj.customerId,
      customerName: obj.customerName,
      transactionId: obj.transactionId,
      amount: obj.amount,
      transactionDate,
      transactionYear,
      points: obj.points,
    });
    return acc;
  }, {});

  const aggregatedArray = Object.entries(result).map(
    ([monthYear, transactions]) => ({
      monthYear,
      transactions,
    })
  );
  return aggregatedArray;
}