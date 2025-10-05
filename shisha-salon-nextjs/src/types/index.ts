// 予約関連の型定義
export interface Reservation {
  id?: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  seat_id: number;
  reservation_date: string;
  start_time: string;
  end_time: string;
  party_size: number;
  special_requests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  deposit_amount?: number;
  deposit_paid?: boolean;
}

// 予約フォームデータの型
export interface ReservationFormData {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  reservation_date: string;
  start_time: string;
  end_time: string;
  party_size: number;
  special_requests: string;
  seat_id: number;
}

// 席情報の型定義
export interface Seat {
  id: number;
  seat_number: string;
  seat_type: 'sofa' | 'counter';
  capacity: number;
  is_available: boolean;
  description?: string;
}

// 多言語翻訳の型定義
export interface Translations {
  nav: {
    home: string;
    about: string;
    menu: string;
    reservation: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    menuButton: string;
    contactButton: string;
    scrollDown: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
  };
  reservation: {
    title: string;
    subtitle: string;
    businessHours: string;
    hoursWeekday: string;
    hoursWeekend: string;
    hoursSunday: string;
    timeWeekday: string;
    timeWeekend: string;
    timeSunday: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    people: string;
    requests: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  contact: {
    title: string;
    subtitle: string;
    businessHours: string;
    businessHours1: string;
    businessHours2: string;
    closedDay: string;
    address: string;
    addressDetail: string;
    phone: string;
    phoneNumber: string;
    access: string;
    access1: string;
    access2: string;
    usage: string;
    seating: string;
    shareCharge: string;
    payment: string;
    reservation: string;
  };
  menu: {
    title: string;
    categories: {
      leaf: string;
      drink: string;
      alcohol: string;
      food: string;
    };
    notes: string[];
  };
}

// 言語型
export type Language = 'ja' | 'en';

// API レスポンスの型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
