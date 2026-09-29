import React from 'react';
import { useItems } from '../context/ItemsContext';
import { PageView } from '../types';
import { MapPin, Phone, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, resetToSampleData } = useItems();

  const handleNav = (p: PageView) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Campus<span className="text-blue-400">Find</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official student-led lost and found portal designed to reconnect lost campus items with their rightful owners safely and quickly.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Campus verified safe exchange platform</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('lost')}
                  className="hover:text-white transition-colors"
                >
                  Browse Lost Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('found')}
                  className="hover:text-white transition-colors"
                >
                  Browse Found Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('search')}
                  className="hover:text-white transition-colors"
                >
                  Search & Filter Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('report')}
                  className="hover:text-white transition-colors"
                >
                  Submit a Report
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works & Safety
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Desks & Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Drop-off Desks
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Student Union Central Desk</span>
                </div>
                <div className="pl-5 text-slate-400 text-[11px] mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Mon – Fri: 8:00 AM – 9:00 PM</span>
                </div>
              </div>

              <div>
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Library Circulation Desk</span>
                </div>
                <div className="pl-5 text-slate-400 text-[11px] mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Open 24/7 during semester</span>
                </div>
              </div>

              <div>
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Campus Safety & Security</span>
                </div>
                <div className="pl-5 text-slate-400 text-[11px] mt-0.5 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>(555) 019-9000 (Dispatch)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Support & Reset */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Student Assistance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Need assistance retrieving an item outside normal hours or reporting high-value university equipment?
            </p>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-xs">
              <span className="text-slate-400">Lost & Found Coordinator:</span>
              <div className="font-semibold text-white mt-0.5">lostandfound@campus.edu</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={resetToSampleData}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline"
              >
                Reset catalog to initial sample items
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} CampusFind. Built for University Students, Faculty & Staff.</p>
          <div className="flex items-center gap-1">
            <span>Keep our campus community honest and kind</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
