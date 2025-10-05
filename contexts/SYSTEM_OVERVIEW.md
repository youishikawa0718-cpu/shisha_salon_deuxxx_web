# Shisha Salon DEUXXX システム詳細解説

## 🎯 このシステムの目的
シーシャサロンデュクシのオンライン予約システム付きWebサイトです。お客様がWebサイトで店舗情報を確認し、直接予約ができます。

## 🏗️ アーキテクチャ概要

このシステムは **SPA（Single Page Application）+ RESTful API** のモダンなWeb アプリケーション構成です。

```
[フロントエンド: React] ←→ [HTTP/JSON API] ←→ [バックエンド: Laravel] ←→ [SQLite DB]
```

## 📁 プロジェクト構成

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

## 🎨 フロントエンド詳細構造

### 1. コンポーネント階層（App.js:13-28）
```
App (メインコンテナ)
├── LanguageProvider (多言語コンテキスト)
│   ├── Header (ナビゲーション)
│   ├── Hero (トップセクション)
│   ├── About (店舗紹介)
│   ├── PhotoExperience (体験紹介)
│   ├── Menu (メニュー表示)
│   ├── Reservation (予約システム) ★メイン機能
│   ├── Contact (問い合わせ)
│   └── Footer (フッター)
```

### 2. 多言語システム（LanguageContext.js:20-251）
- **React Context API** を使用した状態管理
- 日本語・英語の完全対応
- **翻訳データ構造**:
  ```javascript
  translations = {
    ja: { nav: {...}, hero: {...}, reservation: {...} },
    en: { nav: {...}, hero: {...}, reservation: {...} }
  }
  ```

### 3. 予約システムコンポーネント（核心機能）

#### 状態管理（Reservation.js:7-24）
```javascript
// フォームデータ
formData = {
  customer_name, customer_phone, customer_email,
  reservation_date, start_time, end_time,
  party_size, special_requests, seat_id
}

// 席情報
seats = []          // 全席情報
availableSeats = [] // 利用可能席

// UI状態
isSubmitting, submitMessage, isSuccess
```

#### ビジネスロジック
1. **営業時間管理（Reservation.js:91-133）**
   - 曜日・祝日による営業時間変更
   - 金土祝前日: 12:00-29:00（翌朝5:00）
   - 月〜木: 12:00-27:00（翌朝3:00）
   - 日祝: 12:00-27:00（翌朝3:00）

2. **空席検索機能（Reservation.js:44-62）**
   - 日時指定による動的席検索
   - リアルタイム空席状況更新

3. **フォーム連動機能**
   - 日付選択 → 時間スロット更新
   - 時間選択 → 自動終了時間設定（+2時間）
   - 時間確定 → 空席検索実行

## ⚙️ バックエンド詳細構造

### 1. APIエンドポイント設計（api.php:7-9）
```php
// 席管理
GET    /api/seats              // 全席情報取得
GET    /api/seats/available    // 空席検索（日時指定）
POST   /api/seats              // 席作成
PUT    /api/seats/{id}         // 席更新
DELETE /api/seats/{id}         // 席削除

// 予約管理
GET    /api/reservations       // 予約一覧取得
POST   /api/reservations       // 新規予約作成
GET    /api/reservations/{id}  // 予約詳細取得
PUT    /api/reservations/{id}  // 予約更新
DELETE /api/reservations/{id}  // 予約削除
```

### 2. データモデル構造

#### Reservationモデル（Reservation.php:10-23）
```php
protected $fillable = [
    'customer_name',     // 顧客名
    'customer_phone',    // 電話番号
    'customer_email',    // メールアドレス
    'seat_id',          // 席ID（外部キー）
    'reservation_date',  // 予約日
    'start_time',       // 開始時間
    'end_time',         // 終了時間
    'party_size',       // 人数
    'special_requests', // 特別要望
    'status',          // 予約状態
    'deposit_amount',  // 保証金額
    'deposit_paid',    // 保証金支払い状況
];
```

