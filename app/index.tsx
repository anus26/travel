import { View, Text } from 'react-native'
import React from 'react'
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet,  } from 'react-native';
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import * as Location from 'expo-location';
const index = () => {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View  style={styles.container}>
      <Text>Home</Text>
      
      <Text style={styles.paragraph}>{text}</Text>
      <MapView style={styles.map} />
   
    </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default index


