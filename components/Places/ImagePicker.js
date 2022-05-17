import { View, Button, Alert } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

function ImagePicker() {
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
        console.log(image);
    }
    return (
        <View>
            <View>

            </View>
            <Button title='Take Image' onPress={takeImageHandler} />
        </View>
    )
}

export default ImagePicker;