#### バリデーション（ReservationController.php:21-32）
```php
$validated = $request->validate([
    'customer_name' => 'required|string|max:255',
    'customer_phone' => 'required|string|max:20',
    'customer_email' => 'nullable|email|max:255',
    'seat_id' => 'required|exists:seats,id',
    'reservation_date' => 'required|date|after_or_equal:today',
    'start_time' => 'required|date_format:H:i',
    'end_time' => 'required|date_format:H:i|after:start_time',
    'party_size' => 'required|integer|min:1|max:10',
    'special_requests' => 'nullable|string|max:1000',
]);
```

## 🔄 データフローと通信方式

### 1. 予約作成フロー
```
[ユーザー入力]
    ↓
[フォームバリデーション（フロント）]
    ↓
[HTTP POST] → http://127.0.0.1:8000/api/reservations
    ↓
[Laravelバリデーション（ReservationController.php:21-32）]
    ↓
[データベース保存（Reservation::create）]
    ↓
[JSON レスポンス] → [成功・失敗メッセージ表示]
```

### 2. 空席検索フロー
```
[日時選択（フロント）]
    ↓
[fetchAvailableSeats関数実行（Reservation.js:44-62）]
    ↓
[HTTP GET] → /api/seats/available?date=xxx&start_time=xxx&end_time=xxx
    ↓
[SeatController::available メソッド実行]
    ↓
[SQL クエリで重複チェック]
    ↓
[利用可能席リスト返却] → [席選択UI更新]
```

### 3. 通信プロトコル
- **プロトコル**: HTTP/HTTPS
- **データ形式**: JSON
- **認証**: なし（現在は簡易実装）
- **CORS**: 設定済み（フロント・バック間通信）

## 🧩 各コンポーネントの役割詳細

### フロントエンドコンポーネント

1. **Header** - ナビゲーション管理
   - 言語切り替えボタン
   - ページ内スクロール機能
   - レスポンシブメニュー

2. **Hero** - ファーストビュー
   - キャッチコピー表示
   - CTAボタン（メニュー・お問い合わせ）
   - スクロール誘導

3. **About** - 店舗紹介
   - 店舗概要・特徴説明
   - 立地・設備情報

4. **PhotoExperience** - 体験紹介
   - シーシャ・ドリンク・空間の魅力
   - ビジュアル重視のプレゼンテーション

5. **Menu** - メニュー表示
   - シーシャフレーバー一覧
   - ドリンク・フードメニュー
   - 価格・注意事項

6. **Reservation** - 予約システム（メイン機能）
   - リアルタイム予約受付
   - 営業時間対応
   - 席管理連携

7. **Contact** - 問い合わせ情報
   - 店舗詳細情報
   - アクセス情報
   - 営業時間表示

8. **Footer** - 基本情報
   - 営業時間・連絡先
   - アクセス情報
   - 著作権表示

### バックエンドコンポーネント

1. **ReservationController**
   - CRUD操作の全て
   - バリデーション処理
   - エラーハンドリング

2. **SeatController**
   - 席管理機能
   - 空席検索ロジック

3. **Models**
   - データベースとの接続
   - リレーションシップ定義
   - データ変換処理

## 🛠️ 開発・デプロイプロセス

### 1. 開発環境セットアップ

#### フロントエンド（React）
```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm start                # http://localhost:3000
```

#### バックエンド（Laravel）
```bash
cd backend

# 依存関係インストール
composer install

# 環境変数設定
cp .env.example .env
php artisan key:generate

# データベースセットアップ
php artisan migrate
php artisan db:seed

# 開発サーバー起動
php artisan serve --port=8000    # http://127.0.0.1:8000
```

### 2. ビルド・デプロイプロセス

