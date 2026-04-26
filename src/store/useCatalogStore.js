import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCatalogStore = create(
  persist(
    (set) => ({
      items: [],
      currentFilter: 'all',
      
      addItem: (item) => set((state) => ({ 
        items: [...state.items, { ...item, rating: 0 }] 
      })),
      
      removeItem: (id) => set((state) => ({ 
        items: state.items.filter(i => i.id !== id) 
      })),
      
      updateRating: (id, rating) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, rating } : i)
      })),
      
      setFilter: (filter) => set({ currentFilter: filter }),
    }),
    { name: 'catalog-storage' }
  )
);