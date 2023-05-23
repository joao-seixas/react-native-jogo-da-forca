import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

function NewGameButton({isDisabled, newGame}) {
  return (
    <>
      <Button
        mode="elevated"
        buttonColor="white"
        textColor="black"
        style={styles.newGameButton}
        disabled={isDisabled}
        onPress={newGame}
      >
        Novo Jogo
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  newGameButton: {
    margin: 20
  }
});

export default NewGameButton