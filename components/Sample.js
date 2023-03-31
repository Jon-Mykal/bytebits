import { StyleSheet, View, Text } from "react-native";

export default function Sample() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sample</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 24
    }
});