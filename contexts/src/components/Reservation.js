import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import './Reservation.css';

const Reservation = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    reservation_date: '',
    start_time: '',
    end_time: '',
    party_size: 1,
    special_requests: '',
    seat_id: ''
  });

  const [seats, setSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // 席情報を取得
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/seats');
        if (response.ok) {
          const seatsData = await response.json();
          setSeats(seatsData);
        }
      } catch (error) {
        console.error('席情報の取得に失敗しました:', error);
      }
    };

    fetchSeats();
  }, []);

  // 利用可能な席を取得
  const fetchAvailableSeats = async (date, startTime, endTime) => {
    if (!date || !startTime || !endTime) {
      setAvailableSeats([]);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/seats/available?date=${date}&start_time=${startTime}&end_time=${endTime}`
      );
      if (response.ok) {
        const availableSeatsData = await response.json();
        setAvailableSeats(availableSeatsData);
      }
    } catch (error) {
      console.error('利用可能席の取得に失敗しました:', error);
      setAvailableSeats([]);
    }
  };

  // 祝日リスト（簡易版）
  const holidays = [
    '2024-01-01', '2024-01-08', '2024-02-11', '2024-02-12', '2024-02-23',
    '2024-03-20', '2024-04-29', '2024-05-03', '2024-05-04', '2024-05-05',
    '2024-07-15', '2024-08-11', '2024-08-12', '2024-09-16', '2024-09-23',
    '2024-10-14', '2024-11-03', '2024-11-04', '2024-11-23',
    '2025-01-01', '2025-01-13', '2025-02-11', '2025-02-23', '2025-03-20',
    '2025-04-29', '2025-05-03', '2025-05-04', '2025-05-05', '2025-07-21',
    '2025-08-11', '2025-09-15', '2025-09-23', '2025-10-13', '2025-11-03',
    '2025-11-23', '2025-12-23'
  ];

  // 祝日かチェック
  const isHoliday = (dateString) => {
    return holidays.includes(dateString);
  };

  // 祝日前日かチェック
  const isBeforeHoliday = (dateString) => {
    const date = new Date(dateString);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    const nextDayString = nextDay.toISOString().split('T')[0];
    return holidays.includes(nextDayString);
  };

  // 日付に応じた営業時間の取得
  const getTimeSlots = (selectedDate) => {
    if (!selectedDate) return [];
    
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0:日曜, 1:月曜, ..., 6:土曜
    const dateString = selectedDate;

    // 時間帯生成関数
    const generateTimeSlots = (startHour, endHour) => {
      const slots = [];
      let hour = startHour;
      let minute = 0;
      
      while (hour < endHour || (hour === endHour && minute === 0)) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
        
        minute += 30;
        if (minute >= 60) {
          minute = 0;
          hour += 1;
        }
      }
      return slots;
    };

    // 金曜・土曜・祝前日: 12:00-29:00 (翌朝5:00)
    if (dayOfWeek === 5 || dayOfWeek === 6 || isBeforeHoliday(dateString)) {
      return generateTimeSlots(12, 29);
    }
    
    // 月曜-木曜: 12:00-27:00 (翌朝3:00)
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      return generateTimeSlots(12, 27);
    }
    
    // 日曜・祝日: 12:00-27:00 (翌朝3:00)
    if (dayOfWeek === 0 || isHoliday(dateString)) {
      return generateTimeSlots(12, 27);
    }
    
    return [];
  };

  const availableTimeSlots = getTimeSlots(formData.reservation_date);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };

      // 日付が変更された場合、時間をリセット
      if (name === 'reservation_date') {
        newData.start_time = '';
        newData.end_time = '';
        newData.seat_id = '';
        setAvailableSeats([]);
      }

      // 開始時間が変更された場合、終了時間を自動設定
      if (name === 'start_time' && value) {
        const [hours, minutes] = value.split(':').map(Number);
        const endTime = new Date();
        endTime.setHours(hours + 2, minutes); // 2時間後
        const endTimeString = endTime.toTimeString().slice(0, 5);
        newData.end_time = endTimeString;

        // 利用可能な席を取得
        if (newData.reservation_date) {
          fetchAvailableSeats(newData.reservation_date, value, endTimeString);
        }
      }

      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setSubmitMessage('予約が正常に完了しました！');
        setFormData({
          customer_name: '',
          customer_phone: '',
          customer_email: '',
          reservation_date: '',
          start_time: '',
          end_time: '',
          party_size: 1,
          special_requests: '',
          seat_id: ''
        });
        setAvailableSeats([]);
      } else {
        setIsSuccess(false);
        setSubmitMessage(data.message || '予約に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('予約エラー:', error);
      setIsSuccess(false);
      setSubmitMessage('サーバーに接続できません。しばらく時間をおいてから再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="reservation-header">
          <h2>{t.reservation.title}</h2>
          <p>{t.reservation.subtitle}</p>
          
          <div className="business-hours">
            <h3>{t.reservation.businessHours}</h3>
            <div className="hours-info">
              <div className="hours-item">
                <span className="day">{t.reservation.hoursWeekday}</span>
                <span className="time">{t.reservation.timeWeekday}</span>
              </div>
              <div className="hours-item">
                <span className="day">{t.reservation.hoursWeekend}</span>
                <span className="time">{t.reservation.timeWeekend}</span>
              </div>
              <div className="hours-item">
                <span className="day">{t.reservation.hoursSunday}</span>
                <span className="time">{t.reservation.timeSunday}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="reservation-form-container">
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-group">
              <label htmlFor="customer_name">{t.reservation.name} *</label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleInputChange}
                required
                placeholder="山田太郎"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customer_phone">{t.reservation.phone} *</label>
              <input
                type="tel"
                id="customer_phone"
                name="customer_phone"
                value={formData.customer_phone}
                onChange={handleInputChange}
                required
                placeholder="090-1234-5678"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customer_email">{t.reservation.email} *</label>
              <input
                type="email"
                id="customer_email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleInputChange}
                required
                placeholder="example@email.com"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reservation_date">{t.reservation.date} *</label>
                <input
                  type="date"
                  id="reservation_date"
                  name="reservation_date"
                  value={formData.reservation_date}
                  onChange={handleInputChange}
                  required
                  min={today}
                />
              </div>

              <div className="form-group">
                <label htmlFor="start_time">{t.reservation.time} *</label>
                <select
                  id="start_time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.reservation_date || availableTimeSlots.length === 0}
                >
                  <option value="">
                    {!formData.reservation_date
                      ? '日付を先に選択してください'
                      : availableTimeSlots.length === 0
                      ? 'この日は休業日です'
                      : '時間を選択'}
                  </option>
                  {availableTimeSlots.map(time => (
                    <option key={time} value={time}>
                      {parseInt(time.split(':')[0]) >= 24
                        ? `${time} (翌朝${parseInt(time.split(':')[0]) - 24}:${time.split(':')[1]})`
                        : time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="party_size">{t.reservation.people} *</label>
              <select
                id="party_size"
                name="party_size"
                value={formData.party_size}
                onChange={handleInputChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}名</option>
                ))}
              </select>
            </div>

            {availableSeats.length > 0 && (
              <div className="form-group">
                <label htmlFor="seat_id">席選択 *</label>
                <select
                  id="seat_id"
                  name="seat_id"
                  value={formData.seat_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">席を選択してください</option>
                  {availableSeats.map(seat => (
                    <option key={seat.id} value={seat.id}>
                      {seat.name} ({seat.type} - {seat.capacity}名まで - ¥{seat.hourly_rate}/時間)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="special_requests">{t.reservation.requests}</label>
              <textarea
                id="special_requests"
                name="special_requests"
                value={formData.special_requests}
                onChange={handleInputChange}
                rows="4"
                placeholder="苦手なフレーバーや特別なご要望がございましたらご記入ください"
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.reservation.submitting : t.reservation.submit}
            </button>

            {submitMessage && (
              <div className={`submit-message ${isSuccess ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reservation;