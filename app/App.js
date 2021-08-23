/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { CNPJDetailsComponent } from './components/CNPJDetailsComponent';
import { getFormattedText, fetchData } from './actions';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [text, setText] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDetails = async() => {
    await setLoading(true);
    let response = await fetchData(text);
    await setLoading(false);
    setData(response);
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TextInput
        style={s.inputContainer}
        placeholder="Please insert here.."
        value={text}
        onKeyPress={(event) => {
          let {key} = event.nativeEvent;
          if ((key >= '0' && key <= '9') && text.length < 18) {
            let temp = text + key;
            setText(getFormattedText(temp));
          }
          if (key === 'Backspace') {
            let s = text.slice(0, -1);
            setText(s);
          }
        }}/>
        <TouchableOpacity style={s.submitButtonContainer} onPress={() => getDetails()}>
          <Text style={s.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {
          data &&
          <Text style={s.dataTitle}>Showing result for CNPJ - {getFormattedText(data.cnpj)}</Text>
        }
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        {
          !data && !loading &&
          <Text style={s.notAvailableText}>No data available</Text>
        }
        {
          loading &&
          <Text style={s.loadingText}>Fetching data...</Text>
        }
        {
          data && <CNPJDetailsComponent data={data}/>
        }

      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  inputContainer: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingLeft: 10
  },
  submitButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#00a8ff',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 30,
    textAlign: 'center'
  },
  notAvailableText: {
    textAlign: 'center',
    color: '#DDDDDD'
  },
  loadingText: {
    textAlign: 'center',
    color: '#00a8ff'
  }
});

export default App;
