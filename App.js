import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import Hanged from './components/Hanged';
import SecretWord from './components/SecretWord';
import Keyboard from './components/Keyboard';
import NewGameButton from './components/NewGameButton';
import Loading from './components/Loading';
import { endGameContext } from './components/EndGameContext';

function App() {
  const [errors, setErrors] = useState(0);
  const [visibleWord, setVisibleWord] = useState({word: null, background: 'white'});
  const [endGame, setEndGame] = useState(false);
  const [monoFont] = useFonts({'DM-Mono': require('./assets/DMMono-Regular.ttf')});
  const randomWord = useRef(null);
  const normalizedRandomWord = useRef(null);

  useEffect(getNewWord, []);

  function getNewWord() {
    fetch('https://api.dicionario-aberto.net/random')
      .then((data) => data.json())
      .then((data) => randomWord.current = data.word.toUpperCase())
      .then(() => normalizedRandomWord.current = randomWord.current.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      .then(createVisibleWord);
  }

  function createVisibleWord() {
    setVisibleWord({word: randomWord.current.replace(/[^-]/g, '_'), background: 'white'});
  }

  function handleKeyPress(key) {
    let tempVisibleWord = [];

    for (let index = 0; index < visibleWord.word.length; index++) {
      normalizedRandomWord.current[index] === key ?
        tempVisibleWord.push(randomWord.current[index]) :
        tempVisibleWord.push(visibleWord.word[index]);
    }

    tempVisibleWord.join('') === visibleWord.word ? addError() : verifyVictory(tempVisibleWord);
  }

  function addError() {
    errors < 5 ? setErrors(errors + 1) : loseGame();
  }

  function verifyVictory(tempVisibleWord) {
    if (tempVisibleWord.join('') === randomWord.current) {
      setVisibleWord({word: tempVisibleWord.join(''), background: 'lightgreen'});
      setEndGame(true);
    } else {
      setVisibleWord({word: tempVisibleWord.join(''), background: 'white'});
    }
  }

  function loseGame() {
    setErrors(errors + 1);
    setEndGame(true);
    setVisibleWord({word: randomWord.current, background: 'darkred'});
  }

  function newGame() {
    setEndGame(false);
    setVisibleWord({word: null, background: 'white'});
    setErrors(0);
    getNewWord();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={true} />
      {(monoFont && randomWord.current) ? 
        <>
          <Text style={styles.title}>Jogo da Forca</Text>
          <Hanged errors={errors} />
          <SecretWord word={visibleWord.word} background={visibleWord.background} />
          <endGameContext.Provider value={{ endGame, setEndGame }}>
            <Keyboard key={randomWord.current} handleKeyPress={handleKeyPress} />
          </endGameContext.Provider>
          <NewGameButton isDisabled={!endGame} newGame={newGame} />
        </> :
          <Loading fontLoaded={monoFont} wordLoaded={randomWord.current} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'DM-Mono',
    fontSize: 40
  }
});

export default App;