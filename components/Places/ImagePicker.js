import { useState } from 'react';
import { View, Text, Button, Alert, Image, StyleSheet } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker() {
    const [pickedImage, setPickedImage] = useState();
    const [camePermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        if (camePermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }
        if (camePermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Permission denied, action terminated!');
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri);
    }
    let imagePreview = <Text>No Image Taken Yet!</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc',
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
});