import React from 'react';
import { 
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Button } from "./../components/Button";

import happyGirl from './../assets/happy-girl.jpg'
import colors from './../styles/colors';
import fonts from './../styles/fonts';

export function Welcome() {
    const navigation = useNavigation();
    
    function handleNextScreen() {
        navigation.navigate('Home')
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={happyGirl} style={styles.image}>
                <View style={styles.overlay}>
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>
                            Método TURBO queime gordura corporal RÁPIDO,
                            com treinos de até 25min por dia
                        </Text>

                        <Button 
                            title="Começar"
                            onPress={handleNextScreen}
                            block
                        />
                    </View>
                </View>
            </ImageBackground>
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
        paddingHorizontal: 40
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
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    overlay: {
        backgroundColor:'rgba(0,0,0,0.5)',
        flex: 1,
    },
});