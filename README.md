
# Voter Registration App 📋🗳️

This is a mobile application built with **React Native** and **Firebase**, designed to allow users to register their details and select a political party. It supports real-time form validation, duplicate checking, and displays a list of registered users.

---

## 🚀 Features

- Voter registration with full validation
- Duplicate ID number checking via Firestore
- Firebase integration (Firestore)
- Form with scroll support for small screens
- Navigation using React Navigation
- Works on Android and iOS via Expo

---

## 📦 Technologies

- React Native (Expo)
- Firebase Firestore
- React Navigation
- TypeScript

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/eriancoet/VotersRegistration.git
cd VotersRegistration

2. Install Dependencies

Make sure you have Node.js and Expo CLI installed.

npm install

3. Start the Development Server

npx expo start

This will open a new tab in your browser with the Expo Developer Tools.
📱 Run on Your Phone

To preview the app on your phone:
Step 1: Install Expo Go

    Android (Play Store)

    iOS (App Store)

Step 2: Scan the QR Code

Once you run:

npx expo start

A QR code will be shown in your terminal and browser.

    Open the Expo Go app on your phone.

    Tap Scan QR Code.

    Point your camera at the QR code.

    The app will launch directly on your device.

🔒 Firebase Setup

To connect this app to your own Firebase project:

    Go to Firebase Console.

    Create a new project.

    Add a web app and copy the Firebase config.

    Replace the placeholder config in firebaseConfig.ts with your own.

// firebaseConfig.ts
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

🧪 Features to Add Next

    QR code scanning for ID verification

    Offline support

    Admin dashboard for viewing and exporting registration data

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
📜 License

MIT
📸 Screenshot


---

### ✅ Adding QR Scanner Demo

To allow QR scanning for demo/testing:

1. **Install required package**:

```bash
npx expo install expo-barcode-scanner

    Add a screen (e.g., QRScannerScreen.tsx) with a scanner using expo-barcode-scanner.

    Use navigation to access it from a menu or button.

