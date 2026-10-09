import React, { createContext, useState, useContext, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const savedCompare = localStorage.getItem('ssm_compare_list');
    if (savedCompare) {
      setCompareList(JSON.parse(savedCompare));
    }
  }, []);

  const addToCompare = (product) => {
    if (compareList.find(p => (p._id || p.id) === (product._id || product.id))) {
      return; // Already in list
    }
    if (compareList.length >= 4) {
      alert("You can compare up to 4 products at a time.");
      return;
    }
    const newList = [...compareList, product];
    setCompareList(newList);
    localStorage.setItem('ssm_compare_list', JSON.stringify(newList));
  };

  const removeFromCompare = (productId) => {
    const newList = compareList.filter(p => (p._id || p.id) !== productId);
    setCompareList(newList);
    localStorage.setItem('ssm_compare_list', JSON.stringify(newList));
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem('ssm_compare_list');
  };

  const isInCompare = (productId) => {
    return compareList.some(p => (p._id || p.id) === productId);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
};
