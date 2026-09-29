/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ItemsProvider, useItems } from './context/ItemsContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ToastContainer } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { LostItemsPage } from './pages/LostItemsPage';
import { FoundItemsPage } from './pages/FoundItemsPage';
import { ReportItemPage } from './pages/ReportItemPage';
import { SearchPage } from './pages/SearchPage';
import { HowItWorksPage } from './pages/HowItWorksPage';

const AppContent: React.FC = () => {
  const { currentPage } = useItems();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'lost' && <LostItemsPage />}
        {currentPage === 'found' && <FoundItemsPage />}
        {currentPage === 'report' && <ReportItemPage />}
        {currentPage === 'search' && <SearchPage />}
        {currentPage === 'how-it-works' && <HowItWorksPage />}
      </main>

      <Footer />
      <ItemDetailModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ItemsProvider>
      <AppContent />
    </ItemsProvider>
  );
}
