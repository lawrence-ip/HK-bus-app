import { BusStop, BusETA, Coordinates, ETAResponse } from '../types';
import { LocationService } from './locationService';

export class BusApiService {
  // This will be replaced with the actual API endpoint later
  private static API_BASE_URL = 'https://api.example.com'; // Placeholder

  /**
   * Get mock bus stops for development
   * In production, this would fetch from the actual API
   */
  static async getNearbyBusStops(
    userLocation: Coordinates,
    radiusMeters: number = 500
  ): Promise<BusStop[]> {
    // Mock data for development - replace with actual API call
    const mockStops: BusStop[] = [
      {
        id: 'stop-001',
        name: 'Central Ferry Pier',
        location: { latitude: 22.2876, longitude: 114.1559 },
      },
      {
        id: 'stop-002',
        name: 'Admiralty Station',
        location: { latitude: 22.2792, longitude: 114.1653 },
      },
      {
        id: 'stop-003',
        name: 'Causeway Bay',
        location: { latitude: 22.2797, longitude: 114.1846 },
      },
      {
        id: 'stop-004',
        name: 'Tsim Sha Tsui Station',
        location: { latitude: 22.2979, longitude: 114.1722 },
      },
      {
        id: 'stop-005',
        name: 'Mong Kok Station',
        location: { latitude: 22.3193, longitude: 114.1694 },
      },
    ];

    // Calculate distances and filter by radius
    const stopsWithDistance = mockStops
      .map((stop) => ({
        ...stop,
        distance: LocationService.calculateDistance(userLocation, stop.location),
      }))
      .filter((stop) => stop.distance! <= radiusMeters)
      .sort((a, b) => a.distance! - b.distance!);

    return stopsWithDistance;
  }

  /**
   * Get ETA times for a specific bus stop
   * In production, this would fetch from the actual API
   */
  static async getETAForStop(stopId: string): Promise<BusETA[]> {
    // Mock data for development - replace with actual API call
    const now = new Date();
    
    const mockETAs: BusETA[] = [
      {
        id: `eta-${stopId}-1`,
        stopId,
        route: '1',
        destination: 'Central',
        serviceType: 'bus',
        eta: new Date(now.getTime() + 3 * 60000), // 3 minutes
        remainingMinutes: 3,
      },
      {
        id: `eta-${stopId}-2`,
        stopId,
        route: '5B',
        destination: 'Causeway Bay',
        serviceType: 'bus',
        eta: new Date(now.getTime() + 7 * 60000), // 7 minutes
        remainingMinutes: 7,
      },
      {
        id: `eta-${stopId}-3`,
        stopId,
        route: '1A',
        destination: 'Admiralty',
        serviceType: 'minibus',
        eta: new Date(now.getTime() + 5 * 60000), // 5 minutes
        remainingMinutes: 5,
      },
      {
        id: `eta-${stopId}-4`,
        stopId,
        route: '10',
        destination: 'Mong Kok',
        serviceType: 'bus',
        eta: new Date(now.getTime() + 12 * 60000), // 12 minutes
        remainingMinutes: 12,
      },
      {
        id: `eta-${stopId}-5`,
        stopId,
        route: '28',
        destination: 'Tsim Sha Tsui',
        serviceType: 'minibus',
        eta: new Date(now.getTime() + 2 * 60000), // 2 minutes
        remainingMinutes: 2,
      },
    ];

    return mockETAs.sort((a, b) => a.remainingMinutes - b.remainingMinutes);
  }

  /**
   * Calculate remaining minutes from now to ETA
   */
  static calculateRemainingMinutes(eta: Date): number {
    const now = new Date();
    const diff = eta.getTime() - now.getTime();
    return Math.max(0, Math.floor(diff / 60000));
  }

  /**
   * Refresh ETA data
   * This should be called periodically to update the ETA times
   */
  static async refreshETA(stopId: string): Promise<ETAResponse> {
    const etas = await this.getETAForStop(stopId);
    
    return {
      stopId,
      etas,
      lastUpdated: new Date(),
    };
  }
}
