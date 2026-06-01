/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lock, Timer, Camera, Check, ShieldAlert } from 'lucide-react';
import { LostItem } from '../types';

interface OTPModalProps {
  item: LostItem;
  onClose: () => void;
  onCompletePickup: (itemId: string) => void;
}

export function OTPModal({ item, onClose, onCompletePickup }: OTPModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(178); // 2 mins and 58 secs based on screenshot

  // active countdown interval
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // format clock helper
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // split the locker passcode (6 digit string)
  const code = item.lockerCode || '648621';
  const firstHalf = code.slice(0, 3).split('');
  const secondHalf = code.slice(3, 6).split('');

  const handleSuccessClick = () => {
    onCompletePickup(item.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      
      {/* Container Cards */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border-4 border-double border-brand-gold overflow-hidden flex flex-col items-center p-6 sm:p-8 gap-5 scale-100 animate-[fade-in_0.25s_ease-out]">
        
        {/* Lock ring */}
        <div className="w-16 h-16 rounded-full bg-brand-gold-light flex items-center justify-center mb-1 border-2 border-brand-gold hover:scale-105 transition shadow-sm">
          <Lock className="w-7 h-7 text-brand-gold-dark fill-current" />
        </div>

        {/* Headline details */}
        <div className="text-center space-y-1">
          <h3 className="text-xl font-display font-bold text-brand-purple">수령 승인 코드 발급</h3>
          <p className="text-xs font-semibold text-brand-gold-dark">학술안심 보관함 연동형 OTP 식별 번호입니다.</p>
        </div>

        {/* Dynamic OTP digits display */}
        <div className="w-full flex items-center justify-center gap-3 py-1">
          
          <div className="flex gap-1.5 items-center">
            {firstHalf.map((digit, idx) => (
              <div 
                key={idx}
                className="w-10 h-14 bg-brand-gold-light border-b-4 border-brand-gold rounded-xl flex items-center justify-center text-2xl font-mono font-bold text-brand-purple shadow-sm hover:translate-y-[-2px] transition border border-brand-gold/30"
              >
                {digit}
              </div>
            ))}
          </div>

          <div className="w-3.5 h-1 bg-brand-gold-dark rounded-full flex-shrink-0"></div>

          <div className="flex gap-1.5 items-center">
            {secondHalf.map((digit, idx) => (
              <div 
                key={idx}
                className="w-10 h-14 bg-brand-gold-light border-b-4 border-brand-gold rounded-xl flex items-center justify-center text-2xl font-mono font-bold text-brand-purple shadow-sm hover:translate-y-[-2px] transition border border-brand-gold/30"
              >
                {digit}
              </div>
            ))}
          </div>

        </div>

        {/* Countdown Ticker */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-50 text-red-700 rounded-full animate-pulse border border-red-200 shadow-xs">
          <Timer className="w-4 h-4 text-red-600 animate-spin-slow" />
          <span className="text-xs font-mono font-extrabold">{formatTime(secondsLeft)}</span>
        </div>

        {/* Instructive caution text */}
        <div className="w-full space-y-2">
          <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-brand-gold/25 flex flex-col gap-2 shadow-inner">
            <p className="text-xs text-slate-700 text-center font-medium leading-relaxed">
              해당 <strong className="text-brand-purple">[{item.lockerName}]</strong> 사물함 투시형 터치패널에<br />상기 보안 암호를 입력하고 물품을 수령하십시오.
            </p>
            
            <div className="flex items-center justify-center gap-1 text-red-600 font-bold text-[10px] bg-red-100/30 py-1.5 px-2.5 rounded-lg border border-red-200/20">
              <Camera className="w-4 h-4 shrink-0 text-red-600 animate-pulse" />
              <span>신원 보호 및 정직성 기증 보존을 위해 무인 영상 녹화가 수반됩니다.</span>
            </div>
          </div>
        </div>

        {/* Finish Pickup triggers Rewards verification screen */}
        <div className="w-full flex gap-2.5">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition active:scale-95 border border-slate-200"
          >
            취소
          </button>
          
          <button 
            type="button"
            onClick={handleSuccessClick}
            className="flex-3 bg-brand-purple text-brand-gold-light border-2 border-brand-gold font-display text-base uppercase py-3 rounded-xl hover:bg-brand-purple-dark shadow-md transition active:scale-95 flex items-center justify-center gap-1"
          >
            <Check className="w-5 h-5 stroke-[2.5] text-brand-gold" />
            수령 확인 완료
          </button>
        </div>

      </div>

    </div>
  );
}
