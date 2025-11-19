# HK Bus App

A React Native app built with Expo to check bus and minibus ETA (Estimated Time of Arrival) times in Hong Kong. The app uses device GPS data to locate the closest bus stops and display real-time arrival information.

## Features

- 📍 GPS location tracking to find nearby bus stops
- 🚌 Display bus ETA times
- 🚐 Display minibus ETA times
- 📱 Cross-platform support (iOS, Android, Web)
- 🔄 Real-time data updates

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- For iOS: macOS with Xcode
- For Android: Android Studio and Android SDK

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lawrence-ip/HK-bus-app.git
cd HK-bus-app
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Start the development server:
```bash
npm start
```

### Run on specific platform:
```bash
npm run android  # Run on Android device/emulator
npm run ios      # Run on iOS device/simulator (macOS only)
npm run web      # Run in web browser
```

## Project Structure

```
HK-bus-app/
├── App.tsx                 # Main app component
├── src/
│   ├── screens/           # Screen components
│   ├── components/        # Reusable UI components
│   ├── services/          # API and location services
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── assets/                # Images, fonts, etc.
└── package.json           # Dependencies and scripts
```

## Permissions

The app requires the following permissions:
- Location access (GPS) - to find nearby bus stops

## API Integration

The app is designed to integrate with a bus ETA API. The API endpoint will be configured in the services layer.

## Development

Built with:
- React Native
- Expo
- TypeScript
- expo-location (for GPS functionality)

## License

ISC
