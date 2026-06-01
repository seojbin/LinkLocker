/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Map, Search, History, Award } from 'lucide-react';

interface NavbarProps {
  currentTab: 'map' | 'search' | 'records' | 'rewards';
  onNavigate: (tab: 'map' | 'search' | 'records' | 'rewards') => void;
}

export function Navbar({ currentTab, onNavigate }: NavbarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-brand-gold shadow-[0_-4px_16px_rgba(140,106,28,0.08)] py-2.5 px-6 flex justify-around items-center">
      <button 
        onClick={() => onNavigate('map')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 border ${
          currentTab === 'map' 
            ? 'bg-brand-purple text-brand-gold-light border-brand-gold shadow-md scale-105 font-bold font-mono' 
            : 'text-slate-400 border-transparent hover:text-brand-purple hover:bg-brand-gold-light/45'
        }`}
      >
        <Map className="w-5 h-5" />
        <span className="text-[10px] font-sans font-bold">지도 Map</span>
      </button>

      <button 
        onClick={() => onNavigate('search')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 border ${
          currentTab === 'search' 
            ? 'bg-brand-purple text-brand-gold-light border-brand-gold shadow-md scale-105 font-bold font-mono' 
            : 'text-slate-400 border-transparent hover:text-brand-purple hover:bg-brand-gold-light/45'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-sans font-bold">조회 Search</span>
      </button>

      <button 
        onClick={() => onNavigate('records')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 border ${
          currentTab === 'records' 
            ? 'bg-brand-purple text-brand-gold-light border-brand-gold shadow-md scale-105 font-bold font-mono' 
            : 'text-slate-400 border-transparent hover:text-brand-purple hover:bg-brand-gold-light/45'
        }`}
      >
        <History className="w-5 h-5" />
        <span className="text-[10px] font-sans font-bold">예약대장 Records</span>
      </button>

      <button 
        onClick={() => onNavigate('rewards')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 border ${
          currentTab === 'rewards' 
            ? 'bg-brand-purple text-brand-gold-light border-brand-gold shadow-md scale-105 font-bold font-mono' 
            : 'text-slate-400 border-transparent hover:text-brand-purple hover:bg-brand-gold-light/45'
        }`}
      >
        <Award className="w-5 h-5" />
        <span className="text-[10px] font-sans font-bold">복지소 Rewards</span>
      </button>
    </nav>
  );
}
