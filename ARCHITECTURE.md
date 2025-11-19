# Architecture Overview

This document describes the architecture and design decisions for the HK Bus Tracker app.

## Application Flow

```
User Opens App
      ↓
Request Location Permission
      ↓
Get GPS Coordinates
      ↓
Fetch Nearby Bus Stops (within 500m)
      ↓
Display Stops (sorted by distance)
      ↓
User Selects a Stop
      ↓
Fetch ETA Data for Stop
      ↓
Display ETA List (auto-refresh every 30s)
```

## Component Hierarchy

```
App.tsx
├── HomeScreen
│   ├── BusStopItem (for each stop)
│   ├── LoadingIndicator
│   └── ErrorMessage
│
└── ETAScreen
    ├── ETAItem (for each ETA)
    ├── LoadingIndicator
    └── ErrorMessage
```

## Service Layer

### LocationService
Handles all GPS and location-related functionality:
- `requestPermission()` - Request location permissions
- `getCurrentLocation()` - Get current GPS coordinates
- `calculateDistance()` - Calculate distance between two points (Haversine)
- `watchLocation()` - Monitor location changes

### BusApiService
Handles all API communication:
- `getNearbyBusStops()` - Get stops near a location
- `getETAForStop()` - Get ETA data for a specific stop
- `refreshETA()` - Refresh ETA information
- `calculateRemainingMinutes()` - Calculate time until arrival

## Data Flow

```
GPS Location ──┐
               ├─> BusApiService.getNearbyBusStops() ─> BusStop[]
User Location ─┘

BusStop.id ──> BusApiService.getETAForStop() ─> BusETA[]

BusETA[] ──> ETAScreen ──> ETAItem (rendered)
```

## State Management

Uses React Hooks for state management:
- `useState` - Local component state
- `useEffect` - Side effects (API calls, timers)
- `useCallback` - Memoized functions to prevent re-renders

### HomeScreen State
```typescript
- location: Coordinates | null
- busStops: BusStop[]
- loading: boolean
- refreshing: boolean
- error: string | null
```

### ETAScreen State
```typescript
- etas: BusETA[]
- loading: boolean
- refreshing: boolean
- error: string | null
- lastUpdated: Date | null
```

## Navigation Pattern

Simple state-based navigation:
- `selectedStop === null` → Show HomeScreen
- `selectedStop !== null` → Show ETAScreen

Benefits:
- No routing library needed
- Simple state management
- Easy to understand flow

## Design Patterns

### 1. Service Layer Pattern
Separates business logic from UI components:
- Services handle API calls and GPS
- Components handle UI and user interaction
- Clean separation of concerns

### 2. Component Composition
Reusable components for common patterns:
- `ETAItem` - Display single ETA
- `BusStopItem` - Display single bus stop
- `LoadingIndicator` - Loading state
- `ErrorMessage` - Error state

### 3. Props-Based Communication
- Parent components pass data down via props
- Child components call parent callbacks via props
- Unidirectional data flow

## Type System

TypeScript interfaces ensure type safety:

```typescript
Coordinates
├── latitude: number
└── longitude: number

BusStop
├── id: string
├── name: string
├── location: Coordinates
└── distance?: number

BusETA
├── id: string
├── stopId: string
├── route: string
├── destination: string
├── serviceType: 'bus' | 'minibus'
├── eta: Date
└── remainingMinutes: number
```

## Refresh Strategy

### Auto-Refresh (ETAScreen)
- Timer: 30 seconds
- Automatic background refresh
- Updates ETA times without user action

### Pull-to-Refresh (Both Screens)
- Manual trigger by user
- Updates all data
- Visual feedback during refresh

### On-Demand (Error Recovery)
- Retry button in error states
- Re-fetches data after failure

## Error Handling

Hierarchical error handling:

1. **Service Layer**
   - Try-catch blocks
   - Console logging
   - Throw errors up

2. **Screen Components**
   - Catch service errors
   - Set error state
   - Display ErrorMessage component

3. **User Interface**
   - Friendly error messages
   - Retry buttons
   - Graceful degradation

## Performance Considerations

### Optimization Strategies
1. **Memoization**: `useCallback` prevents unnecessary re-renders
2. **FlatList**: Virtualized list for efficient rendering
3. **Debouncing**: Location updates throttled to every 10s
4. **Caching**: Mock data demonstrates caching pattern

### Bundle Size
- Minimal dependencies
- Tree-shaking with TypeScript
- Code splitting with lazy loading (future)

## Security

### Location Privacy
- Permission requests with clear explanations
- Location only used for finding stops
- No location data sent to external servers

### API Security
- Placeholder for authentication headers
- Environment variables for API keys
- HTTPS recommended for production

## Scalability

### Current Limitations
- Simple state management (suitable for current scope)
- No persistent storage
- Mock data only

### Future Scaling Options
1. **State Management**: Redux/MobX for complex state
2. **Persistence**: AsyncStorage for offline mode
3. **Caching**: React Query for server state
4. **Analytics**: Track usage patterns
5. **Performance**: React.memo, useMemo for large lists

## Testing Strategy

### Recommended Testing Approach
1. **Unit Tests**: Service layer functions
2. **Component Tests**: React Testing Library
3. **Integration Tests**: Screen flows
4. **E2E Tests**: Detox for full user flows

### Test Coverage Goals
- Services: 80%+
- Components: 70%+
- Utilities: 90%+

## Deployment

### Development
```bash
npm start
```

### Production Build
```bash
# iOS
expo build:ios

# Android
expo build:android

# Web
expo build:web
```

### App Store Submission
- Follow Expo's build and submission guides
- Configure app.json properly
- Prepare screenshots and metadata

## Future Enhancements

### Phase 1: Core Improvements
- Real API integration
- Offline mode with caching
- Route filtering and search

### Phase 2: Advanced Features
- Map view with stop locations
- Favorite stops/routes
- Push notifications
- Multi-language support

### Phase 3: Platform Optimization
- Native modules for better performance
- Background location updates
- Widget support (iOS/Android)

## Dependencies

### Core Dependencies
- `expo` - Development platform
- `react-native` - Mobile framework
- `expo-location` - GPS services
- `typescript` - Type safety

### Dev Dependencies
- `@types/react` - TypeScript types

### Platform Support
- iOS 13.4+
- Android 5.0+
- Modern web browsers

## Configuration Files

### app.json
- App metadata
- Platform-specific settings
- Permission configurations
- Plugin settings

### tsconfig.json
- TypeScript compiler options
- Path mappings
- Type checking rules

### package.json
- Dependencies
- Scripts
- Metadata
