import React, { useState } from 'react';
import { useItems } from '../context/ItemsContext';
import { ItemCard } from '../components/ItemCard';
import {
  Search,
  SearchCheck,
  PlusCircle,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { items, setCurrentPage, openReportModalWithType, openSearchWithType } = useItems();
  const [quickSearch, setQuickSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      openSearchWithType('all', quickSearch.trim());
    } else {
      setCurrentPage('search');
    }
  };

  // Filter recent items based on tab
  const filteredRecentItems = items
    .filter((item) => {
      if (activeTab === 'lost') return item.type === 'lost';
      if (activeTab === 'found') return item.type === 'found';
      return true;
    })
    .slice(0, 6);

  const totalLost = items.filter((i) => i.type === 'lost' && i.status === 'active').length;
  const totalFound = items.filter((i) => i.type === 'found' && i.status === 'active').length;
  const totalResolved = items.filter((i) => i.status === 'resolved').length;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Campus badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200/80 text-blue-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Official Student Portal · 2026 Campus Network</span>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none text-balance">
              Campus<span className="text-blue-600">Find</span>
            </h1>

            <p className="text-lg sm:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto text-balance">
              “Lost something? Found something? Let’s reconnect it with its owner.”
            </p>

            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Every week, hundreds of keys, laptops, IDs, and bottles go missing around lecture halls and dining rooms. CampusFind makes reporting and recovering items fast, secure, and student-friendly.
            </p>

            {/* Two Main Call-To-Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => openReportModalWithType('lost')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/15 transition-all text-sm group"
              >
                <HelpCircle className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
                <span>I Lost Something</span>
              </button>

              <button
                type="button"
                onClick={() => openReportModalWithType('found')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 shadow-xs transition-all text-sm group"
              >
                <SearchCheck className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>I Found Something</span>
              </button>
            </div>

            {/* Quick Hero Search Input */}
            <form onSubmit={handleSearchSubmit} className="pt-4 max-w-xl mx-auto">
              <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
                <div className="pl-4 pr-2 text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="Search for MacBook, dorm keys, AirPods, backpack, wallet..."
                  className="w-full py-3 pr-28 text-xs sm:text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Real-time Campus Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200/80">
          <div className="flex items-center gap-3.5 px-3 py-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                {totalLost}
              </div>
              <div className="text-xs text-slate-500 font-medium">Active Lost Reports</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 py-2 border-t sm:border-t-0 sm:border-l border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <SearchCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                {totalFound}
              </div>
              <div className="text-xs text-slate-500 font-medium">Found Items Waiting to be Claimed</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 py-2 border-t sm:border-t-0 sm:border-l border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                {totalResolved + 48}
              </div>
              <div className="text-xs text-slate-500 font-medium">Items Reunited This Term</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How CampusFind Works
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Simple, transparent, and direct communication between campus community members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs relative flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Report the Item</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take 60 seconds to fill out whether you lost or found an item. Add location, date, and optionally upload a photo.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
              <span>Instant publication</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs relative flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Search & Match</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse our real-time lost and found catalog or use filters by campus hall, category, and keyword.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
              <span>Smart keyword matching</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs relative flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Safely Reconnect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send a direct message or claim inquiry. Coordinate a safe exchange at the Student Union or Library help desk.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <span>Reunited with owner</span>
              <CheckCircle2 className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Recently Reported Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Recently Reported Items
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Latest items posted by students, professors, and facility staff.
            </p>
          </div>

          {/* Filter segment tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('lost')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'lost'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lost Only
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'found'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Found Only
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* View All Links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage('lost')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <span>Browse All Lost Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentPage('found')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <span>Browse All Found Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* College Safety & Drop-off Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-blue-900 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>Campus Security Partnership</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Found high-value items or campus keys?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              If you found university keys, laptops, credit cards, or passports, you can safely turn them into the Student Union Information Desk or Campus Safety Dispatch. They register items in CampusFind immediately.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentPage('how-it-works')}
                className="px-4 py-2 bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold rounded-lg transition-colors"
              >
                View Designated Campus Drop-off Desks
              </button>
              <button
                onClick={() => openReportModalWithType('found')}
                className="px-4 py-2 bg-blue-800/80 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg border border-blue-700 transition-colors"
              >
                Report Item Online First
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
