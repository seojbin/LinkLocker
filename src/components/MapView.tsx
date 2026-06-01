/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, MapPin, CircleHelp, ShieldAlert, Plus, ShieldCheck } from 'lucide-react';
import { LostItem } from '../types';
import L from 'leaflet';

interface MapViewProps {
  items: LostItem[];
  onSelectItem: (item: LostItem) => void;
  onOpenReportForm: () => void;
}

export function MapView({ items, onSelectItem, onOpenReportForm }: MapViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocker, setSelectedLocker] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

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

  // Setup Leaflet Map
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize map centering on Hanyang University ERICA campus
    if (!mapRef.current) {
      const mapInstance = L.map(containerRef.current, {
        center: [37.2982, 126.8335],
        zoom: 17,
        zoomControl: false,
      });

      // CartoDB Voyager Map Tiles (Cream-colored premium visual scheme)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    }

    const map = mapRef.current;

    // Reset markers layer group
    if (!markersLayerRef.current) {
      markersLayerRef.current = L.layerGroup().addTo(map);
    } else {
      markersLayerRef.current.clearLayers();
    }

    const markersGroup = markersLayerRef.current;

    // Pin 1: Locker A
    const isLockerASelected = selectedLocker === 'Locker A';
    const iconA = L.divIcon({
      html: `
        <div class="flex flex-col items-center select-none active:scale-95 transition-all duration-200">
          <div class="px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border-2 whitespace-nowrap transition-colors duration-200 ${
            isLockerASelected 
              ? 'bg-[#4d157a] text-[#F9F4E3] border-[#c5a043] scale-110 font-bold ring-4 ring-[#4d157a]/25' 
              : 'bg-white text-[#4d157a] border-[#c5a043] font-bold hover:border-[#4d157a]'
          }">
            <span class="text-xs leading-none">📍 보관함 A (${lockerACount}개)</span>
          </div>
          <div class="w-[3px] h-2.5 ${isLockerASelected ? 'bg-[#c5a043]' : 'bg-[#c5a043]/60'}"></div>
        </div>
      `,
      className: '',
      iconSize: [120, 42],
      iconAnchor: [60, 42]
    });

    const markerA = L.marker([37.2982, 126.8335], { icon: iconA }).addTo(markersGroup);
    markerA.on('click', () => {
      setSelectedLocker(prev => prev === 'Locker A' ? null : 'Locker A');
    });

    // Pin 2: Locker B
    const isLockerBSelected = selectedLocker === 'Locker B';
    const iconB = L.divIcon({
      html: `
        <div class="flex flex-col items-center select-none active:scale-95 transition-all duration-200">
          <div class="px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border-2 whitespace-nowrap transition-colors duration-200 ${
            isLockerBSelected 
              ? 'bg-[#4d157a] text-[#F9F4E3] border-[#c5a043] scale-110 font-bold ring-4 ring-[#4d157a]/25' 
              : 'bg-white text-[#4d157a] border-[#c5a043] font-bold hover:border-[#4d157a]'
          }">
            <span class="text-xs leading-none">📍 보관함 B (${lockerBCount}개)</span>
          </div>
          <div class="w-[3px] h-2.5 ${isLockerBSelected ? 'bg-[#c5a043]' : 'bg-[#c5a043]/60'}"></div>
        </div>
      `,
      className: '',
      iconSize: [120, 42],
      iconAnchor: [60, 42]
    });

    const markerB = L.marker([37.2968, 126.8315], { icon: iconB }).addTo(markersGroup);
    markerB.on('click', () => {
      setSelectedLocker(prev => prev === 'Locker B' ? null : 'Locker B');
    });

    // Pin 3: Main Office
    const isMainOfficeSelected = selectedLocker === 'Main Office';
    const iconOffice = L.divIcon({
      html: `
        <div class="flex flex-col items-center select-none active:scale-95 transition-all duration-200">
          <div class="px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border-2 whitespace-nowrap transition-colors duration-200 ${
            isMainOfficeSelected 
              ? 'bg-[#8c6a1c] text-white border-[#F9F4E3] scale-110 font-bold ring-4 ring-[#8c6a1c]/25' 
              : 'bg-white text-[#8c6a1c] border-[#8c6a1c]/50 font-bold hover:border-[#8c6a1c]'
          }">
            <span class="text-xs leading-none">🏢 대학행정관 (${mainOfficeCount}개)</span>
          </div>
          <div class="w-[3px] h-2.5 ${isMainOfficeSelected ? 'bg-[#8c6a1c]' : 'bg-[#8c6a1c]/60'}"></div>
        </div>
      `,
      className: '',
      iconSize: [120, 42],
      iconAnchor: [60, 42]
    });

    const markerOffice = L.marker([37.2995, 126.8309], { icon: iconOffice }).addTo(markersGroup);
    markerOffice.on('click', () => {
      setSelectedLocker(prev => prev === 'Main Office' ? null : 'Main Office');
    });

    // Animate view camera based on user choice
    if (selectedLocker === 'Locker A') {
      map.setView([37.2982, 126.8335], 17.5, { animate: true });
    } else if (selectedLocker === 'Locker B') {
      map.setView([37.2968, 126.8315], 17.5, { animate: true });
    } else if (selectedLocker === 'Main Office') {
      map.setView([37.2995, 126.8309], 17.5, { animate: true });
    } else {
      map.setView([37.2982, 126.8335], 17, { animate: true });
    }

  }, [selectedLocker, lockerACount, lockerBCount, mainOfficeCount]);

  // Clean-up on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative flex-1 w-full h-[calc(100vh-130px)] overflow-hidden bg-brand-bg/60">
      
      {/* Search overlay bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <form onSubmit={(e) => e.preventDefault()} className="bg-white/95 backdrop-blur-xs shadow-md rounded-xl flex items-center px-4 py-2.5 border-2 border-brand-gold/30 max-w-lg mx-auto">
          <Search className="w-5 h-5 text-brand-gold-dark mr-2.5 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="에타에서 헤매지 마세요! 보관 물품 찾기..." 
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

      {/* REAL CAMPUS MAP CONTAINER */}
      <div className="absolute inset-0 w-full h-full">
        <div ref={containerRef} className="w-full h-full" style={{ zIndex: 1 }} />
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
              {selectedLocker ? `📍 [${selectedLocker}] 보관 물품` : '최근 습득한 보관품'}
            </h2>
            <p className="text-[10px] font-medium text-brand-gold-dark">
              {selectedLocker 
                ? `${selectedLocker}에 보관 장기 안전 인계 대기 중인 습득 자산입니다.` 
                : '한양 ERICA 캠퍼스 전용 스마트 보관함 · 맡겨놓은 물품 수령처'}
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
              조건에 맞는 안심 보관함 보관 물품이 존재하지 않습니다.
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
        title="보관할 습득물 등록하기"
        style={{ zIndex: 10 }}
      >
        <Plus className="w-5 h-5 text-brand-gold animate-bounce" strokeWidth={2.5} />
        <span className="text-xs font-display font-bold tracking-wider pr-1">습득물 보관함에 맡기기</span>
      </button>

    </div>
  );
}
