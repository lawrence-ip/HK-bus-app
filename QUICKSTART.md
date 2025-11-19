# Quick Start Guide

Get the HK Bus Tracker app running in 5 minutes!

## Prerequisites

- Node.js 14+ installed
- npm or yarn
- Expo Go app on your phone (optional, for testing on device)

## Installation

```bash
# Clone the repository
git clone https://github.com/lawrence-ip/HK-bus-app.git
cd HK-bus-app

# Install dependencies
npm install
```

## Running the App

### Option 1: Run on Your Phone (Recommended for GPS Testing)

1. Install the **Expo Go** app from App Store or Google Play
2. Start the development server:
   ```bash
   npm start
   ```
3. Scan the QR code with your phone's camera (iOS) or Expo Go app (Android)
4. Grant location permissions when prompted

### Option 2: Run on iOS Simulator (macOS only)

```bash
npm run ios
```

### Option 3: Run on Android Emulator

```bash
npm run android
```

### Option 4: Run in Web Browser

```bash
npm run web
```

**Note:** GPS location may not work accurately in web browser; use a physical device for best results.

## Testing Location Features

The app uses your device's GPS to find nearby bus stops. To test:

1. Allow location permissions when prompted
2. The app will display your coordinates at the top
3. Mock bus stops within 500m will be displayed
4. Tap any stop to see mock ETA times

## Mock Data

The app currently uses mock data for development:

- **Bus Stops**: 5 popular Hong Kong locations
- **ETA Times**: Randomly generated times (2-12 minutes)
- **Auto-refresh**: Updates every 30 seconds
- **Service Types**: Both bus (🚌) and minibus (🚐)

## App Features

### Home Screen
- Shows nearby bus stops sorted by distance
- Pull down to refresh location and stops
- Tap any stop to view ETAs

### ETA Screen
- Displays all buses/minibuses arriving at selected stop
- Shows route number, destination, and arrival time
- Color-coded: Blue for buses, Orange for minibuses
- Auto-refreshes every 30 seconds
- Pull down to manually refresh

## Troubleshooting

### Location Not Working

- Ensure location services are enabled on your device
- Grant location permissions to the Expo Go app
- Try restarting the app

### App Won't Start

```bash
# Clear cache and restart
npm start -- --clear
```

### Build Errors

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Next Steps

1. See [README.md](README.md) for full documentation
2. See [API_INTEGRATION.md](API_INTEGRATION.md) to integrate real bus data
3. Customize the UI in `src/components/` and `src/screens/`

## Project Structure

```
HK-bus-app/
├── App.tsx              # Main app entry point
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── services/        # API and GPS services
│   ├── types/           # TypeScript types
│   └── utils/           # Helper functions
└── assets/              # Images and icons
```

## Need Help?

- Check [API_INTEGRATION.md](API_INTEGRATION.md) for API setup
- Review the code comments for implementation details
- Refer to [Expo documentation](https://docs.expo.dev/)

Happy coding! 🚌🚐
