/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from './src/layout/themes';
import Menu from './src/components/menu/menu';

const App = () => {

  const [dark, setDark] = React.useState(false);

  const userTheme = dark ? darkTheme : lightTheme;

  const handleSwitch = () => {
    setDark(!dark);
  }

  const menuProps = { 
    switchValue: dark, 
    handleSwitch 
  };

  return (
    <PaperProvider theme={userTheme}>
      <View style={dark ? styles.dark : styles.light}>
        <Menu {...menuProps} />
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: '#07051c',
    height: '100%'
  },
  light: {
    backgroundColor: '#ffffff',
    height: '100%'
  },
});

export default App;
