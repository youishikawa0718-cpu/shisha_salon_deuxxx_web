# Shisha Salon DEUXXX - Backend API (Node.js)

LaravelからNode.js + TypeScript + Express + Prismaに移行したバックエンドAPI

## 技術スタック

- **Node.js** - JavaScript runtime
- **TypeScript** - Type safety
- **Express** - Web framework
- **Prisma** - ORM
- **Zod** - Validation
- **SQLite** - Database

## クイックスタート

### 1. 依存関係のインストール

```bash
cd backend-node
npm install
```

### 2. 環境変数の設定

Windowsの場合：
```bash
copy .env.example .env
```

macOS/Linuxの場合：
```bash
cp .env.example .env
```

`.env`ファイルの内容（デフォルトのまま使用可能）：
```
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL="file:./database.sqlite"

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 3. データベースのセットアップ

```bash
# データベーススキーマの作成
npm run prisma:push

# サンプル座席データの投入
npm run seed
```

### 4. サーバーの起動

#### 開発モード（ホットリロード）
```bash
npm run dev
```

#### 本番モード
```bash
npm run build
npm start
```

サーバーは `http://localhost:3001` で起動します。

## API エンドポイント

### ヘルスチェック
- `GET /health` - サーバーの状態確認

### Reservations（予約）
- `GET /api/reservations` - 全予約の取得
- `POST /api/reservations` - 新規予約の作成
- `GET /api/reservations/:id` - 特定予約の取得
- `PUT /api/reservations/:id` - 予約の更新
- `DELETE /api/reservations/:id` - 予約の削除

### Seats（座席）
- `GET /api/seats` - アクティブな座席一覧の取得
- `GET /api/seats/available?date=YYYY-MM-DD&start_time=HH:MM&end_time=HH:MM` - 空席確認
- `POST /api/seats` - 新規座席の作成
- `GET /api/seats/:id` - 特定座席の取得
- `PUT /api/seats/:id` - 座席の更新
- `DELETE /api/seats/:id` - 座席の削除

## サンプルデータ

初期セットアップで以下の座席が作成されます：
- **VIP個室A** - 4名まで（¥3,000/時間）
- **VIP個室B** - 6名まで（¥4,000/時間）
- **カウンター席1・2** - 各2名まで（¥2,000/時間）
- **テーブル席A・B** - 各4名まで（¥2,500/時間）

## Prismaコマンド

```bash
# Prisma Clientの生成
npm run prisma:generate

# 既存データベースからスキーマを取得
npm run prisma:pull

# スキーマをデータベースに適用
npm run prisma:push

# サンプルデータの投入
npm run seed

# Prisma Studioを起動（GUIでデータベースを確認）
npm run prisma:studio
```

## データベース構造

- `users` - ユーザー情報
- `seats` - 座席情報
- `reservations` - 予約情報
- `time_slots` - タイムスロット情報

## 開発

- TypeScriptの型チェックは自動で行われます
- `tsx watch`により、ファイル変更時に自動リロードされます
- バリデーションはZodスキーマで定義されています
- CORS設定により、ポート3000、3002、5173からのアクセスを許可

## トラブルシューティング

### ポート3001が既に使用されている
```bash
# Windowsの場合
netstat -ano | findstr :3001
taskkill /PID <PID番号> /F

# その後、再起動
npm run dev
```

### データベースをリセットしたい
```bash
# データベースファイルを削除
del database.sqlite  # Windows
rm database.sqlite   # macOS/Linux

# 再作成
npm run prisma:push
npm run seed
```

## Laravel からの移行について

このプロジェクトはLaravel（PHP）からNode.js + TypeScriptに移行されました。
主な変更点：
- **PHP → TypeScript**: 型安全性の向上
- **Eloquent ORM → Prisma**: モダンなORM
- **Laravel Validation → Zod**: スキーマベースのバリデーション
- データベース構造は完全に維持されています
