const budgetColors = ['#052955', '#163963', '#165f40', '#16784f', '#315887', '#4287db', '#7dade8', '#4c516b', '#68818f' , '#99b0bd'];
const spendingColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f'];

export const budgetCategories = [
  { type: 'Investing', amount: 0, color: budgetColors[0] },
  { type: 'Trading', amount: 0, color: budgetColors[1] },
  { type: 'Income', amount: 0, color: budgetColors[2] },
  { type: 'Business', amount: 0, color: budgetColors[3] },
  { type: 'Saving', amount: 0, color: budgetColors[4] },
  { type: 'Tax Returns', amount: 0, color: budgetColors[5] },
  { type: 'Sales', amount: 0, color: budgetColors[6] },
  { type: 'Lottery', amount: 0, color: budgetColors[7] },
  { type: 'Passive Income', amount: 0, color: budgetColors[8] },
  { type: 'Rent', amount: 0, color: budgetColors[9] },
];

export const spendingCategories = [
  { type: 'Bills', amount: 0, color: spendingColors[0] },
  { type: 'Car', amount: 0, color: spendingColors[1] },
  { type: 'Clothes', amount: 0, color: spendingColors[2] },
  { type: 'Travel', amount: 0, color: spendingColors[3] },
  { type: 'Food', amount: 0, color: spendingColors[4] },
  { type: 'Shopping', amount: 0, color: spendingColors[5] },
  { type: 'House', amount: 0, color: spendingColors[6] },
  { type: 'Entertainment', amount: 0, color: spendingColors[7] },
  { type: 'Phone', amount: 0, color: spendingColors[8] },
  { type: 'Pets', amount: 0, color: spendingColors[9] },
  { type: 'Other', amount: 0, color: spendingColors[10] },
];

export const resetCategories = () => {
  budgetCategories.forEach((c) => c.amount = 0);
  spendingCategories.forEach((c) => c.amount = 0);
};