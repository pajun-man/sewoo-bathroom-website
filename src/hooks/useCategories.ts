import { useState, useEffect } from 'react';
import categoriesData from '../data/categories.json';

interface Subcategory {
  id: string;
  name: string;
  nameEn: string;
}

interface Category {
  id: string;
  name: string;
  nameEn: string;
  subcategories: Subcategory[];
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(categoriesData as Category[]);

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

  const addCategory = (name: string, nameEn: string = name) => {
    if (!categories.find(c => c.name === name)) {
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name,
        nameEn,
        subcategories: []
      };
      const newCategories = [...categories, newCategory];
      saveCategories(newCategories);
      return true;
    }
    return false;
  };

  const updateCategory = (oldName: string, newName: string, newNameEn?: string) => {
    const newCategories = categories.map(c =>
      c.name === oldName ? { ...c, name: newName, nameEn: newNameEn ?? c.nameEn } : c
    );
    saveCategories(newCategories);
  };

  const deleteCategory = (name: string) => {
    const newCategories = categories.filter(c => c.name !== name);
    saveCategories(newCategories);
  };

  const addSubcategory = (categoryName: string, subcategory: string, subcategoryEn?: string) => {
    const newCategories = categories.map(c => {
      if (c.name === categoryName && !c.subcategories.find(s => s.name === subcategory)) {
        const newSub: Subcategory = {
          id: `sub-${c.id}-${Date.now()}`,
          name: subcategory,
          nameEn: subcategoryEn || subcategory
        };
        return { ...c, subcategories: [...c.subcategories, newSub] };
      }
      return c;
    });
    saveCategories(newCategories);
  };

  const updateSubcategory = (categoryName: string, oldName: string, newName: string, newNameEn?: string) => {
    const newCategories = categories.map(c => {
      if (c.name === categoryName) {
        return {
          ...c,
          subcategories: c.subcategories.map(s => s.name === oldName ? { ...s, name: newName, nameEn: newNameEn ?? s.nameEn } : s)
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
          subcategories: c.subcategories.filter(s => s.name !== subcategory)
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
    return categories.find(c => c.subcategories.some(s => s.name === subcategory));
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