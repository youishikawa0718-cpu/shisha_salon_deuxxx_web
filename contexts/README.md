# Shisha Salon DEUXXX - ワークスペース

このディレクトリには、シーシャサロンDEUXXXのWebサイトと予約システムの関連ファイルが整理されています。

## プロジェクト構成

### フロントエンド（React）
- `App.js` - メインアプリケーションコンポーネント
- `App.css` - アプリケーションのスタイル
- `index.js` - Reactエントリーポイント
- `index.css` - グローバルスタイル
- `index.html` - メインHTMLファイル
- `components/` - Reactコンポーネント
  - `Header.js` - ヘッダーコンポーネント
  - `Hero.js` - ヒーローセクション
  - `About.js` - アバウトセクション
  - `PhotoExperience.js` - 写真体験セクション
  - `Menu.js` - メニューセクション
  - `Reservation.js` - 予約システム（Laravel APIと連携）
  - `Contact.js` - お問い合わせセクション
  - `Footer.js` - フッターコンポーネント
- `contexts/` - Reactコンテキスト
  - `LanguageContext.js` - 多言語対応コンテキスト

### バックエンド（Laravel）
- `backend/` - Laravel予約システムAPI
  - `app/Models/` - Eloquentモデル
    - `Reservation.php` - 予約モデル
    - `Seat.php` - 席モデル
    - `TimeSlot.php` - 時間スロットモデル
  - `app/Http/Controllers/Api/` - APIコントローラー
    - `ReservationController.php` - 予約管理API
    - `SeatController.php` - 席管理API
  - `database/migrations/` - データベースマイグレーション
  - `routes/api.php` - APIルート定義

### アセット
- `assets/images/` - プロジェクト画像
  - シーシャ台の写真
  - 店内風景
  - ドリンク・フレーバー画像
  - その他LINE ALBUMからの画像


## サーバー起動方法

### フロントエンド（React）
```bash
cd /c/Users/youis/src
npm start
```
- アクセス: http://localhost:3000

### バックエンド（Laravel）
```bash
cd /c/Users/youis/src/shisha-salon-backend
php artisan serve --port=8000
```
- API: http://127.0.0.1:8000/api

## API エンドポイント

- `GET /api/seats` - 席一覧取得
- `GET /api/seats/available` - 空席検索
- `POST /api/reservations` - 予約作成
- `GET /api/reservations` - 予約一覧
- `PUT /api/reservations/{id}` - 予約更新
- `DELETE /api/reservations/{id}` - 予約削除

## 開発状況

✅ React フロントエンド完成
✅ Laravel バックエンドAPI完成
✅ 予約システム連携完成
✅ CORS設定完了
✅ 座席管理機能完成
✅ 多言語対応（日本語・英語）完成

## 技術スタック

- **フロントエンド**: React, CSS3, HTML5
- **バックエンド**: Laravel 12, PHP 8.2
- **データベース**: SQLite（開発環境）
- **API**: RESTful API
- **スタイリング**: CSS Modules