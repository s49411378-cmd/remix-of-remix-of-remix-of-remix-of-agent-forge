# Plan: Supabase → Firebase Migration

## Goal
Move the whole app (auth, database, storage) from Lovable Cloud (Supabase) to Firebase (Realtime Database + Firebase Auth + Cloud Storage), keeping all existing features working.

## What you must provide first
1. **Firebase service account JSON** (Firebase Console → Project Settings → Service Accounts → Generate new private key) — needed for all server-side work (builds, wallet, admin). The config you pasted is client-only and not enough.
2. Enable in Firebase Console: **Email/Password Auth**, **Realtime Database**, **Storage**.

## Steps

### 1. Firebase setup in code
- Add `firebase` (client SDK) and `firebase-admin` (server SDK) packages.
- Client config from the values you shared (apiKey via `VITE_FIREBASE_API_KEY`).
- Admin SDK initialized server-side from the service account secret.

### 2. Auth migration (Supabase Auth → Firebase Auth)
- Login, signup, password change, logout rewritten to Firebase Auth.
- Profile photo upload stays on ImgBB.
- **Limitation:** existing users' passwords cannot be moved (hashes are not exportable). Existing users will need to sign up again or use password reset. Tell me if that's OK.

### 3. Database migration (Postgres → Realtime Database)
- Recreate as Firebase paths: `profiles`, `wallets`, `walletTransactions`, `deposits`, `templates`, `buildRequests`, `loginHistory`, `settings`.
- Wallet balance changes become Firebase atomic transactions (same safety as today).
- Security rules written so users only read/write their own data; templates/settings readable by all.

### 4. Storage migration
- Template images/videos, logos, APK files move to Firebase Storage with signed URLs.

### 5. Server functions rewrite
- All server functions (templates, builds, wallet, deposits, admin, leaderboard, users) rewritten from Supabase client to Firebase Admin SDK.
- GitHub Actions build dispatch stays unchanged.

### 6. Data copy
- One-time script copies existing rows (users, wallets, templates, deposits, builds, settings) from the current database into Firebase.

### 7. Cleanup & verify
- Remove Supabase client code, test every flow end-to-end (signup, deposit, build, admin), then you redeploy to Vercel.

## Effort / risk
This is a full backend rewrite — every page and server function changes. Expect a large change set; I'll verify each flow in the preview before finishing.
