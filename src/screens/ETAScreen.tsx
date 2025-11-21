import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BusStop, BusETA } from '../types';
import { BusApiService } from '../services/busApiService';
import { ETAItem } from '../components/ETAItem';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorMessage } from '../components/ErrorMessage';
import { formatDistance } from '../utils/formatters';

interface ETAScreenProps {
  busStop: BusStop;
  onBack: () => void;
}

export const ETAScreen: React.FC<ETAScreenProps> = ({ busStop, onBack }) => {
  const [etas, setEtas] = useState<BusETA[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchETAs = useCallback(async () => {
    try {
      setError(null);
      const response = await BusApiService.refreshETA(busStop.id);
      setEtas(response.etas);
      setLastUpdated(response.lastUpdated);
    } catch (err) {
      setError('Failed to fetch ETA data. Please try again.');
      console.error('Error fetching ETAs:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [busStop.id]);

  useEffect(() => {
    fetchETAs();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchETAs, 30000);
    
    return () => clearInterval(interval);
  }, [fetchETAs]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchETAs();
  }, [fetchETAs]);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <Text style={styles.stopName}>{busStop.name}</Text>
        {busStop.distance !== undefined && (
          <Text style={styles.stopDistance}>
            {formatDistance(busStop.distance)} away
          </Text>
        )}
        {lastUpdated && (
          <Text style={styles.lastUpdated}>
            Updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        )}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🚌</Text>
      <Text style={styles.emptyText}>No buses arriving soon</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <LoadingIndicator message="Loading ETA times..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <ErrorMessage message={error} onRetry={fetchETAs} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={etas}
        renderItem={({ item }) => <ETAItem eta={item} />}
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
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
  },
  headerInfo: {
    marginTop: 4,
  },
  stopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  stopDistance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
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
    fontSize: 16,
    color: '#666',
  },
});
