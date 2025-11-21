// Location Types
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Bus Stop Types
export interface BusStop {
  id: string;
  name: string;
  location: Coordinates;
  distance?: number; // Distance from user in meters
}

// Bus Types
export interface Bus {
  route: string;
  destination: string;
  serviceType: 'bus' | 'minibus';
}

// ETA Types
export interface BusETA {
  id: string;
  stopId: string;
  route: string;
  destination: string;
  serviceType: 'bus' | 'minibus';
  eta: Date;
  remainingMinutes: number;
}

// API Response Types
export interface ETAResponse {
  stopId: string;
  etas: BusETA[];
  lastUpdated: Date;
}
