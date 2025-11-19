import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BusStop, Coordinates } from '../types';
import { LocationService } from '../services/locationService';
import { BusApiService } from '../services/busApiService';
import { BusStopItem } from '../components/BusStopItem';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorMessage } from '../components/ErrorMessage';

interface HomeScreenProps {
  onStopSelect: (busStop: BusStop) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStopSelect }) => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    try {
      const hasPermission = await LocationService.requestPermission();
      
      if (!hasPermission) {
        setError('Location permission is required to find nearby bus stops.');
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const currentLocation = await LocationService.getCurrentLocation();
      
      if (!currentLocation) {
        setError('Unable to get your location. Please check your device settings.');
        setLoading(false);
        setRefreshing(false);
        return;
      }

      setLocation(currentLocation);
      setError(null);
    } catch (err) {
      setError('Failed to get location. Please try again.');
      console.error('Error getting location:', err);
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchBusStops = useCallback(async (userLocation: Coordinates) => {
    try {
      const stops = await BusApiService.getNearbyBusStops(userLocation);
      setBusStops(stops);
      setError(null);
    } catch (err) {
      setError('Failed to fetch nearby bus stops. Please try again.');
      console.error('Error fetching bus stops:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    if (location) {
      fetchBusStops(location);
    }
  }, [location, fetchBusStops]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLocation();
  }, [fetchLocation]);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>🚌 HK Bus Tracker</Text>
      <Text style={styles.subtitle}>Nearby Bus Stops</Text>
      {location && (
        <Text style={styles.locationInfo}>
          📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Text>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyText}>No nearby bus stops found</Text>
      <Text style={styles.emptySubtext}>
        Try adjusting your location or increasing the search radius
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <LoadingIndicator message="Finding your location..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <ErrorMessage message={error} onRetry={onRefresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={busStops}
        renderItem={({ item }) => (
          <BusStopItem busStop={item} onPress={onStopSelect} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E6F3FF',
    marginBottom: 8,
  },
  locationInfo: {
    fontSize: 12,
    color: '#B8D9FF',
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
