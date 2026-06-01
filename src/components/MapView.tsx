/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, CircleHelp, ShieldAlert, Plus, ShieldCheck } from 'lucide-react';
import { LostItem } from '../types';

interface MapViewProps {
  items: LostItem[];
  onSelectItem: (item: LostItem) => void;
  onOpenReportForm: () => void;
}

export function MapView({ items, onSelectItem, onOpenReportForm }: MapViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocker, setSelectedLocker] = useState<string | null>(null);

  // Derive counts dynamically
  const lockerACount = items.filter(item => item.lockerName === 'Locker A' && item.status === 'available').length;
  const lockerBCount = items.filter(item => item.lockerName === 'Locker B' && item.status === 'available').length;
  const mainOfficeCount = items.filter(item => item.lockerName === 'Main Office' && item.status === 'available').length;

  // Filter items based on both search query and selected locker pin
  const filteredItems = items.filter(item => {
    if (item.status !== 'available') return false;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocker = selectedLocker ? item.lockerName === selectedLocker : true;
    return matchesSearch && matchesLocker;
  });

  return (
    <div className="relative flex-1 w-full h-[calc(100vh-130px)] overflow-hidden bg-brand-bg/60">
      
      {/* Search overlay bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <form onSubmit={(e) => e.preventDefault()} className="bg-white/95 backdrop-blur-xs shadow-md rounded-xl flex items-center px-4 py-2.5 border-2 border-brand-gold/30 max-w-lg mx-auto">
          <Search className="w-5 h-5 text-brand-gold-dark mr-2.5 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="에타에서 헤매지 마세요! 물건 찾기..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-0 text-sm focus:outline-hidden font-sans placeholder-gray-400 text-gray-800"
          />
          <button 
            type="button"
            onClick={() => { setSelectedLocker(null); setSearchTerm(''); }}
            className={`p-1.5 rounded-full hover:bg-brand-gold-light transition ${selectedLocker ? 'text-brand-purple' : 'text-gray-400'}`}
            title="필터 초기화"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* STYLIZED 2D CAMPUS VECTOR MAP - PARCHMENT STYLE */}
      <div className="absolute inset-0 select-none">
        <svg 
          viewBox="0 0 1000 800" 
          className="w-full h-full object-cover min-w-[700px] opacity-95"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Parchment Antique Gold Background */}
          <rect width="1000" height="800" fill="#FCFAF5" />
          
          {/* Water features / Lake (Classic Royal Blue-Grey) */}
          <path d="M -50 400 Q 150 300 250 500 T 500 450 T 800 650 T 1050 600 L 1050 900 L -50 900 Z" fill="#EBF3F6" opacity="0.8" />
          <path d="M -50 400 Q 150 300 250 500 T 500 450 T 800 650 T 1050 600" stroke="#CADDE6" strokeWidth="6" fill="none" opacity="0.6" />
          
          {/* Campus Historic Paths (Warm Stone/Sepia Road Lines) */}
          <path d="M 0 100 L 1000 250 M 500 0 L 500 800 M 150 800 L 800 0 M 0 600 C 300 600, 700 400, 1000 600" stroke="#F1ECE1" strokeWidth="24" strokeLinecap="round" fill="none" />
          <path d="M 0 100 L 1000 250 M 500 0 L 500 800 M 150 800 L 800 0 M 0 600 C 300 600, 700 400, 1000 600" stroke="#E6DECE" strokeWidth="18" strokeLinecap="round" fill="none" />

          {/* Central Lake Circle (Sa-La-Mot lake landmark with gold trim) */}
          <circle cx="500" cy="400" r="90" fill="#CADDE6" stroke="#c5a043" strokeWidth="4" opacity="0.8"/>
          <circle cx="500" cy="400" r="78" fill="#DCE9EE" opacity="0.9"/>
          
          {/* Garamond serif lettering */}
          <text x="500" y="405" textAnchor="middle" fill="#2E1150" fontSize="15" fontWeight="bold" fontFamily="Cormorant Garamond, Georgia, serif" fontStyle="italic">
            사자목 호수 (Sa-La-Mot)
          </text>

          {/* Campus Buildings Visual Blocks - Royal Burgundy-Purple Trim with Gold Labels */}
          {/* 1. Academic Library (Locker A Area) */}
          <g transform="translate(170, 190)">
            {/* Outer traditional shadows */}
            <rect x="2" y="2" width="200" height="120" rx="4" fill="#8c6a1c" opacity="0.15" />
            <rect width="200" height="120" rx="4" fill="white" stroke="#c5a043" strokeWidth="2.5" />
            <rect x="6" y="6" width="188" height="108" rx="2" fill="#FBF9F4" stroke="#4d157a" strokeWidth="1" />
            <text x="100" y="55" textAnchor="middle" fill="#4d157a" fontSize="18" fontWeight="bold" fontFamily="Cormorant Garamond, Georgia, serif">중앙도서관</text>
            <text x="100" y="80" textAnchor="middle" fill="#8c6a1c" fontSize="12" fontWeight="bold" fontFamily="system-ui">Locker A Hub</text>
          </g>

          {/* 2. Student Union Building (Locker B Area) */}
          <g transform="translate(560, 360)">
            <rect x="2" y="2" width="200" height="120" rx="4" fill="#8c6a1c" opacity="0.15" />
            <rect width="200" height="120" rx="4" fill="white" stroke="#c5a043" strokeWidth="2.5" />
            <rect x="6" y="6" width="188" height="108" rx="2" fill="#FBF9F4" stroke="#4d157a" strokeWidth="1" />
            <text x="100" y="55" textAnchor="middle" fill="#4d157a" fontSize="18" fontWeight="bold" fontFamily="Cormorant Garamond, Georgia, serif">학생회관</text>
            <text x="100" y="80" textAnchor="middle" fill="#8c6a1c" fontSize="12" fontWeight="bold" fontFamily="system-ui">Locker B Hub</text>
          </g>

          {/* 3. Main Administration Office Area */}
          <g transform="translate(360, 60)">
            <rect x="2" y="2" width="180" height="98" rx="4" fill="#8c6a1c" opacity="0.15" />
            <rect width="180" height="98" rx="4" fill="white" stroke="#c5a043" strokeWidth="2.5" />
            <rect x="5" y="5" width="170" height="88" rx="2" fill="#FAF1D8" stroke="#8c6a1c" strokeWidth="1" />
            <text x="90" y="46" textAnchor="middle" fill="#8c6a1c" fontSize="16" fontWeight="bold" fontFamily="Cormorant Garamond, Georgia, serif">본관 행정지원팀</text>
            <text x="90" y="68" textAnchor="middle" fill="#4d157a" fontSize="11" fontWeight="bold" fontFamily="system-ui">Main Office Hub</text>
          </g>

          {/* 4. Engineering Building */}
          <g transform="translate(680, 120)">
            <rect width="150" height="90" rx="4" fill="white" stroke="#E6DECE" strokeWidth="1.5" opacity="0.9" />
            <text x="75" y="50" textAnchor="middle" fill="#8c6a1c" fontSize="14" fontWeight="bold" fontFamily="Cormorant Garamond, Georgia, serif" fontStyle="italic">제1공학관</text>
          </g>

          {/* 5. Gymnasium Gym */}
          <g transform="translate(120, 540)">
            <rect width="140" height="80" rx="4" fill="white" stroke="#E6DECE" strokeWidth="1.5" opacity="0.9" />
            <text x="70" y="45" textAnchor="middle" fill="#8c6a1c" fontSize="14" fontWeight="bold" fontFamily="Cormorant Garamond, Georgia, serif" fontStyle="italic">체육관</text>
          </g>
        </svg>
      </div>

      {/* DYNAMIC MAP PINS - OVERLAID ABSOLUTELY with elegant college seals */}
      {/* Pin 1: Locker A */}
      <div 
        onClick={() => setSelectedLocker(selectedLocker === 'Locker A' ? null : 'Locker A')}
        className={`absolute top-[32%] left-[28%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-all duration-300 ${
          selectedLocker === 'Locker A' ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 border-2 transition-colors ${
            selectedLocker === 'Locker A' 
              ? 'bg-brand-purple text-brand-gold-light border-brand-gold' 
              : 'bg-white text-brand-purple border-brand-gold'
          }`}>
            <MapPin className="w-4 h-4 fill-current text-brand-gold stroke-[2.5]" />
            <span className="text-xs font-mono font-bold">Locker A ({lockerACount})</span>
          </div>
          <div className={`w-[3px] h-3 shadow-xs ${selectedLocker === 'Locker A' ? 'bg-brand-gold' : 'bg-brand-gold/60'}`}></div>
        </div>
      </div>

      {/* Pin 2: Locker B */}
      <div 
        onClick={() => setSelectedLocker(selectedLocker === 'Locker B' ? null : 'Locker B')}
        className={`absolute top-[52%] left-[68%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-all duration-300 ${
          selectedLocker === 'Locker B' ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 border-2 transition-colors ${
            selectedLocker === 'Locker B' 
              ? 'bg-brand-purple text-brand-gold-light border-brand-gold' 
              : 'bg-white text-brand-purple border-brand-gold'
          }`}>
            <MapPin className="w-4 h-4 fill-current text-brand-gold stroke-[2.5]" />
            <span className="text-xs font-mono font-bold">Locker B ({lockerBCount})</span>
          </div>
          <div className={`w-[3px] h-3 shadow-xs ${selectedLocker === 'Locker B' ? 'bg-brand-gold' : 'bg-brand-gold/60'}`}></div>
        </div>
      </div>

      {/* Pin 3: Main Office (unverified locker hub) */}
      <div 
        onClick={() => setSelectedLocker(selectedLocker === 'Main Office' ? null : 'Main Office')}
        className={`absolute top-[16%] left-[44%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-all duration-300 ${
          selectedLocker === 'Main Office' ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 border-2 transition-colors ${
            selectedLocker === 'Main Office' 
              ? 'bg-brand-gold-dark text-white border-brand-gold-light' 
              : 'bg-white text-brand-gold-dark border-brand-gold/50'
          }`}>
            <CircleHelp className="w-4 h-4 stroke-[2.5]" />
            <span className="text-xs font-mono font-bold">Main Office ({mainOfficeCount})</span>
          </div>
          <div className={`w-[3px] h-3 ${selectedLocker === 'Main Office' ? 'bg-brand-gold-dark' : 'bg-brand-gold-dark/60'}`}></div>
        </div>
      </div>

      {/* SLIDING RECENTS SHEET (COLLAPSIBLE / LIST PANEL) */}
      <div className="absolute bottom-4 left-4 right-4 z-20 bg-white rounded-2xl shadow-2xl border-2 border-brand-gold/30 flex flex-col max-h-[300px] overflow-hidden">
        
        {/* drag aesthetic bar */}
        <div className="w-full flex justify-center py-2 bg-brand-surface-low border-b border-brand-gold/10 flex-shrink-0">
          <div className="w-10 h-1 bg-brand-gold/30 rounded-full"></div>
        </div>

        {/* Content sheet Header */}
        <div className="px-4 py-3 flex justify-between items-end border-b border-brand-gold/10 flex-shrink-0 bg-brand-gold-light/20">
          <div>
            <h2 className="text-base font-display font-bold text-brand-purple">
              {selectedLocker ? `📍 [${selectedLocker}] 보관 물품` : '최근 습득물'}
            </h2>
            <p className="text-[10px] font-medium text-brand-gold-dark">
              {selectedLocker 
                ? `${selectedLocker} 에 보관되어 있는 고결성 검증 완료 스마트 보관 물품입니다.` 
                : '캠퍼스 내 공인 수령 채널 · 신속한 분실물 안심 복구'}
            </p>
          </div>

          {selectedLocker && (
            <button 
              onClick={() => setSelectedLocker(null)}
              className="text-xs font-bold text-brand-purple hover:text-brand-gold-dark hover:underline"
            >
              전체보기
            </button>
          )}
        </div>

        {/* Items List scrollable */}
        <div className="overflow-y-auto p-3 bg-brand-bg/30 flex-1 space-y-2 max-h-[190px]">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-xs font-sans">
              조건에 맞는 스마트 공인보관 물품이 존재하지 않습니다.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-brand-gold/10 hover:border-brand-gold/50 hover:shadow-xs transition duration-200 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-lg bg-gray-50 overflow-hidden relative flex-shrink-0 border-2 border-brand-gold-light shadow-inner">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                  {item.verified && (
                    <div className="absolute top-0.5 right-0.5 bg-brand-purple text-brand-gold p-0.5 rounded-full scale-75 border border-brand-gold-light">
                      <ShieldCheck className="w-3 h-3 fill-current" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="text-xs font-bold font-sans text-gray-800 truncate">{item.name}</h3>
                    <span className="bg-brand-gold-light text-[9px] text-brand-gold-dark px-1.5 py-0.5 rounded-full font-mono font-bold flex-shrink-0">
                      {item.reportedTime}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3 h-3 text-brand-gold-dark stroke-[2.5]" />
                    {item.location}
                  </p>
                  <p className="text-[9px] text-brand-purple font-mono font-bold mt-0.5 bg-brand-purple-light/50 px-2 py-0.5 rounded w-fit capitalize border border-brand-purple/10">
                    {item.lockerName}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button 
        onClick={onOpenReportForm}
        className="fixed bottom-[74px] right-4 z-30 bg-gradient-to-r from-brand-purple via-brand-purple-dark to-brand-purple text-brand-gold-light p-3.5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 border-2 border-brand-gold"
        title="새로운 분실물 신고등록"
      >
        <Plus className="w-5 h-5 text-brand-gold animate-bounce" strokeWidth={2.5} />
        <span className="text-xs font-display font-bold tracking-wider pr-1">분실물 기증/신고</span>
      </button>

    </div>
  );
}
