import { useState, useEffect } from 'react';
import categoriesData from '../data/categories.json';

interface Category {
  name: string;
  subcategories: string[];
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(categoriesData);

  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        console.error('Failed to parse categories from localStorage:', e);
      }
    }
  }, []);

  const saveCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const addCategory = (name: string) => {
    if (!categories.find(c => c.name === name)) {
      const newCategories = [...categories, { name, subcategories: [] }];
      saveCategories(newCategories);
      return true;
    }
    return false;
  };

  const updateCategory = (oldName: string, newName: string) => {
    const newCategories = categories.map(c => 
      c.name === oldName ? { ...c, name: newName } : c
    );
    saveCategories(newCategories);
  };

  const deleteCategory = (name: string) => {
    const newCategories = categories.filter(c => c.name !== name);
    saveCategories(newCategories);
  };

  const addSubcategory = (categoryName: string, subcategory: string) => {
    const newCategories = categories.map(c => {
      if (c.name === categoryName && !c.subcategories.includes(subcategory)) {
        return { ...c, subcategories: [...c.subcategories, subcategory] };
      }
      return c;
    });
    saveCategories(newCategories);
  };

  const updateSubcategory = (categoryName: string, oldName: string, newName: string) => {
    const newCategories = categories.map(c => {
      if (c.name === categoryName) {
        return {
          ...c,
          subcategories: c.subcategories.map(s => s === oldName ? newName : s)
        };
      }
      return c;
    });
    saveCategories(newCategories);
  };

  const deleteSubcategory = (categoryName: string, subcategory: string) => {
    const newCategories = categories.map(c => {
      if (c.name === categoryName) {
        return {
          ...c,
          subcategories: c.subcategories.filter(s => s !== subcategory)
        };
      }
      return c;
    });
    saveCategories(newCategories);
  };

  const getAllSubcategories = () => {
    return categories.flatMap(c => c.subcategories);
  };

  const getCategoryBySubcategory = (subcategory: string) => {
    return categories.find(c => c.subcategories.includes(subcategory));
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getAllSubcategories,
    getCategoryBySubcategory,
    saveCategories
  };
};

export default useCategories;