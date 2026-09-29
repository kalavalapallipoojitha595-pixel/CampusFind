import React, { useState } from 'react';
import { CampusItem } from '../types';
import { useItems } from '../context/ItemsContext';
import { MapPin, Calendar, CheckCircle2, MessageSquare, ArrowUpRight, HelpCircle } from 'lucide-react';

interface ItemCardProps {
  item: CampusItem;
  onContactClick?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onContactClick }) => {
  const { setSelectedItemForModal } = useItems();
  const [imageError, setImageError] = useState(false);

  const isLost = item.type === 'lost';
  const isResolved = item.status === 'resolved';

  const handleCardClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      setSelectedItemForModal(item);
    }
  };

  // Format date nicely
  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group relative bg-white rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col overflow-hidden ${
        isResolved
          ? 'border-slate-200 bg-slate-50/60 opacity-85'
          : isLost
          ? 'border-slate-200/90 hover:border-blue-300'
          : 'border-slate-200/90 hover:border-emerald-300'
      }`}
    >
      {/* Visual Asset Container (4:3 aspect ratio) */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {item.imageUrl && !imageError ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
            <HelpCircle className="w-10 h-10 mb-2 stroke-1 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">{item.category}</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Photo not provided</span>
          </div>
        )}

        {/* Quiet status banner: accessible text pair */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/95 backdrop-blur-xs text-xs font-semibold shadow-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              isResolved ? 'bg-slate-400' : isLost ? 'bg-amber-500' : 'bg-blue-600'
            }`}
          />
          <span className={isResolved ? 'text-slate-600' : isLost ? 'text-amber-800' : 'text-blue-800'}>
            {isResolved ? 'Reconnected' : isLost ? 'Reported Lost' : 'Reported Found'}
          </span>
        </div>

        {isResolved && (
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] flex items-center justify-center">
            <div className="bg-white/95 text-slate-800 px-3 py-1.5 rounded-lg shadow-sm font-medium text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Returned to owner
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Metadata Line: Category and Date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <span className="font-medium text-slate-700">{item.category}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{formatDate(item.date)}</span>
            </span>
          </div>

          {/* Item Title */}
          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>

          {/* Location Line */}
          <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 mt-0.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{item.location}</span>
          </div>

          {/* Description Snippet */}
          <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="text-xs text-slate-500 truncate">
            Reported by <span className="font-medium text-slate-700">{item.contactName.split(' ')[0]}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItemForModal(item);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              isLost
                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 active:bg-emerald-200'
            }`}
          >
            <MessageSquare className="w-3 h-3" />
            <span>{isLost ? 'Contact Owner' : 'Claim Item'}</span>
            <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-60" />
          </button>
        </div>
      </div>
    </article>
  );
};
