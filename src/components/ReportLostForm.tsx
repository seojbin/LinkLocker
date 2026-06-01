/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Camera, Plus, MapPin, Check, AlertCircle } from 'lucide-react';
import { LostItem } from '../types';

interface ReportLostFormProps {
  onClose: () => void;
  onAdd: (item: Omit<LostItem, 'id' | 'reportedTime' | 'status' | 'lockerCode'>) => void;
}

const PRESET_PHOTOS = [
  {
    name: 'AirPods/이식물품',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwoVeZlwdSkScIfajp9t9-V851HVyLlvvYcAi8NzMdz0_INgsApy6AGxHGumYr6x0yJPUL36KH4sK2JyFrGHiF7EmuhKaBZ8TbszoV9pXBxUeB7TQ1RP48pLwYXLUniXNM_xZ0mjYF3yN_LfA-DWijbZCmfM3yi8Zov-Ft-D3oK_M-Mk874Swdz_SWgFZyY050ECPxMoIdpVWynidVkwlNfSWZ2Gw__eWKxBfbhqHe2Omk6EiHnB9L9WfSVa5guY6a_mRava3MOzw'
  },
  {
    name: '가죽지갑/카드',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmkVWcSKLFKptnLOSB-o-305RjWqjODG8JGmkD_6IGWKTclaXaCQ5GAwfGkSriXkpm2SMtbYBAzv8lPGVaqmzKqA5X7J1mVf5F3FJj6tFbcjWHkNRJwdEotpODqWBteCxL6Jl4jTGqs_t8QNk7p3YN_5xlg25yMhYdPWR5e9USSQ-tZM2LkLmcKQnURt4IMm6MJdmJb_LtJL9dTkdDafZH8LRDcLgSMzLWDFADbBr2a_CDsL8GBd--PmlBd9cwrL0KudWoc2qsolo'
  },
  {
    name: '열쇠/금속류',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApVUgDw2p5DOnbxPVm_Pbl5mk-aSQASmr0qZN-99DSFIu_FVkrzWJGSAXZjsgu_lXXAFbebyazjWweBRspKz7ya4h4XsXE3LFp2LPXrQ-3BpnZtJ-oVW-5PyT3e8IRqLyJEGKJA5nXuSn6Ke9brG1M9mI9ImdkgaxHulcdpyzWtorFbXykLkk5HYX2Aw7qZ1catES3nc4Qr41dojF-K3GL9qhhCmP92lqC3UiNiXF0xhSGjhafdcyHWCAr6pszZ63TebDdoIFm4gg'
  },
  {
    name: '가방/파우치',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200'
  }
];

