/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { MapView } from './components/MapView';
import { SearchView } from './components/SearchView';
import { RecordsView } from './components/RecordsView';
import { RewardsView } from './components/RewardsView';
import { OTPModal } from './components/OTPModal';
import { ReportLostForm } from './components/ReportLostForm';
import { LostItem, PartnerCoupon, UserStats } from './types';
import { INITIAL_LOST_ITEMS, INITIAL_PARTNER_COUPONS } from './mockData';

export default function App() {
  // Tab Routing
  const [currentTab, setCurrentTab] = useState<'map' | 'search' | 'records' | 'rewards'>('map');

  // Core App states
  const [items, setItems] = useState<LostItem[]>(() => {
    const saved = localStorage.getItem('linklocker_items');
    return saved ? JSON.parse(saved) : INITIAL_LOST_ITEMS;
  });

  const [coupons, setCoupons] = useState<PartnerCoupon[]>(() => {
    const saved = localStorage.getItem('linklocker_coupons');
    return saved ? JSON.parse(saved) : INITIAL_PARTNER_COUPONS;
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('linklocker_stats');
    return saved ? JSON.parse(saved) : { points: 1250, completedPickups: 0 };
  });

  // Modal Overlay controls
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
  const [activeOTPItem, setActiveOTPItem] = useState<LostItem | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('linklocker_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('linklocker_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('linklocker_stats', JSON.stringify(stats));
  }, [stats]);

  // Navigate to target view while caching selected item details
  const handleSelectItem = (item: LostItem) => {
    setSelectedItem(item);
    setCurrentTab('records');
  };

  const handleClearSelection = () => {
    setSelectedItem(null);
  };

  // Add dynamically reported items from form
  const handleAddNewItem = (newItem: Omit<LostItem, 'id' | 'reportedTime' | 'status' | 'lockerCode'>) => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    const createdItem: LostItem = {
      ...newItem,
      id: `item-${Date.now()}`,
      reportedTime: '방금 전',
      status: 'available',
      lockerCode: randomCode
    };

    setItems(prev => [createdItem, ...prev]);
    // Highlight the newly created item on the maps view by opening the details panel directly
    setSelectedItem(createdItem);
    setCurrentTab('records');
  };

  // Triggers secure OTP Modal
  const handleReserveItem = (item: LostItem) => {
    // Transition items to reserved status
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'reserved' } : i));
    setActiveOTPItem(item);
  };

  // Action executed on closing verification OTP
  const handleCompletePickup = (itemId: string) => {
    // Change item status to completed so it enters History Logs
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, status: 'completed' } : i));
    
    // Reset modal triggers
    setActiveOTPItem(null);
    setSelectedItem(null);
    
    // Open completed Celebration screen on Rewards tab
    setShowCelebration(true);
    setCurrentTab('rewards');
  };

  // Increment point balance by 100 as per Screenshot 1
  const handleClaimReward = () => {
    setStats(prev => ({
      points: prev.points + 100,
      completedPickups: prev.completedPickups + 1
    }));
    setShowCelebration(false);
  };

  // Spend coupon points to purchase partner reward cards
  const handlePurchaseCoupon = (couponId: string) => {
    const coupon = coupons.find(c => c.id === couponId);
    if (!coupon) return;

    setStats(prev => ({
      ...prev,
      points: prev.points - coupon.points
    }));
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col overflow-x-hidden pb-16 font-sans">
      
      {/* Universal Head Header */}
      <Header points={stats.points} onNavigate={setCurrentTab} />

      {/* Main Container Workspace */}
      <main className="flex-1 flex flex-col relative w-full h-[calc(100vh-120px)]">
        {currentTab === 'map' && (
          <MapView 
            items={items} 
            onSelectItem={handleSelectItem} 
            onOpenReportForm={() => setShowReportForm(true)} 
          />
        )}

        {currentTab === 'search' && (
          <SearchView 
            items={items} 
            onSelectItem={handleSelectItem} 
          />
        )}

        {currentTab === 'records' && (
          <RecordsView 
            selectedItem={selectedItem} 
            items={items}
            onReserveItem={handleReserveItem} 
            onClearSelection={handleClearSelection}
          />
        )}

        {currentTab === 'rewards' && (
          <RewardsView 
            stats={stats} 
            coupons={coupons} 
            showCelebration={showCelebration}
            onClaimReward={handleClaimReward}
            onPurchaseCoupon={handlePurchaseCoupon}
          />
        )}
      </main>

      {/* Sticky Bottom Tab Bar Navigation */}
      <Navbar currentTab={currentTab} onNavigate={(tab) => {
        // Clear item selections when leaving or arriving back to records to prevent locking the screen
        if (tab !== 'records') {
          handleClearSelection();
        }
        setCurrentTab(tab);
      }} />

      {/* OVERLAY SYSTEM MONITORS */}
      {/* 1. Report Lost Form Overlay Modal */}
      {showReportForm && (
        <ReportLostForm 
          onClose={() => setShowReportForm(false)} 
          onAdd={handleAddNewItem} 
        />
      )}

      {/* 2. Secure OTP Modal Pin Code Modal */}
      {activeOTPItem && (
        <OTPModal 
          item={activeOTPItem} 
          onClose={() => setActiveOTPItem(null)} 
          onCompletePickup={handleCompletePickup} 
        />
      )}

    </div>
  );
}
