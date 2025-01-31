// Calculate points for each transaction
export function calculatePointsPerTransaction(data) {
  const price = Math.floor(data.amount);
  let points = 0;
  if (price > 100) {
    points += 2 * (price - 100); // 2 points for every dollar over $100
    points += 1 * 50; // 1 point for every dollar between $50 and $100
  } else if (price > 50) {
    points += 1 * (price - 50); // 1 point for every dollar between $50 and price
  }
  return points;
}

// filter data by specific date and month.
export const filterDataByMonth = (data, month, year) => {
  return data.filter((item) => {
    const purchaseDate = new Date(item.purchaseDate);

    return (
      purchaseDate.getMonth() === month - 1 &&
      purchaseDate.getFullYear() === year
    );
  });
};

// filter data by name and aggregate their value
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

// Sort data by date
export function sortDataByDate(userData) {
  const dateSort = (a, b) => {
    const dateA = new Date(a.purchaseDate);
    const dateB = new Date(b.purchaseDate);
    return dateA - dateB;
  };
  return userData.sort(dateSort);
}

// get Month and Year
export const getMonthYear = (data) => {
  const dates = data.map((item) => new Date(item.purchaseDate));
  const maxDate = new Date(Math.max(...dates.map((date) => date.getTime())));

  const getMonthYearObject = (date, offset) => {
    const newDate = new Date(date); // create a copy of the date
    newDate.setMonth(date.getMonth() - offset); // adjust by offset months
    return {
      monthIndex: newDate.getMonth() + 1,
      month: newDate.toLocaleString('default', { month: 'long' }),
      year: newDate.getFullYear(),
    };
  };

  return {
    latest: getMonthYearObject(maxDate, 0),
    secondlatest: getMonthYearObject(maxDate, 1),
    thirdlatest: getMonthYearObject(maxDate, 2),
  };
};

//responsible for convert date to local date format.
export function toLocalDate(data) {
  return new Date(data.purchaseDate).toLocaleDateString();
}