export function ReportLostForm({ onClose, onAdd }: ReportLostFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_PHOTOS[0].url);
  const [lockerName, setLockerName] = useState('Locker A');
  const [verified, setVerified] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Pick coordinates based on locker choice so they place nicely on the custom SVG map
  const getCoordinates = () => {
    if (lockerName === 'Locker A') {
      return { lat: 38, lng: 40 };
    } else if (lockerName === 'Locker B') {
      return { lat: 55, lng: 60 };
    } else {
      return { lat: 70, lng: 35 };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) {
      setValidationError('물품 이름과 정확한 수거 발견 위치를 기입해주십시오.');
      return;
    }

    const { lat, lng } = getCoordinates();

    onAdd({
      name,
      category,
      location,
      description,
      points: 10,
      imageUrl,
      verified,
      lat,
      lng,
      lockerName
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border-4 border-double border-brand-gold w-full max-w-sm overflow-hidden max-h-[90vh] flex flex-col scale-100 animate-[fade-in_0.2s_ease-out]">
        
        {/* Header decoration */}
        <div className="h-1 w-full bg-gradient-to-r from-brand-gold via-brand-purple to-brand-gold"></div>

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-brand-gold/20 bg-brand-gold-light/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping"></span>
            <h3 className="font-display font-bold text-brand-purple text-lg italic">습득물 안심 보관·맡기기 등록</h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-brand-purple/75 hover:text-brand-purple hover:bg-brand-gold-light/60 p-1.5 rounded-full transition border border-transparent hover:border-brand-gold/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 font-sans bg-brand-bg/10">
          
          {/* Validation Alert */}
          {validationError && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-start gap-2 text-red-700 text-xs font-medium animate-pulse">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Item Name */}
          <div>
            <label className="block text-[10px] font-mono font-bold text-brand-gold-dark uppercase tracking-wider mb-1">
              학술 물품 명칭 <span className="text-red-500 font-bold">*</span>
            </label>
            <input 
              type="text"
              required
              placeholder="예: 공학대학 전산 회로판, 가죽 안경케이스"
              value={name}
              onChange={(e) => {
                setValidationError(null);
                setName(e.target.value);
              }}
              className="w-full px-3.5 py-2.5 bg-brand-gold-light/20 border border-brand-gold/25 rounded-lg font-sans text-sm outline-hidden focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:bg-white transition"
            />
          </div>

          {/* Category & Locker */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono font-bold text-brand-gold-dark uppercase tracking-wider mb-1">
                자산 분류구분
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-2.5 bg-brand-gold-light/20 border border-brand-gold/25 rounded-lg font-sans text-xs outline-hidden focus:ring-1 focus:ring-brand-gold focus:bg-white"
              >
                <option value="Electronics">Electronics</option>
                <option value="Wallet">Wallet</option>
                <option value="Keys">Keys</option>
                <option value="Bags">Bags</option>
                <option value="Documents">Documents</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-brand-gold-dark uppercase tracking-wider mb-1">
                입점 안심 캐비닛
              </label>
              <select 
                value={lockerName}
                onChange={(e) => setLockerName(e.target.value)}
                className="w-full px-2 py-2.5 bg-brand-gold-light/20 border border-brand-gold/25 rounded-lg font-sans text-xs outline-hidden focus:ring-1 focus:ring-brand-gold focus:bg-white"
              >
                <option value="Locker A">Locker A (중앙관)</option>
                <option value="Locker B">Locker B (학생관)</option>
                <option value="Main Office">Admin (행정지원)</option>
              </select>
            </div>
          </div>

          {/* Found Place */}
          <div>
            <label className="block text-[10px] font-mono font-bold text-brand-gold-dark uppercase tracking-wider mb-1">
              최초 습득 처소 <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-brand-gold-dark absolute left-3 top-3.5" />
              <input 
                type="text"
                required
                placeholder="예: 공학1관 3층 302호 세미나실"
                value={location}
                onChange={(e) => {
                  setValidationError(null);
                  setLocation(e.target.value);
                }}
                className="w-full pl-9 pr-3.5 py-2.5 bg-brand-gold-light/20 border border-brand-gold/25 rounded-lg font-sans text-sm outline-hidden focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:bg-white transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-mono font-bold text-brand-gold-dark uppercase tracking-wider mb-1">
              상태적 특성 명세
            </label>
            <textarea 
              rows={2}
              placeholder="예: 금빛 도금 장식이 모서리에 박힌 형태로 깨끗함"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-brand-gold-light/20 border border-brand-gold/25 rounded-lg font-sans text-xs outline-hidden focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:bg-white transition"
            />
          </div>

          {/* Photo Preset Selector */}
          <div>
            <label className="block text-[10px] font-mono font-bold text-brand-gold-dark uppercase tracking-wider mb-2">
              현장 보존 사진 매칭 (학술 프리셋)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_PHOTOS.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(photo.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                    imageUrl === photo.url ? 'border-brand-gold ring-2 ring-brand-purple/20 scale-105' : 'border-transparent hover:scale-105'
                  }`}
                >
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-1">
                    <span className="text-[8px] text-brand-gold-light font-sans font-bold truncate leading-none">{photo.name}</span>
                  </div>
                  {imageUrl === photo.url && (
                    <div className="absolute top-1 right-1 bg-brand-gold text-brand-purple p-0.5 rounded-full scale-75 border border-brand-gold-light">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Safety Verification Badge Option */}
          <div className="flex items-start gap-2.5 p-3.5 bg-brand-gold-light/35 rounded-xl border-2 border-brand-gold/20">
            <input 
              type="checkbox" 
              id="verify-check"
              checked={verified}
              onChange={(e) => setVerified(e.target.checked)}
              className="w-4 h-4 rounded text-brand-purple border-brand-gold focus:ring-brand-gold mt-0.5 accent-brand-purple"
            />
            <label htmlFor="verify-check" className="text-[10px] text-slate-700 font-medium leading-relaxed cursor-pointer select-none">
              <strong className="text-brand-purple">Official Campus Verified</strong> 태그 오피셜 자동 검인 부여 (대외부 서명 필)
            </label>
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="w-full bg-brand-purple text-brand-gold-light border border-brand-gold font-display font-bold text-sm uppercase py-3.5 rounded-xl hover:bg-brand-purple-dark transition shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 text-brand-gold" />
            안심 보관함에 맡기기 완료
          </button>

        </form>
      </div>
    </div>
  );
}
