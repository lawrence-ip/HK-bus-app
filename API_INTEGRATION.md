# API Integration Guide

This document provides instructions for integrating the actual bus ETA API endpoint into the HK Bus Tracker app.

## Current Implementation

The app currently uses **mock data** in the `BusApiService` class for development and demonstration purposes. The following methods need to be updated with actual API calls:

### Files to Update

- **`src/services/busApiService.ts`** - Contains all API-related methods

## Integration Steps

### 1. Update API Base URL

In `src/services/busApiService.ts`, update the `API_BASE_URL`:

```typescript
private static API_BASE_URL = 'https://your-actual-api-endpoint.com';
```

### 2. Update `getNearbyBusStops` Method

Replace the mock implementation with actual API calls:

```typescript
static async getNearbyBusStops(
  userLocation: Coordinates,
  radiusMeters: number = 500
): Promise<BusStop[]> {
  try {
    const response = await fetch(
      `${this.API_BASE_URL}/stops/nearby?` +
      `lat=${userLocation.latitude}&` +
      `lon=${userLocation.longitude}&` +
      `radius=${radiusMeters}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch bus stops');
    }
    
    const data = await response.json();
    
    // Map API response to BusStop type
    return data.stops.map((stop: any) => ({
      id: stop.id,
      name: stop.name,
      location: {
        latitude: stop.latitude,
        longitude: stop.longitude,
      },
      distance: LocationService.calculateDistance(userLocation, {
        latitude: stop.latitude,
        longitude: stop.longitude,
      }),
    }));
  } catch (error) {
    console.error('Error fetching nearby bus stops:', error);
    throw error;
  }
}
```

### 3. Update `getETAForStop` Method

Replace the mock implementation with actual API calls:

```typescript
static async getETAForStop(stopId: string): Promise<BusETA[]> {
  try {
    const response = await fetch(
      `${this.API_BASE_URL}/stops/${stopId}/eta`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch ETA data');
    }
    
    const data = await response.json();
    
    // Map API response to BusETA type
    return data.etas.map((eta: any) => ({
      id: eta.id,
      stopId: stopId,
      route: eta.route,
      destination: eta.destination,
      serviceType: eta.serviceType === 'minibus' ? 'minibus' : 'bus',
      eta: new Date(eta.eta),
      remainingMinutes: this.calculateRemainingMinutes(new Date(eta.eta)),
    })).sort((a: BusETA, b: BusETA) => a.remainingMinutes - b.remainingMinutes);
  } catch (error) {
    console.error('Error fetching ETA data:', error);
    throw error;
  }
}
```

## Expected API Response Formats

### Bus Stops Endpoint

**Request:**
```
GET /stops/nearby?lat=22.2876&lon=114.1559&radius=500
```

**Expected Response:**
```json
{
  "stops": [
    {
      "id": "stop-001",
      "name": "Central Ferry Pier",
      "latitude": 22.2876,
      "longitude": 114.1559
    }
  ]
}
```

### ETA Endpoint

**Request:**
```
GET /stops/{stopId}/eta
```

**Expected Response:**
```json
{
  "stopId": "stop-001",
  "etas": [
    {
      "id": "eta-001",
      "route": "1",
      "destination": "Central",
      "serviceType": "bus",
      "eta": "2024-01-15T14:30:00Z"
    },
    {
      "id": "eta-002",
      "route": "1A",
      "destination": "Admiralty",
      "serviceType": "minibus",
      "eta": "2024-01-15T14:35:00Z"
    }
  ]
}
```

## Authentication

If the API requires authentication, add headers to the fetch requests:

```typescript
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});
```

Store the API key securely:
1. Create a `.env` file (already in .gitignore)
2. Add: `API_KEY=your_api_key_here`
3. Install: `npm install expo-constants`
4. Access in code: `import Constants from 'expo-constants';`

## Error Handling

The current implementation includes error handling with user-friendly messages. Ensure the API integration maintains this:

- Network errors
- Invalid responses
- Permission errors
- Timeout handling

## Testing

After integration:

1. Test with real device GPS location
2. Verify permission requests work correctly
3. Test with various locations in Hong Kong
4. Verify auto-refresh functionality (30 seconds)
5. Test pull-to-refresh
6. Test error states and recovery

## Hong Kong Bus Data Sources

Consider these official data sources for Hong Kong bus/minibus ETA:

- **KMB (Kowloon Motor Bus)**: https://data.etabus.gov.hk/
- **CTB & NWFB**: https://rt.data.gov.hk/
- **Green Minibus**: Various district-specific APIs
- **Transport Department Open Data**: https://data.gov.hk/

## Performance Considerations

- Implement request caching to reduce API calls
- Add request debouncing for location updates
- Consider background refresh for better UX
- Implement offline mode with cached data

## Future Enhancements

- Route search functionality
- Favorite bus stops
- Push notifications for arriving buses
- Real-time bus tracking on map
- Multiple language support (EN/繁/簡)
