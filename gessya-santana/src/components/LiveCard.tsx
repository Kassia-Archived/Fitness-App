import React from 'react';
import { Text, StyleSheet, Dimensions, ImageBackground, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { parseISO, formatRelative, intlFormat } from "date-fns";
import { zonedTimeToUtc } from 'date-fns-tz';
import * as moment from 'moment';
import pt from 'date-fns/locale/pt-BR';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface LiveProps extends RectButtonProps {
    data: {
        id: string;
        name: string;
        difficulty: string;
        thumbnail: string;
        datetime: string;
    }
}

export const LiveCard = ({ data, ...rest}: LiveProps) => {
    const today = new Date();
    const date = new Date(data.datetime);
    const active = (today.getDate() === date.getDate()) && (today.getMonth() === date.getMonth());

    const relative = formatRelative(
        date,
        today,
        { locale: pt }
    );
      
    
    return (
        <RectButton 
            style={styles.container}
            {...rest}
        >
            <ImageBackground 
                imageStyle={{ 
                    borderRadius: 16, 
                    borderColor: active ? colors.red : colors.black, 
                    borderWidth: 2 
                }} 
                source={{uri: data.thumbnail}} 
                style={styles.image}
            >
                <View style={styles.overlay}>
                    <Text style={styles.title}>
                        {data.name}
                    </Text>
                    <Text style={styles.text}>
                        {data.difficulty}
                    </Text>
                </View>
            </ImageBackground>
            <Text 
                numberOfLines={1}
                style={[
                    styles.text, 
                    { marginLeft: 10, paddingTop: 5, color: active ? colors.red : colors.white}
                ]}
            >
                {active ? "Hoje" : relative}
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    overlay: {
        backgroundColor:'rgba(0,0,0,0.2)',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10, 
        justifyContent: "flex-end",
    },
    container: {
        flex: 1,
        width: (Dimensions.get("window").width / 2) - 40,
        marginTop: 10,
        marginRight: 15
    },
    title: {
        fontSize: 20,
        color: colors.white,
        fontFamily: fonts.heading,
    },
    text: {
        color: colors.white,
        fontFamily: fonts.text,
    }
});
