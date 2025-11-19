import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BusStop } from '../types';
import { formatDistance } from '../utils/formatters';

interface BusStopItemProps {
  busStop: BusStop;
  onPress: (busStop: BusStop) => void;
}

export const BusStopItem: React.FC<BusStopItemProps> = ({ busStop, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(busStop)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📍</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{busStop.name}</Text>
        {busStop.distance !== undefined && (
          <Text style={styles.distance}>
            {formatDistance(busStop.distance)} away
          </Text>
        )}
      </View>
      
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  arrowContainer: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 24,
    color: '#CCC',
    fontWeight: 'bold',
  },
});
