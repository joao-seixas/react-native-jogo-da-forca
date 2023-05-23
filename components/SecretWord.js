import { Text, StyleSheet, Dimensions } from 'react-native';
import { Card, ProgressBar } from 'react-native-paper';

function SecretWord({word, background}) {
  const cardStyle = StyleSheet.compose(styles.secretCard, {backgroundColor: background});
  const barWidth = Dimensions.get('window').width - 20;

  return (
    <>
      {word ?
        <Card mode="elevated" elevation={3} style={cardStyle}>
          <Text style={styles.secret}>{word}</Text>
        </Card> :
        <ProgressBar indeterminate={true} color="darkgray" style={{width: barWidth, height: 5, marginTop: 20, marginBottom: 50}} />
      }
    </>
  );
}

export default SecretWord

const styles = StyleSheet.create({
  secretCard: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 12,
    padding: 3,
    paddingBottom: 6
  },

  secret: {
    fontFamily: 'DM-Mono',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 15,
  }
});
