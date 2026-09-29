import React, { createContext, useContext, useState, useEffect } from 'react';
import { CampusItem, ItemType, PageView } from '../types';
import { INITIAL_ITEMS } from '../data/sampleItems';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface ItemsContextType {
  items: CampusItem[];
  addItem: (itemData: Omit<CampusItem, 'id' | 'createdAt' | 'status'>) => CampusItem;
  toggleResolveItem: (id: string) => void;
  resetToSampleData: () => void;
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedItemForModal: CampusItem | null;
  setSelectedItemForModal: (item: CampusItem | null) => void;
  reportInitialType: ItemType;
  setReportInitialType: (type: ItemType) => void;
  searchInitialQuery: string;
  setSearchInitialQuery: (q: string) => void;
  searchInitialType: 'all' | 'lost' | 'found';
  setSearchInitialType: (t: 'all' | 'lost' | 'found') => void;
  toasts: ToastNotification[];
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
  openReportModalWithType: (type: ItemType) => void;
  openSearchWithType: (type: 'all' | 'lost' | 'found', query?: string) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'campusfind_items_data_v1';

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CampusItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error('Failed reading localStorage for CampusFind items:', err);
    }
    return INITIAL_ITEMS;
  });

  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedItemForModal, setSelectedItemForModal] = useState<CampusItem | null>(null);
  const [reportInitialType, setReportInitialType] = useState<ItemType>('lost');
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');
  const [searchInitialType, setSearchInitialType] = useState<'all' | 'lost' | 'found'>('all');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed saving to localStorage:', err);
    }
  }, [items]);

  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addItem = (itemData: Omit<CampusItem, 'id' | 'createdAt' | 'status'>): CampusItem => {
    const newItem: CampusItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    setItems((prev) => [newItem, ...prev]);

    addToast({
      type: 'success',
      title: itemData.type === 'lost' ? 'Lost Item Reported' : 'Found Item Reported',
      message: `"${itemData.title}" has been published to CampusFind. Students will be able to see it immediately!`,
    });

    return newItem;
  };

  const toggleResolveItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'active' ? 'resolved' : 'active';
          addToast({
            type: 'info',
            title: newStatus === 'resolved' ? 'Marked as Reunited!' : 'Marked as Active',
            message: newStatus === 'resolved' ? 'Great news! Item marked as reconnected with owner.' : 'Item status returned to active listing.',
          });
          return { ...item, status: newStatus };
        }
        return item;
      })
    );

    if (selectedItemForModal && selectedItemForModal.id === id) {
      setSelectedItemForModal((prev) => (prev ? { ...prev, status: prev.status === 'active' ? 'resolved' : 'active' } : null));
    }
  };

  const resetToSampleData = () => {
    setItems(INITIAL_ITEMS);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    addToast({
      type: 'info',
      title: 'Reset to Sample Data',
      message: 'Campus items directory has been reset to initial campus catalog.',
    });
  };

  const openReportModalWithType = (type: ItemType) => {
    setReportInitialType(type);
    setCurrentPage('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSearchWithType = (type: 'all' | 'lost' | 'found', query = '') => {
    setSearchInitialType(type);
    if (query) setSearchInitialQuery(query);
    setCurrentPage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        addItem,
        toggleResolveItem,
        resetToSampleData,
        currentPage,
        setCurrentPage,
        selectedItemForModal,
        setSelectedItemForModal,
        reportInitialType,
        setReportInitialType,
        searchInitialQuery,
        setSearchInitialQuery,
        searchInitialType,
        setSearchInitialType,
        toasts,
        addToast,
        removeToast,
        openReportModalWithType,
        openSearchWithType,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};
