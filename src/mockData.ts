import { LostItem, PartnerCoupon } from './types';

export const INITIAL_LOST_ITEMS: LostItem[] = [
  {
    id: 'airpods-pro',
    name: 'AirPods Pro',
    category: 'Electronics',
    location: '중앙도서관 2층 휴게실',
    description: '3층 스터디 테이블 위에 흰색 스킨 케이스가 씌워진 채로 남겨져 있었습니다.',
    reportedTime: '10분 전',
    points: 10,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwoVeZlwdSkScIfajp9t9-V851HVyLlvvYcAi8NzMdz0_INgsApy6AGxHGumYr6x0yJPUL36KH4sK2JyFrGHiF7EmuhKaBZ8TbszoV9pXBxUeB7TQ1RP48pLwYXLUniXNM_xZ0mjYF3yN_LfA-DWijbZCmfM3yi8Zov-Ft-D3oK_M-Mk874Swdz_SWgFZyY050ECPxMoIdpVWynidVkwlNfSWZ2Gw__eWKxBfbhqHe2Omk6EiHnB9L9WfSVa5guY6a_mRava3MOzw',
    status: 'available',
    verified: true,
    lat: 38, // percentages or coordinates
    lng: 40,
    lockerName: 'Locker A',
    lockerCode: '648621'
  },
  {
    id: 'black-leather-wallet',
    name: 'Black Leather Wallet',
    category: 'Wallet',
    location: '학생회관 식당 출구',
    description: '식당 근처 식기반납대 테이블 옆 바닥에 떨어져 있었습니다. 내부 신분증 이름: 김*빈.',
    reportedTime: '32분 전',
    points: 10,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmkVWcSKLFKptnLOSB-o-305RjWqjODG8JGmkD_6IGWKTclaXaCQ5GAwfGkSriXkpm2SMtbYBAzv8lPGVaqmzKqA5X7J1mVf5F3FJj6tFbcjWHkNRJwdEotpODqWBteCxL6Jl4jTGqs_t8QNk7p3YN_5xlg25yMhYdPWR5e9USSQ-tZM2LkLmcKQnURt4IMm6MJdmJb_LtJL9dTkdDafZH8LRDcLgSMzLWDFADbBr2a_CDsL8GBd--PmlBd9cwrL0KudWoc2qsolo',
    status: 'available',
    verified: true,
    lat: 55,
    lng: 60,
    lockerName: 'Locker B',
    lockerCode: '298174'
  },
  {
    id: 'house-keys',
    name: '현관 열쇠 꾸러미',
    category: 'Keys',
    location: '체육관 앞 벤치',
    description: '은색 링 키체인에 달린 현관 마스터 키 꾸러미입니다. 열쇠 3개가 달려 있습니다.',
    reportedTime: '1시간 전',
    points: 10,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApVUgDw2p5DOnbxPVm_Pbl5mk-aSQASmr0qZN-99DSFIu_FVkrzWJGSAXZjsgu_lXXAFbebyazjWweBRspKz7ya4h4XsXE3LFp2LPXrQ-3BpnZtJ-oVW-5PyT3e8IRqLyJEGKJA5nXuSn6Ke9brG1M9mI9ImdkgaxHulcdpyzWtorFbXykLkk5HYX2Aw7qZ1catES3nc4Qr41dojF-K3GL9qhhCmP92lqC3UiNiXF0xhSGjhafdcyHWCAr6pszZ63TebDdoIFm4gg',
    status: 'available',
    verified: true,
    lat: 70,
    lng: 35,
    lockerName: 'Locker A',
    lockerCode: '883912'
  }
];

export const INITIAL_PARTNER_COUPONS: PartnerCoupon[] = [
  {
    id: 'campus-americano',
    name: '캠퍼스 카페 아메리카노',
    category: 'Beverage',
    points: 500,
    description: '교내 전 매장 (학생회관점, 도서관점, 제1공학관점) 사용 가능',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnht511lg7Q9-1AJD4gJJ-gj-bIn5unfcQIDNPyB2qO9wBfkYtqVS4JciLAUMlqtHHKG7eOY-mBy8gfsQOdojYBBcPfbcar3ASbxU9cLgRSVQ1kq93gMQNGR1yy-jZBXLxuNSefwact0JgGp3QEPySi60dPORRvEPgMAPBCgZlZv53rqcQmEOWmLS4Q36D5gSkEuUdZdPQpd16MOYjdOLaZ5dUPzUsmi2VYT0-wsSnSdW4bqvTc-cOZuJjrAiVpTBK8pdUjSKKG_M'
  },
  {
    id: 'print-pass',
    name: '프린트 스테이션 10매권',
    category: 'Service',
    points: 200,
    description: '교내 무인 프린트기 흑백/컬러 공용 사용 가능 쿠폰',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu7dh-9wGBTcVPWzKTT-ClU7ZDR1c-TvAnjjxfbef6wz65z_kiunXYlIR0qw1COG2kxtUxRWDZtb3RgTVKhI8ta6lNOtggIUuOSt5QY071-1imxRYBYrJSBQuFefvGn9OKlT01y0MXRVpsub6iQSl2wwK-9wbs7gWR6SUAINn6V2zsqmhtpBBkWKLT3EASRSZXwBZKHg5SKEe4MBqtwPIk4fyh_qDA_Sr7KIgRW0Jb4c5iFMGXmDTLrwiypxFAAIDD66S9jbGUfWk'
  },
  {
    id: 'cu-voucher',
    name: 'CU 편의점 2,000원권',
    category: 'Store',
    points: 1000,
    description: '전국 CU 편의점 매장 사용 가능 모바일 권',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaLXJI9p0gPNJUH1dvDXd_FW7J5rYPlRK_16GataNZVilCiZm0BwiLD5o984nF3iNM1QNlzQNInhkaGBNptQSFXNKdCqORIFde9rEi21xAQ7nif-MVdLaQxTmNXLCWynI1Mtxtl0UftGpLUcyTcmIfMdolEjCMidbaQc63wVperQeVzmxrEYlIBq8ZBvmUCvpQiemiO1JcPR0FfDY2PwlmJo9lQN0bCBLUM_FlVdV8waCtEbyjkW0_1pw4KOZ3TRmdeoj6zQjNFKA'
  }
];
