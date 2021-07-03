import React from 'react';
import { 
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import wateringImg from '../assets/watering.png'
import colors from './../styles/colors';
import fonts from './../styles/fonts';

export function Welcome() {
    const navigation = useNavigation();
    
    function handleNextScreen() {
        navigation.navigate('UserIdentification')
    }

    return(
        <View style={styles.wrapper}>
            <Text style={styles.title}>
                Gerencie{'\n'}
                suas plantas de{'\n'}
                forma fácil
            </Text>

            <TouchableOpacity 
                style={styles.button}
                activeOpacity={0.7}
                onPress={handleNextScreen}
            >
                <Feather 
                    name="chevron-right"
                    style={styles.buttonIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20 
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.white,
        marginTop: 38,
        lineHeight: 34
    },
    image: {
        height: Dimensions.get('window').width * 0.7,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.white,
        fontFamily: fonts.text
    },
    button: {
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        width: 56,
        height: 56
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 24
    },
});