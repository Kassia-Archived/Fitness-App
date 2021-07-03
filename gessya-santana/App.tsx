import React from 'react';
import { 
  useFonts,
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold,
} from '@expo-google-fonts/barlow';
import { 
  Courgette_400Regular,
} from '@expo-google-fonts/courgette';
import AppLoading from 'expo-app-loading';

import Routes from './src/routes';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    Barlow_700Bold,
    Courgette_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}