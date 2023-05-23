import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

function SecretWord({word, background}) {
    const cardStyle = StyleSheet.compose(styles.secretCard, {backgroundColor: background})
  
    return (
      <Card mode="elevated" elevation={3} style={cardStyle}>
        <Text style={styles.secret}>{word}</Text>
      </Card>
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
