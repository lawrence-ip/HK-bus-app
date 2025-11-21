# HK-bus-app
App to check bus minibus times

## KMB Routes API

This application provides a REST API for accessing KMB (Kowloon Motor Bus) route information.

### Installation

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

### Running the Server

## Running the App

### Start the development server:
```bash
npm start
```

The server will start on port 3000 by default. You can set a custom port using the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### API Endpoints

#### GET /v1/transport/kmb/route/

Returns a list of all KMB bus routes.

**Response Format:** JSON

**Response Codes:**
- `200` - Success
- `422` - Validation Error
- `500` - Internal Server Error

**Sample Response:**
```json
{
  "type": "RouteList",
  "version": "1.0",
  "generated_timestamp": "2020-11-29T11:40:48+08:00",
  "data": [
    {
      "co": "KMB",
      "route": "74B",
      "bound": "O",
      "service_type": "1",
      "orig_en": "KOWLOON BAY",
      "orig_tc": "九龍灣",
      "orig_sc": "九龙湾",
      "dest_en": "TAI PO CENTRAL",
      "dest_tc": "大埔中心",
      "dest_sc": "大埔中心",
      "data_timestamp": "2020-11-29T11:40:00+08:00"
    },
    {
      "co": "KMB",
      "route": "74B",
      "bound": "I",
      "service_type": "1",
      "orig_en": "TAI PO CENTRAL",
      "orig_tc": "大埔中心",
      "orig_sc": "大埔中心",
      "dest_en": "KWUN TONG FERRY",
      "dest_tc": "觀塘碼頭",
      "dest_sc": "观塘码头",
      "data_timestamp": "2020-11-29T11:40:00+08:00"
    }
  ]
}
```

**Field Descriptions:**
- `co` - Company code (e.g., "KMB")
- `route` - Route number
- `bound` - Direction: "O" (Outbound) or "I" (Inbound)
- `service_type` - Service type identifier
- `orig_en` - Origin name in English
- `orig_tc` - Origin name in Traditional Chinese
- `orig_sc` - Origin name in Simplified Chinese
- `dest_en` - Destination name in English
- `dest_tc` - Destination name in Traditional Chinese
- `dest_sc` - Destination name in Simplified Chinese
- `data_timestamp` - Timestamp when the route data was last updated

### Testing

Run the test suite:

```bash
npm test
```

### Example Usage

```bash
# Get all routes
curl http://localhost:3000/v1/transport/kmb/route/
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

The app is currently using **mock data** for development. To integrate real bus ETA data:

1. See [API_INTEGRATION.md](API_INTEGRATION.md) for detailed integration instructions
2. Update the `BusApiService` class in `src/services/busApiService.ts`
3. Configure your API endpoint URL
4. Map API responses to the app's data types

## Quick Start

For a quick guide to get started, see [QUICKSTART.md](QUICKSTART.md)

## Current Features

### Home Screen
- Displays nearby bus stops using GPS location
- Shows distance to each stop
- Pull-to-refresh functionality
- Sorted by proximity

### ETA Screen
- Shows all buses and minibuses arriving at a selected stop
- Real-time countdown timers
- Color-coded by service type (Bus/Minibus)
- Auto-refreshes every 30 seconds
- Manual refresh via pull-down

### Location Service
- Automatic permission requests
- GPS-based location tracking
- Distance calculation using Haversine formula
- Error handling for permission denied/location unavailable

## Development

### Built with:
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe development
- **expo-location** - GPS and location services

### Technologies Used:
- React Hooks (useState, useEffect, useCallback)
- FlatList with RefreshControl
- SafeAreaView for device compatibility
- StyleSheet for styling

## Testing

### On Physical Device (Recommended)
1. Install Expo Go from App Store/Play Store
2. Run `npm start`
3. Scan QR code with your camera (iOS) or Expo Go (Android)
4. Grant location permissions

### Mock Data
The app includes mock data for testing:
- 5 Hong Kong bus stops (Central, Admiralty, Causeway Bay, TST, Mong Kok)
- Sample bus and minibus routes
- Randomized ETA times (2-12 minutes)

## Troubleshooting

**Location not working:**
- Ensure location services are enabled
- Grant location permissions to Expo Go
- Try restarting the app

**Build issues:**
```bash
npm start -- --clear  # Clear cache
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

- Integration with real Hong Kong bus APIs
- Route search and filtering
- Favorite stops
- Route maps
- Push notifications
- Offline mode with cached data
- Multi-language support (English, 繁體中文, 简体中文)

## License

ISC
