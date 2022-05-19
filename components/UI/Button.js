import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

function Button({ onPress, children }) {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Text style={styles.button}>{children}</Text>
        </Pressable>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.backgroundColor,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        borderRadius: 4
    },
    pressed: {
        opacity: 0.7
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: '#ffffff'
    }
});