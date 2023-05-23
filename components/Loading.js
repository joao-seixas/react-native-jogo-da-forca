import { Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

function Loading({fontLoaded, wordLoaded}) {
    return (
        <>
            <ActivityIndicator animating={true} color="black" size="large" style={{ marginBottom: 20 }}/>
            {!fontLoaded && <Text style={styles.loadingText}>Carregando fonte...</Text>}
            {!wordLoaded && <Text style={styles.loadingText}>Buscando palavra...</Text>}
        </>
    );
}

const styles = StyleSheet.create({
    loadingText: {
      fontSize: 20,
      margin: 3
    }
});

export default Loading