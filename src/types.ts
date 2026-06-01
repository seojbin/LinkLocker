/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LostItem {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  reportedTime: string;
  points: number;
  imageUrl: string;
  status: 'available' | 'reserved' | 'completed';
  verified: boolean;
  lat: number;
  lng: number;
  lockerName: string;
  lockerCode: string;
}

export interface PartnerCoupon {
  id: string;
  name: string;
  category: 'Beverage' | 'Service' | 'Store';
  points: number;
  description: string;
  imageUrl: string;
  purchased?: boolean;
  barcode?: string;
}

export interface UserStats {
  points: number;
  completedPickups: number;
}
