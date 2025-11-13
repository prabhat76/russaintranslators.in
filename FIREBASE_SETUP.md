# Firebase Setup Guide for Language Liberty

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: **language-liberty**
4. Follow the setup wizard (disable Google Analytics if not needed)
5. Click "Create Project"

## Step 2: Register Your Web App

1. In Firebase console, click the **Web icon** (</>)
2. Register app name: **Language Liberty Website**
3. Copy the Firebase configuration object

## Step 3: Update Firebase Configuration

Open `src/config/firebase.ts` and replace the configuration with your values:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 4: Enable Firestore Database

1. In Firebase console, go to **Firestore Database**
2. Click "Create database"
3. Start in **test mode** (we'll add security rules later)
4. Choose location closest to your users (asia-south1 for India)
5. Click "Enable"

## Step 5: Enable Storage

1. In Firebase console, go to **Storage**
2. Click "Get started"
3. Start in **test mode**
4. Click "Done"

## Step 6: Enable Authentication

1. In Firebase console, go to **Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable **Email/Password**
5. Click "Save"

## Step 7: Create Admin User

1. Go to **Authentication** > **Users** tab
2. Click "Add user"
3. Enter your email and password
4. Click "Add user"
5. **Save these credentials** - you'll use them to login to the admin panel

## Step 8: Update Security Rules (Production Ready)

### Firestore Rules
Go to **Firestore Database** > **Rules** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to portfolio and blogs
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /blogs/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules
Go to **Storage** > **Rules** tab and paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /portfolio/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /logos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /blogs/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 9: Access Admin Panel

1. Open your website and add `/admin` to the URL
   - Example: `http://localhost:5173/admin`
   - Production: `https://yourdomain.com/admin`

2. Login with the admin email and password you created in Step 7

## Step 10: Upload Your First Portfolio Item

1. Login to admin panel
2. Go to **Portfolio Management** tab
3. Fill in the form:
   - Client Name: Sirmaxo Chemicals
   - Industry: Manufacturing
   - Year: 2020-Present
   - Project Type: Business Translation
   - Description (English): Technical documentation and client communication
   - Description (Russian): Техническая документация и коммуникация с клиентами
   - Upload project image
   - (Optional) Upload client logo

4. Click "Add Portfolio Item"

## Step 11: Add Your First Blog Post

1. In admin panel, go to **Blog Management** tab
2. Fill in the form:
   - Title (English): Welcome to Language Liberty
   - Title (Russian): Добро пожаловать в Language Liberty
   - Content (English): Your blog content...
   - Content (Russian): Ваш контент блога...
   - Select date
   - Author: Sabrina Bhatt
   - Upload featured image

3. Click "Publish Blog Post"

## Features

### Portfolio Management
- ✅ Upload images dynamically
- ✅ Add/Delete portfolio items
- ✅ Bilingual descriptions (English/Russian)
- ✅ Client logos
- ✅ Fallback to default items if Firebase not configured

### Blog Management
- ✅ Create blog posts with images
- ✅ Bilingual content
- ✅ Automatic date formatting
- ✅ Author attribution
- ✅ Auto-hide if no blogs exist

### Security
- ✅ Admin authentication required
- ✅ Public can only read (not write)
- ✅ Secure file uploads
- ✅ Protected admin routes

## Troubleshooting

### Can't Login to Admin Panel
- Verify you created a user in Firebase Authentication
- Check email and password are correct
- Ensure Firebase config is properly set in `firebase.ts`

### Images Not Uploading
- Check Firebase Storage is enabled
- Verify storage rules allow authenticated writes
- Ensure image file size is under 5MB

### Portfolio/Blog Not Showing
- Check Firestore Database is enabled
- Verify collection names are correct: `portfolio` and `blogs`
- Check browser console for errors

## Cost Estimates

Firebase Free Tier includes:
- **Firestore**: 1GB storage, 50K reads/day
- **Storage**: 5GB storage, 1GB downloads/day
- **Authentication**: Unlimited users

For a small business website, this is more than sufficient!

## Next Steps

1. ✅ Complete Firebase setup following steps above
2. ✅ Login to admin panel at `/admin`
3. ✅ Upload portfolio items
4. ✅ Create blog posts
5. ✅ Update security rules for production
6. ✅ Deploy to production

Need help? Check Firebase documentation or contact support.
