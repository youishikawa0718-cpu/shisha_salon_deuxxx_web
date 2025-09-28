import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ja'); // デフォルトは日本語

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ja' ? 'en' : 'ja');
  };

  const translations = {
    ja: {
      nav: {
        home: 'Home',
        about: 'About',
        menu: 'Menu',
        reservation: 'Reservation',
        contact: 'Contact'
      },
      hero: {
        title: 'Shisha Salon Deuxxx',
        subtitle: '那珂川沿いリバーサイドで楽しむ プレミアムシーシャ体験',
        description: '最高品質のシーシャと心地よい空間で、特別なひとときをお過ごしください。',
        menuButton: 'メニューを見る',
        contactButton: 'お問い合わせ',
        scrollDown: 'Scroll Down'
      },
      about: {
        title: 'About Deuxxx',
        description1: '福岡市中央区春吉に位置するShisha Salon Deuxxx（シーシャサロン デュクシ）は、那珂川沿いのリバーサイドにあるシーシャ専門店です。',
        description2: 'ホテル・ザ・博多テラスの2階にあり、天井が高く開放感のある空間で、那珂川とキャナルシティの景色を楽しみながらリラックスできます。シーシャは濃い煙感と、一流のシーシャパッカーによる丁寧なセッティングで、初心者から上級者まで満足いただける品質を提供しています。',
        feature1Title: 'リバーサイドビュー',
        feature1Description: '那珂川とキャナルシティの景色を楽しみながら',
        feature2Title: '快適な設備',
        feature2Description: '無料Wi-Fi、電源完備、バリアフリー対応'
      },
      reservation: {
        title: 'ご予約',
        subtitle: 'お気軽にご予約ください。最高のシーシャ体験をご提供いたします。',
        businessHours: '営業時間',
        hoursWeekday: '月曜〜木曜：',
        hoursWeekend: '金曜・土曜・祝前日：',
        hoursSunday: '日曜・祝日：',
        timeWeekday: '12:00 〜 27:00（翌朝3:00）',
        timeWeekend: '12:00 〜 29:00（翌朝5:00）',
        timeSunday: '12:00 〜 27:00（翌朝3:00）',
        name: 'お名前',
        phone: '電話番号',
        email: 'メールアドレス',
        date: '予約日',
        time: '時間',
        people: '人数',
        requests: '特別なご要望',
        submit: '予約する',
        submitting: '送信中...',
        success: 'ご予約ありがとうございます！確認のお電話をさせていただきます。',
        error: '予約に失敗しました。もう一度お試しください。'
      },
      contact: {
        title: 'Contact',
        subtitle: 'お問い合わせ',
        businessHours: '営業時間',
        businessHours1: '月〜木・日: 12:00〜翌3:00（L.O. 2:00）',
        businessHours2: '金・土・祝前日: 12:00〜翌5:00（L.O. 4:00）',
        closedDay: '定休日: なし',
        address: '住所',
        addressDetail: '〒810-0003 福岡県福岡市中央区春吉2-4-14 ホテル・ザ・博多テラス 2F-E',
        phone: '電話番号',
        phoneNumber: '050-3186-4609',
        access: 'アクセス',
        access1: '天神南駅から徒歩約10分',
        access2: '渡辺通駅から徒歩約7分',
        usage: 'ご利用について',
        seating: '席数: 24席（ソファ席20席、カウンター席4席）',
        shareCharge: 'シェアチャージ: 800円/1人（テーブルチャージ等はなし）',
        payment: '支払い: クレジットカード可（VISA、Master、JCB、AMEX、Diners）',
        reservation: '食べログやhotpepperからネット予約も可能です'
      },
      menu: {
        title: 'Menu',
        categories: {
          leaf: 'シーシャ葉の種類',
          drink: 'ソフトドリンク',
          alcohol: 'アルコール',
          food: 'フード'
        },
        notes: [
          '※シェアチャージ: 800円/1人',
          '※ワンドリンクオーダー別途: 600円〜',
          '※お好みの味や煙感に応じてカスタマイズ可能'
        ]
      },
      footer: {
        businessHours: '営業時間',
        businessHours1: '月〜木・日: 12:00〜翌3:00',
        businessHours2: '金・土・祝前日: 12:00〜翌5:00',
        contact: 'お問い合わせ',
        access: 'アクセス',
        accessDetail1: '天神南駅徒歩約10分',
        accessDetail2: 'ホテル・ザ・博多テラス 2F-E',
        officialSite: '公式サイト',
        rightsReserved: 'All rights reserved.'
      },
      photoExperience: {
        shisha: {
          title: 'Shisha',
          description1: '厳選されたフレーバーと最高品質のシーシャ葉で、深く満足感のあるシーシャ体験をお楽しみください。',
          description2: 'Al Fakher、DOZAj、Azure、Afzal、Darkside、Boncheなど、世界中から取り寄せたフレーバーをご用意しております。'
        },
        drinks: {
          title: 'Drinks',
          description1: 'フレッシュジュースから本格的なノンアルコールカクテル、プレミアムシャンパンまで豊富なドリンクメニューをご用意。',
          description2: 'シーシャとの相性を考え抜いたドリンクで、より深い味わいの体験をお届けします。'
        },
        day: {
          title: 'Day',
          description1: '那珂川とキャナルシティを望むリバーサイドビューと、洗練されたインテリアが作り出す上質な空間。',
          description2: '昼は自然光に満ちた開放的な雰囲気、夜は幻想的な照明に包まれたラウンジタイムをお楽しみください。'
        },
        night: {
          title: 'Night',
          description1: '夜は幻想的なライティングと贅沢な雰囲気で、特別なひとときをお過ごしください。',
          description2: 'プレミアムドリンクとシーシャの組み合わせで、深夜まで続くリラックスタイムを。'
        }
      }
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        menu: 'Menu',
        reservation: 'Reservation',
        contact: 'Contact'
      },
      hero: {
        title: 'Shisha Salon Deuxxx',
        subtitle: 'Premium Shisha Experience by the Riverside',
        description: 'Enjoy a special moment with the highest quality shisha in a comfortable space.',
        menuButton: 'View Menu',
        contactButton: 'Contact Us',
        scrollDown: 'Scroll Down'
      },
      about: {
        title: 'About Deuxxx',
        description1: 'Shisha Salon Deuxxx is a shisha specialty store located riverside along the Naka River in Haruyoshi, Chuo Ward, Fukuoka City.',
        description2: 'Located on the 2nd floor of Hotel The Hakata Terrace, you can relax while enjoying the view of the Naka River and Canal City in a spacious environment with high ceilings. Our shisha offers thick smoke and careful setup by first-class shisha packers, providing quality that satisfies everyone from beginners to advanced users.',
        feature1Title: 'Riverside View',
        feature1Description: 'Enjoy the view of Naka River and Canal City',
        feature2Title: 'Comfortable Facilities',
        feature2Description: 'Free Wi-Fi, power outlets, barrier-free access'
      },
      reservation: {
        title: 'Reservation',
        subtitle: 'Please feel free to make a reservation. We will provide you with the best shisha experience.',
        businessHours: 'Business Hours',
        hoursWeekday: 'Mon-Thu:',
        hoursWeekend: 'Fri-Sat & Before holidays:',
        hoursSunday: 'Sun & Holidays:',
        timeWeekday: '12:00 - 3:00am',
        timeWeekend: '12:00 - 5:00am',
        timeSunday: '12:00 - 3:00am',
        name: 'Name',
        phone: 'Phone Number',
        email: 'Email Address',
        date: 'Reservation Date',
        time: 'Time',
        people: 'Number of People',
        requests: 'Special Requests',
        submit: 'Make Reservation',
        submitting: 'Submitting...',
        success: 'Thank you for your reservation! We will call you for confirmation.',
        error: 'Reservation failed. Please try again.'
      },
      contact: {
        title: 'Contact',
        subtitle: 'Get in Touch',
        businessHours: 'Business Hours',
        businessHours1: 'Mon-Thu & Sun: 12:00-3:00am (L.O. 2:00am)',
        businessHours2: 'Fri-Sat & Before holidays: 12:00-5:00am (L.O. 4:00am)',
        closedDay: 'Closed: None',
        address: 'Address',
        addressDetail: '〒810-0003 2F-E Hotel The Hakata Terrace, 2-4-14 Haruyoshi, Chuo-ku, Fukuoka',
        phone: 'Phone',
        phoneNumber: '050-3186-4609',
        access: 'Access',
        access1: 'About 10 minutes walk from Tenjin-minami Station',
        access2: 'About 7 minutes walk from Watanabedori Station',
        usage: 'Usage Information',
        seating: 'Seating: 24 seats (20 sofa seats, 4 counter seats)',
        shareCharge: 'Share charge: ¥800 per person (No table charge)',
        payment: 'Payment: Credit cards accepted (VISA, Master, JCB, AMEX, Diners)',
        reservation: 'Online reservations available through Tabelog and Hotpepper'
      },
      menu: {
        title: 'Menu',
        categories: {
          leaf: 'Shisha Leaf Types',
          drink: 'Soft Drinks',
          alcohol: 'Alcohol',
          food: 'Food'
        },
        notes: [
          '※Share charge: ¥800 per person',
          '※One drink order required: ¥600~',
          '※Customizable according to your taste and smoke preference'
        ]
      },
      footer: {
        businessHours: 'Business Hours',
        businessHours1: 'Mon-Thu & Sun: 12:00-3:00am',
        businessHours2: 'Fri-Sat & Before holidays: 12:00-5:00am',
        contact: 'Contact',
        access: 'Access',
        accessDetail1: 'About 10 minutes walk from Tenjin-minami Station',
        accessDetail2: 'Hotel The Hakata Terrace 2F-E',
        officialSite: 'Official Site',
        rightsReserved: 'All rights reserved.'
      },
      photoExperience: {
        shisha: {
          title: 'Shisha',
          description1: 'Enjoy a deeply satisfying shisha experience with carefully selected flavors and the highest quality shisha leaves.',
          description2: 'We offer flavors from around the world including Al Fakher, DOZAj, Azure, Afzal, Darkside, and Bonche.'
        },
        drinks: {
          title: 'Drinks',
          description1: 'We offer a rich drink menu from fresh juices to authentic non-alcoholic cocktails and premium champagne.',
          description2: 'Experience deeper flavors with drinks carefully crafted to complement shisha.'
        },
        day: {
          title: 'Day',
          description1: 'A refined space created by riverside views overlooking the Naka River and Canal City, combined with sophisticated interior design.',
          description2: 'Enjoy an open atmosphere filled with natural light during the day, and fantastical lighting-wrapped lounge time at night.'
        },
        night: {
          title: 'Night',
          description1: 'Spend special moments at night with fantastical lighting and luxurious atmosphere.',
          description2: 'Enjoy relaxation time that continues until late night with premium drinks and shisha combinations.'
        }
      }
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};