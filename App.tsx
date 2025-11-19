import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ETAScreen } from './src/screens/ETAScreen';
import { BusStop } from './src/types';

export default function App() {
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);

  const handleStopSelect = (stop: BusStop) => {
    setSelectedStop(stop);
  };

  const handleBack = () => {
    setSelectedStop(null);
  };

  return (
    <View style={styles.container}>
      {selectedStop ? (
        <ETAScreen busStop={selectedStop} onBack={handleBack} />
      ) : (
        <HomeScreen onStopSelect={handleStopSelect} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
