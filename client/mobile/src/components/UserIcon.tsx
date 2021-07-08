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
                source={{ uri: data.photo }} 
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
        width: 125,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 150,
        resizeMode: 'cover',
    },
    title: {
        color: colors.white,
        fontFamily: fonts.title,
        fontSize: 15
    }
});
