/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, Tag, ShieldCheck, Filter } from 'lucide-react';
import { LostItem } from '../types';

interface SearchViewProps {
  items: LostItem[];
  onSelectItem: (item: LostItem) => void;
}

const CATEGORIES = ['All', 'Electronics', 'Wallet', 'Keys', 'Bags', 'Others'];

export function SearchView({ items, onSelectItem }: SearchViewProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = items.filter(item => {
    // Only search available items
    if (item.status !== 'available') return false;

    const matchesSearch = item.name.toLowerCase().includes(query.toLowerCase()) ||
                          item.location.toLowerCase().includes(query.toLowerCase()) ||
                          item.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 w-full p-4 pb-20 overflow-y-auto max-w-container-max mx-auto font-sans">
      
      {/* Search Input Box with academic gold trim */}
      <div className="relative mb-4">
        <Search className="w-5 h-5 text-brand-gold-dark absolute left-3 top-3.5" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="찾으시는 물품 종류나 보관 위치를 검색해보세요..." 
          className="w-full pl-10 pr-4 py-3 bg-white/90 border-2 border-brand-gold/30 rounded-xl font-sans text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-brand-purple focus:border-brand-purple focus:bg-white transition"
        />
      </div>

      {/* Categories Horizontal Scroll Grid - Academic style */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-150 border-2 ${
              activeCategory === cat 
                ? 'bg-brand-purple text-brand-gold-light border-brand-gold' 
                : 'bg-white text-gray-500 border-brand-surface-high hover:border-brand-gold/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Summary Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-mono font-bold text-brand-gold-dark uppercase tracking-wider flex items-center gap-1">
          <Filter className="w-3" />
          공인학술 자산 보관 데이터베이스 ({filteredItems.length}건 유효)
        </span>
      </div>

      {/* Grid of Results */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-brand-gold/20 p-12 text-center text-gray-400 text-sm shadow-xs">
          일치하는 공인 보관 물품이 없습니다. 다른 키워드를 입력해보세요!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition duration-200 border-2 border-brand-gold/10 hover:border-brand-gold/40 cursor-pointer flex flex-col relative group"
            >
              {/* Gold tiny header trim on hover */}
              <div className="h-[3px] w-full bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

              <div className="relative aspect-video bg-gray-50 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                
                {/* Official campus tag */}
                {item.verified && (
                  <div className="absolute top-2.5 left-2.5 bg-brand-purple text-brand-gold border border-brand-gold flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                    VERIFIED SAFE
                  </div>
                )}

                {/* Locker Name label */}
                <div className="absolute bottom-2.5 right-2.5 bg-brand-purple/95 text-brand-gold-light border border-brand-gold font-mono text-[9px] font-bold px-2.5 py-0.5 rounded backdrop-blur-xs">
                  {item.lockerName}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-[10px] font-mono font-extrabold text-brand-gold-dark uppercase tracking-wider bg-brand-gold-light px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 font-semibold">
                      {item.reportedTime}
                    </span>
                  </div>
                  <h4 className="text-base font-display font-bold text-gray-800 leading-snug line-clamp-1 mt-1.5">{item.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-gold/10 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 font-bold truncate">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                    {item.location}
                  </span>
                  <span className="text-[10px] font-mono font-extrabold text-brand-gold-dark bg-brand-gold-light/60 border border-brand-gold/40 px-2.5 py-0.5 rounded">
                    안심수령 {item.points} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
