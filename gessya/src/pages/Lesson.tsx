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
    View
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { LessonProps } from '../libs/storage';

import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import { ItemLesson } from '../components/ItemLesson';
import VideoPlayer from '../components/VideoPlayer/views/VideoPlayer.android';

type ParamList = {
    Detail: {
      lesson: LessonProps;
    };
};

export function Lesson() {
    const route = useRoute<RouteProp<ParamList, 'Detail'>>();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: route.params.lesson.title });
    }, [navigation, route]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.videoWrapper}>
                <VideoPlayer data={route.params.lesson}/>
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
        backgroundColor: "yellow",
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
