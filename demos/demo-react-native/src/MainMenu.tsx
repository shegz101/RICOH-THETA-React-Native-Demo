import React from 'react';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  AppState,
  AppStateStatus,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './Styles';
import {initialize} from 'theta-client-react-native';
import { Tooltip } from "react-native-paper";
import { Cam } from '../assets';

const MainMenu = ({navigation}) => {
  const goTake = () => {
    navigation.navigate('take');
  };
  const goList = () => {
    navigation.navigate('list');
  };

  const initTheta = async () => {
    const endpoint = 'https://fake-theta.vercel.app';
    const config = {
      // clientMode: { // Client mode authentication settings
      //   username: 'THETAXX12345678',
      //   password: '12345678',
      // }
    };
    await initialize(endpoint, config);
    console.log('initialized.');
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      initTheta();
    }
  };

  // Helper function for link opening
  const openLink = (url: string): void => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };


  React.useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity onPress={() => openLink('https://github.com/ricohapi/theta-client')}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>RICOH THETA</Text>
      </TouchableOpacity>

      <Cam width={350} height={350}/>

      <View style={styles.buttonWrapper}>
        <Tooltip title="This button triggers the take photo component" 
          enterTouchDelay={200} leaveTouchDelay={200}>
          <TouchableOpacity style={styles.buttonBack} onPress={goTake}>
            <Text style={styles.button}>Take a Photo</Text>
          </TouchableOpacity>
        </Tooltip>
        
        <View style={styles.spacer} />

        <Tooltip title="This button lists the current photos" 
          enterTouchDelay={200} leaveTouchDelay={200}>
          <TouchableOpacity style={styles.buttonBack} onPress={goList}>
            <Text style={styles.button}>List Photos</Text>
          </TouchableOpacity>
        </Tooltip>
      </View>

    </SafeAreaView>
  );
};

export default MainMenu;
