import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { EvilIcons } from '@expo/vector-icons'; 

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const [username, setUsername] = useState<string>("Kassia Fraga");
    const formattedDate = format(
        new Date(), 
        "cccc, dd 'de' MMMM'",
        {locale: pt}
    );

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.complement}>{formattedDate}</Text>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{username}</Text>
            </View>

            <EvilIcons name="user" size={75} color="white" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    complement: {
        fontSize: 15,
        color: colors.white,
        fontFamily: fonts.complement,
    },
    greeting: {
        fontSize: 25,
        color: colors.white,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 30,
        fontFamily: fonts.title,
        color: colors.white,
        lineHeight: 40
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    }
});
