import React from 'react';
import { Text, StyleSheet, Dimensions, ImageBackground, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons'; 
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { LessonProps } from '../libs/storage';

interface LiveProps extends RectButtonProps {
    data: LessonProps
}

export const ItemLesson = ({ data, ...rest}: LiveProps) => {
    
    return (
        <RectButton 
            style={styles.container}
            {...rest}
        >
            <View style={styles.wrapperHeader}>
                <ImageBackground 
                    imageStyle={{ borderRadius: 16 }} 
                    source={{uri: data.thumbnail}} 
                    style={styles.image}
                >
                    <View style={styles.overlay}>
                        <FontAwesome5 
                            name="play-circle" 
                            size={24} 
                            color={colors.white}
                        />
                    </View>
                </ImageBackground>
                <Text style={styles.title}>
                    {data.title}
                </Text>
            </View>
            <View style={{ marginTop: 5 }} >
                <Text style={styles.text}>
                    {data.description}
                </Text>
            </View>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        marginTop: 25
    },
    wrapperHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    image: {
        resizeMode: "cover",
        width: 150,
        height: 75,
        marginRight: 10
    },
    overlay: {
        backgroundColor:'rgba(0,0,0,0.2)',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10, 
        justifyContent: "center",
        alignItems: "center"
    },
    
    title: {
        color: colors.white,
        fontFamily: fonts.heading,
    },
    text: {
        color: colors.white,
        fontFamily: fonts.text,
    }
});
