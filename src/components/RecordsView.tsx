/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, FileText, Clock, ShieldCheck, KeyRound, Info, HelpCircle, Archive, ClipboardCheck, Lock } from 'lucide-react';
import { LostItem } from '../types';

interface RecordsViewProps {
  selectedItem: LostItem | null;
  items: LostItem[];
  onReserveItem: (item: LostItem) => void;
  onClearSelection: () => void;
}

export function RecordsView({ selectedItem, items, onReserveItem, onClearSelection }: RecordsViewProps) {
  // If no item is selected, render a Reservation & History dashboard
  if (!selectedItem) {
    const historicalItems = items.filter(i => i.status === 'completed');
    const reservedItems = items.filter(i => i.status === 'reserved');

    return (
      <div className="flex-1 w-full p-4 pb-20 overflow-y-auto max-w-lg mx-auto font-sans space-y-5">
        <div className="bg-white rounded-2xl border-2 border-brand-gold/30 p-6 text-center shadow-md relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-brand-gold"></div>
          <Archive className="w-10 h-10 text-brand-gold mx-auto mb-3" />
          <h2 className="text-xl font-display font-bold text-brand-purple">보관소 예약 및 반납 영수 대장</h2>
          <p className="text-xs text-brand-gold-dark mt-1 font-medium">
            스마트 보관함에 안전 보관된 물품을 수령하기 위한 가동 예약 내역과 과거 공식 수령 보관 등기부입니다.
          </p>
        </div>

        {/* Active Reserved Pickups */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-brand-gold-dark uppercase tracking-wider">진행 중인 안심 수령 예약 건</h3>
          {reservedItems.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-brand-gold/15 rounded-xl p-6 text-center text-xs text-gray-400 font-sans">
              현재 예약된 반납 승인 대기 건이 없습니다.
            </div>
          ) : (
            reservedItems.map(item => (
              <div 
                key={item.id}
                onClick={() => onReserveItem(item)} // Re-trigger OTP view
                className="bg-brand-gold-light/40 border-2 border-brand-gold/30 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:bg-brand-gold-light/80 transition duration-150 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-brand-gold/20 bg-white shadow-inner">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">{item.name}</h4>
                    <p className="text-[10px] text-brand-purple font-mono font-bold">{item.lockerName} 인출대기</p>
                  </div>
                </div>
                <div className="bg-brand-purple text-brand-gold-light border border-brand-gold px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-xs">
                  <Lock className="w-3.5 h-3.5 fill-current text-brand-gold" />
                  OTP 코드 인출
                </div>
              </div>
            ))
          )}
        </div>

        {/* History completed Pickups */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-brand-gold-dark uppercase tracking-wider">안심 수령 완료 등기 히스토리</h3>
          {historicalItems.length === 0 ? (
            <div className="bg-white border border-brand-gold/15 rounded-xl p-6 text-center text-xs text-gray-400 font-sans">
              완료된 스마트 안심 인수 내역이 현재 없습니다.
            </div>
          ) : (
            historicalItems.map(item => (
              <div 
                key={item.id}
                className="bg-white border border-brand-gold/20 p-3.5 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-150 bg-gray-50 grayscale flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-700">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">위치: {item.location}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-brand-gold-dark bg-brand-gold-light border-2 border-brand-gold/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ClipboardCheck className="w-3 h-3 text-brand-gold-dark" />
                  인수 성공
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // INDIVIDUAL DETAILED VIEW (Matches Screenshot 4)
  return (
    <div className="flex-1 w-full p-4 pb-20 overflow-y-auto max-w-container-max mx-auto font-sans">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* Cover Photo - md:span-7 */}
        <div className="md:col-span-7">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md bg-gray-50 border-2 border-brand-gold">
            <img 
              src={selectedItem.imageUrl} 
              alt={selectedItem.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
            {selectedItem.verified && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 bg-brand-purple text-brand-gold text-xs font-bold px-3 py-1.5 rounded border border-brand-gold shadow-md">
                  <ShieldCheck className="w-4 h-4 fill-current text-brand-gold" />
                  OFFICIAL CAMPUS VERIFIED
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Details Panel - md:span-5 */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-md border-2 border-brand-gold/30 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-brand-gold"></div>
            
            {/* Header info */}
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-xs font-mono font-bold text-brand-gold-dark uppercase tracking-wider">
                {selectedItem.category}
              </span>
              <div className="flex justify-between items-center gap-2">
                <h1 className="text-xl font-display font-bold text-brand-purple leading-tight">{selectedItem.name}</h1>
                <button 
                  onClick={onClearSelection}
                  className="text-xs font-bold text-brand-gold-dark hover:text-brand-gold-dark bg-brand-gold-light border border-brand-gold/30 px-3 py-1.5 rounded-lg flex-shrink-0"
                >
                  뒤로가기
                </button>
              </div>
            </div>

            {/* List specifications */}
            <div className="space-y-3 mb-5">
              
              <div className="flex items-start gap-3 p-3 rounded-xl bg-brand-gold-light/40 border-2 border-brand-gold/20">
                <MapPin className="w-5 h-5 text-brand-gold-dark flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono font-bold text-brand-gold-dark uppercase">공식 안심보관 위치</p>
                  <p className="text-sm font-bold text-brand-purple">{selectedItem.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3">
                <FileText className="w-5 h-5 text-brand-gold-dark flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono font-bold text-brand-gold-dark uppercase">상세 특징 정의서</p>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">{selectedItem.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3">
                <Clock className="w-5 h-5 text-brand-gold-dark flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono font-bold text-brand-gold-dark uppercase">학적 정보 습득신고일시</p>
                  <p className="text-xs text-gray-500 leading-none mt-1">{selectedItem.reportedTime} 공식 귀속</p>
                </div>
              </div>

            </div>

            {/* CTA reserving button */}
            <div className="space-y-2">
              <button 
                onClick={() => onReserveItem(selectedItem)}
                className="w-full bg-gradient-to-r from-brand-purple to-brand-purple-dark text-brand-gold-light border-2 border-brand-gold font-display text-lg uppercase py-3.5 rounded-xl shadow-md hover:scale-[1.01] transition active:scale-98 flex items-center justify-center gap-2"
              >
                <KeyRound className="w-5 h-5 text-brand-gold" />
                안심 수령 예약증 발급
              </button>
              <p className="text-center text-[10px] font-bold text-brand-gold-dark font-mono">
                비대면 6지선 OTP인증 보안 수령
              </p>
            </div>

          </div>

          {/* Secure details info */}
          <div className="bg-brand-gold-light/20 p-4 rounded-xl border-2 border-brand-gold/30 flex items-center gap-3">
            <Info className="w-5 h-5 text-brand-gold-dark shrink-0" />
            <p className="text-slate-700 font-medium text-xs">
              학내 보안과 정직성 학우 수칙 준수를 위해 <strong>신뢰 포인트</strong>가 사용됩니다.
            </p>
          </div>
        </div>

      </div>

      {/* Bento Layout Grid for locker previews & details */}
      <section className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Locker Location Box */}
        <div className="bg-white p-4 rounded-xl border-2 border-brand-gold/25 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-brand-purple font-mono uppercase tracking-wider">Locker Hub Map</h3>
          
          <div className="w-full h-32 rounded-lg bg-gray-50 overflow-hidden relative border border-brand-gold/20">
            {/* Mock map render matching visual placeholder */}
            <svg viewBox="0 0 100 100" className="w-full h-full object-cover">
              <rect width="100" height="100" fill="#FCFAF5" />
              <path d="M 0,30 L 100,50 M 50,0 Q 40,50 60,100" stroke="#FAF1D8" strokeWidth="8" fill="none" />
              <circle cx="50" cy="45" r="30" fill="#c5a043" opacity="0.1" />
              <circle cx="50" cy="45" r="10" fill="#c5a043" opacity="0.2" />
              <circle cx="50" cy="45" r="4" fill="#8c6a1c" />
              <circle cx="50" cy="45" r="12" stroke="#8c6a1c" strokeWidth="1" strokeDasharray="3" fill="none" className="animate-spin-slow" />
            </svg>
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center p-2">
              <span className="font-mono text-[9px] bg-brand-purple/95 border border-brand-gold text-brand-gold px-2 py-0.5 rounded backdrop-blur-xs">
                {selectedItem.lockerName}
              </span>
            </div>
          </div>
          
          <p className="text-[10px] text-brand-gold-dark font-extrabold font-mono text-center">
            전주기 공학관 구역 지정 보관소
          </p>
        </div>

        {/* Safety Steps box */}
        <div className="md:col-span-2 bg-white p-4 rounded-xl border-2 border-brand-gold/25 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-brand-purple font-mono uppercase tracking-wider">Official Inspection Protocol</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
            
            <div className="p-3 bg-brand-gold-light/20 rounded-xl flex flex-col items-center justify-center text-center border border-brand-gold/10">
              <span className="w-7 h-7 rounded-full bg-brand-purple text-brand-gold flex items-center justify-center text-xs font-bold font-mono mb-1.5">1</span>
              <p className="text-xs font-bold text-brand-purple">대장 등기 예약</p>
              <p className="text-[9px] text-brand-gold-dark mt-0.5 font-bold">인계 포인트 수반</p>
            </div>

            <div className="p-3 bg-brand-gold-light/20 rounded-xl flex flex-col items-center justify-center text-center border border-brand-gold/10">
              <span className="w-7 h-7 rounded-full bg-brand-purple text-brand-gold flex items-center justify-center text-xs font-bold font-mono mb-1.5">2</span>
              <p className="text-xs font-bold text-brand-purple">안심 암호 수령</p>
              <p className="text-[9px] text-brand-gold-dark mt-0.5 font-bold">스마트 일회성 OTP</p>
            </div>

            <div className="p-3 bg-brand-gold-light/20 rounded-xl flex flex-col items-center justify-center text-center border border-brand-gold/10">
              <span className="w-7 h-7 rounded-full bg-brand-purple text-brand-gold flex items-center justify-center text-xs font-bold font-mono mb-1.5">3</span>
              <p className="text-xs font-bold text-brand-purple">보관 개방 완료</p>
              <p className="text-[9px] text-brand-gold-dark mt-0.5 font-bold">투명식 즉시 수령</p>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
