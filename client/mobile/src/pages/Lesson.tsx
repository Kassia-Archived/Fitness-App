import React, { useEffect, useState, useLayoutEffect } from 'react';
import { 
    ScrollView,
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    FlatList,
    Dimensions,
    ActivityIndicator,
    View,
    Platform
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { LessonProps } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import VideoPlayerIOS from '../components/VideoPlayer/VideoPlayer.ios';
import VideoPlayerAndroid from '../components/VideoPlayer/VideoPlayer.android';

type ParamList = {
    Detail: {
      lesson: LessonProps;
    };
};

export function Lesson() {
    const route = useRoute<RouteProp<ParamList, 'Detail'>>();
    const navigation = useNavigation();

    const Component = Platform.select({
        ios: () => VideoPlayerIOS,
        android: () => VideoPlayerAndroid
    })();

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: route.params.lesson.title });
    }, [navigation, route]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.videoWrapper}>
                <Component data={route.params.lesson}/>
            </View>
            <ScrollView style={styles.descriptionWrapper}>
                <Text style={styles.text}>
                    {route.params.lesson.description}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    videoWrapper: {
        width: Dimensions.get("window").width, 
        height: Dimensions.get('window').width * (9 / 16)
    },
    container: {
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        backgroundColor: colors.background
    },
    descriptionWrapper: {
        margin: 20,
    },
    text: {
        fontFamily: fonts.text,
        color: colors.white
    },
    containerVideo: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
