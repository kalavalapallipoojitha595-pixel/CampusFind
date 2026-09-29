import React, { useState, useMemo, useEffect } from 'react';
import { useItems } from '../context/ItemsContext';
import { ItemCard } from '../components/ItemCard';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/sampleItems';
import { ItemCategory } from '../types';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  Tag,
  Calendar,
  HelpCircle,
  SearchCheck,
  CheckCircle2,
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { items, searchInitialQuery, setSearchInitialQuery, searchInitialType, setSearchInitialType } = useItems();

  const [keyword, setKeyword] = useState(searchInitialQuery || '');
  const [statusFilter, setStatusFilter] = useState<'all' | 'lost' | 'found'>(searchInitialType || 'all');
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | 'All'>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [includeResolved, setIncludeResolved] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    if (searchInitialQuery) {
      setKeyword(searchInitialQuery);
      setSearchInitialQuery('');
    }
    if (searchInitialType) {
      setStatusFilter(searchInitialType);
      setSearchInitialType('all');
    }
  }, [searchInitialQuery, searchInitialType, setSearchInitialQuery, setSearchInitialType]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Status filter (all, lost, found)
      if (statusFilter !== 'all' && item.type !== statusFilter) {
        return false;
      }

      // Resolved filter
      if (!includeResolved && item.status === 'resolved') {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'All' && item.category !== categoryFilter) {
        return false;
      }

      // Location filter
      if (locationFilter !== 'All' && !item.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }

      // Keyword query (checks title, location, description, category, contactName)
      if (keyword.trim()) {
        const query = keyword.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        const matchesDescription = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesContact = item.contactName.toLowerCase().includes(query);

        if (!matchesTitle && !matchesLocation && !matchesDescription && !matchesCategory && !matchesContact) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [items, keyword, statusFilter, categoryFilter, locationFilter, includeResolved, sortBy]);

  const activeFiltersCount =
    (keyword ? 1 : 0) +
    (statusFilter !== 'all' ? 1 : 0) +
    (categoryFilter !== 'All' ? 1 : 0) +
    (locationFilter !== 'All' ? 1 : 0) +
    (includeResolved ? 1 : 0);

  const resetAllFilters = () => {
    setKeyword('');
    setStatusFilter('all');
    setCategoryFilter('All');
    setLocationFilter('All');
    setIncludeResolved(false);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          <Search className="w-3.5 h-3.5" />
          <span>Unified Campus Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Search Lost & Found
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl">
          Search across all reported lost belongings and found items. Filter by item name, campus location, category, and date.
        </p>
      </div>

      {/* Main Filter Console */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-6 space-y-5">
        {/* Row 1: Search Keyword and Lost/Found Status Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Keyword Search Input */}
          <div className="lg:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by item name, model, color, or notes (e.g. MacBook, AirPods, Hydro Flask, Keys)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-slate-400"
            />
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Segmented Control */}
          <div className="lg:col-span-4 flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setStatusFilter('lost')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === 'lost'
                  ? 'bg-white text-amber-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lost Only
            </button>
            <button
              onClick={() => setStatusFilter('found')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === 'found'
                  ? 'bg-white text-blue-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Found Only
            </button>
          </div>
        </div>

        {/* Row 2: Category, Location, and Sort Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-slate-400" />
              <span>Category</span>
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ItemCategory | 'All')}
              className="w-full text-xs py-2 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Campus Building / Area</span>
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full text-xs py-2 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="All">All Campus Locations</option>
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Sort Date</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="w-full text-xs py-2 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="newest">Most Recent First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Row 3: Include Reunited Checkbox & Reset */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-slate-100 gap-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700">
            <input
              type="checkbox"
              checked={includeResolved}
              onChange={(e) => setIncludeResolved(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <span>Include items already returned / reconnected</span>
          </label>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold self-start sm:self-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all filters ({activeFiltersCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-bold text-slate-900">{filteredItems.length}</span> matching {filteredItems.length === 1 ? 'item' : 'items'}
        </div>
        {keyword && (
          <div className="text-slate-600">
            Matching keyword <span className="font-semibold text-slate-900">"{keyword}"</span>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No matching items found</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Try checking for spelling variations or broadening your category and campus location filters.
          </p>
          <div className="pt-2">
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
