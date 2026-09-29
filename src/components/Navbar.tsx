import React, { useState } from 'react';
import { useItems } from '../context/ItemsContext';
import { PageView } from '../types';
import { PlusCircle, Search, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, openReportModalWithType } = useItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Lost Items', page: 'lost' },
    { label: 'Found Items', page: 'found' },
    { label: 'Search', page: 'search' },
    { label: 'How It Works', page: 'how-it-works' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand title, single line element */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-blue-700 transition-colors">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Campus<span className="text-blue-600">Find</span>
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 nav links, 1-2 word labels, single line */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-md relative ${
                    isActive
                      ? 'text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('search')}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search catalog"
              aria-label="Search items"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => openReportModalWithType('lost')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Item</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openReportModalWithType('lost')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md whitespace-nowrap"
            >
              Report
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                openReportModalWithType('lost');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              I Lost Something
            </button>
            <button
              onClick={() => {
                openReportModalWithType('found');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
            >
              I Found Something
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
