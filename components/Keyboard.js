import { useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { endGameContext } from './EndGameContext';

function Keyboard({handleKeyPress}) {
  const keyLines = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <>
      {keyLines.map((keys, index) =>
        <KeyboardLine key={index} keys={keys} handleKeyPress={handleKeyPress} />
      )}
    </>
  );
}
  
function KeyboardLine({keys, handleKeyPress}) {
  return (
    <View style={styles.keyboardLine}>
      {keys.map((key) =>
        <KeyboardKey key={key} currentKey={key} handleKeyPress={handleKeyPress}/>
      )}
    </View>
  );
}

function KeyboardKey({currentKey, handleKeyPress}){
  const { endGame } = useContext(endGameContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const color1 = isDisabled ? 'lightgray' : 'black';
  const color2 = isDisabled ? 'gray' : 'black';
  const keyStyle = StyleSheet.compose(styles.key, {color: color1, borderColor: color2})

  return (
    <Pressable key={currentKey} disabled={isDisabled || endGame} onPressIn={() => {setIsDisabled(true); handleKeyPress(currentKey);}}>
      <Text style={keyStyle}>{currentKey}</Text>
    </Pressable>
  );
}
  
const styles = StyleSheet.create({
  keyboardLine: {
    flexDirection: 'row'
  },

  key: {
    fontFamily: 'DM-Mono',
    fontSize: 20,
    textAlign: 'center',
    userSelect: 'none',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    margin: 2
  }
});
  
export default Keyboard  