#### フロントエンド
```bash
# 本番ビルド
npm run build           # buildディレクトリに静的ファイル生成

# GitHub Pages デプロイ
npm run deploy          # GitHub Pages に自動デプロイ
```

#### バックエンド
```bash
# 本番環境用最適化
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 3. GitHub Pages デプロイメント
- **デプロイURL**: https://youishikawa0718-cpu.github.io/shisha_salon_deuxxx_web
- **自動デプロイ**: package.json の `deploy` スクリプト
- **ビルド生成物**: `build/` ディレクトリ

## 📊 システムの技術的特徴

### 1. パフォーマンス最適化
- **React**: 仮想DOM による高速レンダリング
- **Laravel**: Eloquent ORM による効率的なデータベース操作
- **SQLite**: 軽量データベースで高速アクセス

### 2. セキュリティ対策
- **Laravel Validation**: サーバーサイドでの厳密な入力検証
- **CSRF Protection**: Laravel標準のCSRF対策
- **SQL Injection Prevention**: Eloquent ORMによる自動エスケープ

### 3. 保守性・拡張性
- **コンポーネント設計**: 再利用可能なReactコンポーネント
- **RESTful API**: 標準的なAPI設計パターン
- **MVC Architecture**: Laravel の明確な責任分離

### 4. ユーザビリティ
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **多言語対応**: 日本語・英語の完全サポート
- **リアルタイム予約**: 即座の空席確認・予約受付

## 🎯 業務的価値とメリット

### 店舗運営者にとって
1. **自動予約受付**: 24時間対応の予約システム
2. **効率的席管理**: リアルタイム空席状況把握
3. **顧客情報管理**: 予約データの一元管理
4. **多言語対応**: 外国人観光客への対応

### 顧客にとって
1. **簡単予約**: Webから手軽に予約可能
2. **即座確認**: リアルタイムで空席状況確認
3. **多言語サポート**: 日英両言語での利用
4. **詳細情報**: メニュー・店舗情報の充実

## 🚀 技術スタック

### フロントエンド
- **React**: 18.2.0
- **JavaScript**: ES6+
- **CSS3**: モダンCSS（Flexbox、Grid）
- **HTML5**: セマンティックHTML

### バックエンド
- **Laravel**: 12.0
- **PHP**: 8.2
- **SQLite**: 軽量データベース
- **Composer**: 依存関係管理

### 開発・デプロイ
- **npm**: パッケージ管理
- **GitHub Pages**: 静的サイトホスティング
- **Git**: バージョン管理

## 📋 API エンドポイント一覧

- `GET /api/seats` - 席一覧取得
- `GET /api/seats/available` - 空席検索
- `POST /api/reservations` - 予約作成
- `GET /api/reservations` - 予約一覧
- `PUT /api/reservations/{id}` - 予約更新
- `DELETE /api/reservations/{id}` - 予約削除

## 🔧 開発状況

✅ React フロントエンド完成
✅ Laravel バックエンドAPI完成
✅ 予約システム連携完成
✅ CORS設定完了
✅ 座席管理機能完成
✅ 多言語対応（日本語・英語）完成

## 💡 業務未経験者向けのポイント

1. **フロントエンド = お客様が触る部分**
   - 見た目、操作性を担当
   - React = 動的なWebページを作るための道具

2. **バックエンド = 裏方の処理部分**
   - データ保存、ビジネスロジックを担当
   - Laravel = Webアプリを効率的に作るための道具

3. **API = フロントとバックの橋渡し**
   - データのやり取りをするためのルール

4. **データベース = 情報の保管庫**
   - 予約情報、席情報などを永続的に保存

このシステムは、モダンなWeb開発の標準的な構成（React + Laravel）で作られており、拡張性と保守性を考慮した設計になっています。

特に注目すべきは、**営業時間の複雑なビジネスルール**（曜日・祝日による変動）を正確にシステム化している点で、実際の店舗運営に即した実装となっているところが業務システムとしての完成度を示しています。