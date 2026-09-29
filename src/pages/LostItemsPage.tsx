import React, { useState, useMemo } from 'react';
import { useItems } from '../context/ItemsContext';
import { ItemCard } from '../components/ItemCard';
import { CATEGORIES } from '../data/sampleItems';
import { ItemCategory } from '../types';
import { Search, PlusCircle, Filter, RotateCcw, HelpCircle } from 'lucide-react';

export const LostItemsPage: React.FC = () => {
  const { items, openReportModalWithType } = useItems();
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Filter only lost items
  const lostItems = useMemo(() => {
    return items.filter((item) => item.type === 'lost');
  }, [items]);

  const filteredItems = useMemo(() => {
    return lostItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter (title, location, description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [lostItems, selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Missing Belongings Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lost Items
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-xl">
            Items currently reported missing by students and campus visitors. If you found any of these, click Contact to notify the owner.
          </p>
        </div>

        <button
          onClick={() => openReportModalWithType('lost')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs self-start md:self-auto shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report a Lost Item</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Keyword Search */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lost items (e.g. MacBook, library, keys, calculator)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* Sort order */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-600 shrink-0">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="w-full text-xs py-2 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="newest">Most Recently Reported</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 text-xs flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Categories ({lostItems.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = lostItems.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Filter Info & Reset */}
        {(selectedCategory !== 'All' || searchQuery) && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing {filteredItems.length} matching {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Items Display Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No lost items found</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No active reports matched your search criteria. Try removing filters or search by a broader keyword.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={() => openReportModalWithType('lost')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Report Your Lost Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
