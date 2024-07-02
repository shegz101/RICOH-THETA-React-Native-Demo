import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainMenu from './MainMenu';
import TakePhoto from './TakePhoto';
import ListPhotos from './ListPhotos';
import PhotoSphere from './PhotoSphere';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#6200ee',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitle: '',
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            options={{title: 'Theta SDK sample app'}}
            name="main"
            component={MainMenu}
          />
          <Stack.Screen
            options={{title: 'Take Photo'}}
            name="take"
            component={TakePhoto}
          />
          <Stack.Screen
            options={{title: 'List Photos'}}
            name="list"
            component={ListPhotos}
          />
          <Stack.Screen
            options={{title: 'Sphere'}}
            name="sphere"
            component={PhotoSphere}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
