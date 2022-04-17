import { useContext } from 'react';
import { MoneyManagerContext } from '../context/context';

import { budgetCategories, spendingCategories, resetCategories } from './categories';

const usePosts = (title) => {
  resetCategories();
  const { posts } = useContext(MoneyManagerContext);
  const postsType = posts.filter((p) => p.type === title);
  const total = postsType.reduce((acc, currVal) => acc += currVal.amount, 0);
  const categories = title === 'Budget' ? budgetCategories : spendingCategories;
  console.log({postsType, total, categories});
  
  postsType.forEach((p) => {
    const category = categories.find((cat) => cat.type === p.category);

    if (category) category.amount += p.amount;
  });

  const filteredCategory = categories.filter((cat) => cat.amount > 0);

  const chartData = {
    datasets: [{
      data: filteredCategory.map((cat) => cat.amount),
      backgroundColor: filteredCategory.map((cat) => cat.color)
    }],
    labels: filteredCategory.map((cat) => cat.type),
  };

  return { filteredCategory, total, chartData };
};

export default usePosts;