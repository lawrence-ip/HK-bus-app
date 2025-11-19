import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BusETA } from '../types';
import { formatRemainingTime, formatTime } from '../utils/formatters';

interface ETAItemProps {
  eta: BusETA;
}

export const ETAItem: React.FC<ETAItemProps> = ({ eta }) => {
  const isMinibus = eta.serviceType === 'minibus';
  const backgroundColor = isMinibus ? '#FFE4B5' : '#E6F3FF';
  const serviceIcon = isMinibus ? '🚐' : '🚌';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.leftSection}>
        <Text style={styles.icon}>{serviceIcon}</Text>
        <View style={styles.routeInfo}>
          <Text style={styles.route}>{eta.route}</Text>
          <Text style={styles.serviceType}>
            {eta.serviceType === 'minibus' ? 'Minibus' : 'Bus'}
          </Text>
        </View>
      </View>
      
      <View style={styles.middleSection}>
        <Text style={styles.destination} numberOfLines={1}>
          {eta.destination}
        </Text>
      </View>
      
      <View style={styles.rightSection}>
        <Text style={styles.remainingTime}>
          {formatRemainingTime(eta.remainingMinutes)}
        </Text>
        <Text style={styles.etaTime}>{formatTime(eta.eta)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  routeInfo: {
    alignItems: 'flex-start',
  },
  route: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceType: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  middleSection: {
    flex: 1,
    marginRight: 8,
  },
  destination: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'flex-end',
    minWidth: 60,
  },
  remainingTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  etaTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});
