/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle, Award, Sparkles, Coins, Wallet, Landmark, ArrowRight, ShieldAlert, BadgeCheck, Check, QrCode } from 'lucide-react';
import { PartnerCoupon, UserStats } from '../types';

interface RewardsViewProps {
  stats: UserStats;
  coupons: PartnerCoupon[];
  showCelebration: boolean;
  onClaimReward: () => void;
  onPurchaseCoupon: (couponId: string) => void;
}

export function RewardsView({ stats, coupons, showCelebration, onClaimReward, onPurchaseCoupon }: RewardsViewProps) {
  const [selectedCoupon, setSelectedCoupon] = useState<PartnerCoupon | null>(null);
  const [purchasedBarcode, setPurchasedBarcode] = useState<string | null>(null);
  const [insufficientPointsError, setInsufficientPointsError] = useState<string | null>(null);

  const handlePurchaseAttempt = (coupon: PartnerCoupon) => {
    if (stats.points < coupon.points) {
      setInsufficientPointsError(
        `보유하신 신뢰 포인트가 부족합니다. (현재: ${stats.points} pts / 필요: ${coupon.points} pts)`
      );
      return;
    }
    setSelectedCoupon(coupon);
  };

  const handleConfirmPurchase = () => {
    if (!selectedCoupon) return;
    onPurchaseCoupon(selectedCoupon.id);
    
    // Generate an authentic premium barcode payload 
    const randomBarcodeNum = Math.floor(1000000000000 + Math.random() * 9000000000000);
    setPurchasedBarcode(String(randomBarcodeNum));
    setSelectedCoupon(null);
  };

  return (
    <div className="flex-1 w-full p-4 pb-24 overflow-y-auto max-w-lg mx-auto font-sans space-y-6">

      {/* SUCCESS CELEBRATION HERO SECTION - ACADEMIC STYLE */}
      {showCelebration ? (
        <section className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border-2 border-brand-gold shadow-lg animate-[fade-in_0.3s_ease-out] relative overflow-hidden">
          {/* Subtle gold crest background watermark */}
          <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center, rgba(140, 106, 28, 0.03)_0%, transparent_70%) pointer-events-none"></div>
          
          {/* Circular layered badge */}
          <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-gold/10 rounded-full animate-ping"></div>
            <div className="absolute inset-2 bg-brand-gold-light rounded-full"></div>
            <div className="relative bg-brand-purple text-brand-gold p-5 rounded-full shadow-md border-2 border-brand-gold">
              <CheckCircle className="w-14 h-14 text-brand-gold stroke-[2.5]" />
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold text-brand-purple italic">인수 완료 증서</h2>
          <p className="text-xs font-bold text-brand-gold-dark mt-1">캠퍼스 공인 인계 규정에 준거하여 성공적으로 수령이 완료되었습니다.</p>

          {/* Reward Points Box */}
          <div className="mt-5 w-full bg-gradient-to-r from-brand-purple to-brand-purple-dark text-brand-gold-light rounded-xl p-4 shadow-md flex justify-between items-center overflow-hidden relative group border border-brand-gold/50">
            <div className="absolute -right-4 -top-4 opacity-15 rotate-12 transition group-hover:scale-110">
              <Sparkles className="w-24 h-24 text-brand-gold" />
            </div>
            
            <div className="text-left space-y-1 relative z-10">
              <p className="text-[10px] font-mono font-extrabold text-brand-gold uppercase tracking-wider">신뢰 공헌 리워드</p>
              <h3 className="text-sm font-bold font-display uppercase leading-tight">+100 pts 공식 지급</h3>
            </div>

            <button 
              onClick={onClaimReward}
              className="relative z-10 bg-brand-gold text-brand-purple-dark font-display font-bold text-xs py-2 px-3.5 rounded border border-brand-gold-light active:scale-95 transition"
            >
              포인트 수취
            </button>
          </div>

        </section>
      ) : null}

      {/* WALLET BALANCE CARD */}
      <div className="bg-white border-2 border-brand-gold/30 rounded-2xl p-4 shadow-sm flex items-center justify-between relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold"></div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-gold-light text-brand-gold-dark rounded-xl border border-brand-gold/20">
            <Wallet className="w-5 h-5 text-brand-gold-dark" />
          </div>
          <div>
            <p className="text-[9px] font-mono font-bold text-brand-gold-dark uppercase leading-none">TRUST CREDIT BALANCE</p>
            <h3 className="text-sm font-display font-bold text-brand-purple mt-1.5">한양 ERICA 신뢰 학점</h3>
          </div>
        </div>
        <span className="text-lg font-mono font-extrabold text-brand-purple">
          {stats.points.toLocaleString()} pts
        </span>
      </div>

      {/* PARTNER COUPOU EXCHANGE LISTS */}
      <section className="space-y-4">
        
        <div className="flex justify-between items-center">
          <h3 className="text-base font-display font-bold text-brand-purple">복지 물품 교환소</h3>
          <span className="text-[10px] font-mono font-extrabold text-brand-gold-dark">
             협약 입점 복지 혜택
          </span>
        </div>

        {/* Bento grid coupons list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coupons.map((coupon) => (
            <div 
              key={coupon.id}
              onClick={() => handlePurchaseAttempt(coupon)}
              className="bg-white rounded-xl border-2 border-brand-gold/15 overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col relative"
            >
              {/* Fine gold hover top-bar */}
              <div className="h-[2px] w-full bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

              <div className="relative h-36 bg-gray-50 overflow-hidden border-b border-brand-gold/10">
                <img 
                  src={coupon.imageUrl} 
                  alt={coupon.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                
                {/* Category tag */}
                <div className="absolute top-2.5 left-2.5 bg-brand-purple/95 text-brand-gold border border-brand-gold font-mono text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs uppercase">
                  {coupon.category}
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1.5 bg-white">
                <div className="flex justify-between items-start gap-1">
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-brand-purple transition-colors">{coupon.name}</h4>
                  <span className="text-xs font-mono font-bold text-brand-purple whitespace-nowrap bg-brand-gold-light border border-brand-gold/20 px-1.5 py-0.5 rounded">
                    {coupon.points} pts
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium line-clamp-1 leading-snug">
                  {coupon.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* OFFICIAL VERIFICATION ACCREDITATION BANNER */}
      <section className="bg-white border-2 border-brand-gold/25 rounded-2xl p-4 flex gap-3 relative overflow-hidden">
        <div className="w-10 h-10 rounded-full bg-brand-gold-light flex items-center justify-center text-brand-gold-dark shrink-0 border border-brand-gold/30">
          <BadgeCheck className="w-5 h-5 text-brand-gold-dark" strokeWidth={2.5} />
        </div>
        <div>
          <h4 className="text-xs font-display font-bold text-brand-purple">ERICA SMART HUB 공식 학위 기관 검증 채널</h4>
          <p className="text-[10px] text-brand-gold-dark font-medium leading-relaxed mt-0.5">
            지출되는 교환증은 한양대학교 대외협력처 및 ERICA 스마트 자원 협의체의 공인 제휴처에서 완전한 실물 가치가 상호 보증됩니다.
          </p>
        </div>
      </section>

      {/* COOPERATION PURCHASE DECORATIVE DIALOG */}
      {selectedCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 border-4 border-double border-brand-gold shadow-2xl max-w-xs w-full text-center space-y-4 scale-100 animate-[fade-in_0.2s_ease-out]">
            <Award className="w-12 h-12 text-brand-gold mx-auto animate-bounce" />
            
            <div className="space-y-1.5">
              <h4 className="text-base font-display font-bold text-brand-purple">교내 자산 교환 품의서</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                캠퍼스 파트너 <strong className="text-brand-purple">[{selectedCoupon.name}]</strong> 교환을 확인하시겠습니까? ({selectedCoupon.points} pts 신뢰 원장 차감)
              </p>
            </div>

            <div className="flex gap-2 pt-1 font-mono">
              <button 
                onClick={() => setSelectedCoupon(null)}
                className="flex-1 py-2 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200"
              >
                취소
              </button>
              <button 
                onClick={handleConfirmPurchase}
                className="flex-1 py-2 text-xs font-bold text-brand-gold-light bg-brand-purple hover:bg-brand-purple-dark rounded-lg border border-brand-gold flex items-center justify-center gap-1"
              >
                교환 정식승인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSUFFICIENT POINTS WARNING MODAL (REPLACES BROWSER ALERT) */}
      {insufficientPointsError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 border-4 border-double border-brand-gold shadow-2xl max-w-xs w-full text-center space-y-4 scale-100 animate-[fade-in_0.2s_ease-out]">
            <ShieldAlert className="w-12 h-12 text-[#9A2525] mx-auto animate-pulse" />
            
            <div className="space-y-1.5">
              <h4 className="text-base font-display font-bold text-[#9A2525]">학적 신뢰 학점 부족</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {insufficientPointsError}
              </p>
            </div>

            <button 
              onClick={() => setInsufficientPointsError(null)}
              className="w-full py-2.5 text-xs font-bold text-[#9A2525] bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition"
            >
              확인 / 원장으로 돌아가기
            </button>
          </div>
        </div>
      )}

      {/* BARCODE SUCCESS VISUAL DIALOG - STYLED AS OFFICIAL CERTIFICATE */}
      {purchasedBarcode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 border-4 border-double border-brand-gold shadow-2xl max-w-xs w-full text-center space-y-5 scale-100 animate-[fade-in_0.25s_ease-out] relative">
            
            <div className="absolute top-2 right-2 flex items-center justify-center">
              <span className="text-[10px] bg-brand-gold-light font-mono font-bold text-brand-gold-dark px-2 py-0.5 rounded border border-brand-gold/20">ERICA HUB</span>
            </div>

            <QrCode className="w-12 h-12 text-brand-gold-dark mx-auto animate-pulse" />
            
            <div className="space-y-1.5">
              <h4 className="text-md font-display font-bold text-brand-purple">공인 교환 원장 인증증식</h4>
              <p className="text-[10px] text-brand-gold-dark font-medium">캠퍼스 소속 매장에서 상기 증서를 바코드 수칙에 따라 즉각 제안하십시오.</p>
            </div>

            {/* Simulated mock barcode rendering */}
            <div className="bg-[#FAF8F3] py-4 px-3 rounded-2xl border border-brand-gold/30 space-y-2 flex flex-col items-center">
              {/* Barcode bars block */}
              <div className="h-10 w-full flex items-center justify-center gap-0.5 px-3">
                {[...Array(24)].map((_, idx) => {
                  const r = Math.random() > 0.45;
                  return (
                    <div 
                      key={idx} 
                      className={`h-full ${r ? 'w-[3px] bg-gray-800' : 'w-[1px] bg-transparent'}`} 
                    />
                  );
                })}
              </div>
              <p className="font-mono text-sm font-bold text-brand-purple leading-none">{purchasedBarcode}</p>
            </div>

            <button 
              onClick={() => setPurchasedBarcode(null)}
              className="w-full py-2.5 text-xs font-bold text-[#FAF8F3] bg-brand-purple hover:bg-brand-purple-dark rounded-xl border border-brand-gold transition shadow-md"
            >
              사용 정밀 확인 / 창 닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
