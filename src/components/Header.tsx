/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, GraduationCap } from 'lucide-react';

interface HeaderProps {
  points: number;
  onNavigate: (tab: 'map' | 'search' | 'records' | 'rewards') => void;
}

export function Header({ points, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white border-b-2 border-brand-gold relative sticky top-0 z-40 px-4 py-3 flex justify-between items-center w-full shadow-md">
      {/* Golden top decorative bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark"></div>

      <div className="flex items-center gap-3">
        {/* Crest style avatar container */}
        <div 
          onClick={() => onNavigate('map')}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-gold cursor-pointer transition transform hover:scale-105 active:scale-95 shadow-sm"
          title="Campus Map"
        >
          <img 
            alt="Profile of Seo" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUhn7ZcOXNjLP_QwF_7_8qREZ3qdRmOx-LigJVhVr7rHVy-_GpIzYu6aED01IUBmQqZzHMuKzGkeFCE6rXUNLgzER_XoJ1-Ws-l2ZQ3UWdrgSOdlnF5OtEVBivHCvi8Nr44MNGK9c-zjtT__FStlk5rL4BR-Hi6erasvVu_damQY8NWxOiuMcOuTBEgwTBbX1qvSy3vsIHvdtCmPs5_qo3WlC964qOCWiFrVebf4wO09MHr7opdd4pRCAdOc8-GThw8bASo_uYyiw"
          />
        </div>
        <div>
          <span 
            onClick={() => onNavigate('map')}
            className="text-2xl font-display font-bold italic tracking-wide text-brand-purple cursor-pointer hover:text-brand-gold-dark transition block"
          >
            LinkLocker
          </span>
          <span className="text-[10px] font-mono text-brand-gold-dark block -mt-1 font-bold tracking-wider">
             한양대 ERICA SMART HUB
          </span>
        </div>
      </div>

      <div 
        onClick={() => onNavigate('rewards')}
        className="flex items-center gap-1.5 bg-brand-gold-light border-2 border-brand-gold/40 px-3 py-1.5 rounded-full cursor-pointer transition duration-200 hover:bg-brand-gold-light/90 active:scale-95 shadow-xs"
      >
        <GraduationCap className="w-4 h-4 text-brand-gold-dark animate-pulse" />
        <span className="text-sm font-mono font-bold text-brand-gold-dark">
          {points.toLocaleString()} pts
        </span>
      </div>
    </header>
  );
}
