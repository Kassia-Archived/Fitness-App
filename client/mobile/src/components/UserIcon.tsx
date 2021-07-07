import React from 'react';
import { Text, StyleSheet, Dimensions, Image, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PersonalProps extends RectButtonProps {
    data: {
        id: string;
        name: string;
        photo: string;
    }
}

export const UserIcon = ({ data, ...rest}: PersonalProps) => {
    return (
        <RectButton 
            style={styles.container}
            {...rest}
        >
            <Image
                source={require("./../assets/gessya.jpg")} 
                style={styles.image}
            />
            <Text style={styles.title}>
                {data.name}
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 125,
        margin: 10,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 150,
        resizeMode: 'center',
    },
    title: {
        color: colors.white,
        fontFamily: fonts.title,
        fontSize: 15
    }
});
