import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import OutlinedButton from '../UI/OutlinedButton';
import { getMapPreview } from '../../utils/location';

function LocationPicker() {
    const navigation = useNavigation();

    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Permission denied, action terminated!');
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
        locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc',
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
});