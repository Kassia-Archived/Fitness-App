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

import { ProgramProps, LessonProps } from '../libs/storage';

import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import { ItemLesson } from '../components/ItemLesson';

type ParamList = {
    Detail: {
      program: ProgramProps;
    };
};

export function Program() {
    const route = useRoute<RouteProp<ParamList, 'Detail'>>();
    const navigation = useNavigation();

    const [ lessons, setLessons ] = useState<LessonProps[]>([]);
    const [ filteredLessons, setFilteredLessons ] = useState<LessonProps[]>([]);

    const [ page, setPage ] = useState(1);
    const [ loadingMore, setLoadingMore ] = useState(false);

    const [ loading, setLoading ] = useState(true);

    async function fetchLessons() {
        const { data } = await api
          .get(`lessons?_sort=name&order=asc&_page=${page}&_limit=8`);
        
        if(!data) {
          return setLoading(true);
        }
    
        if(page > 1) {
            setLessons(oldValue => [...oldValue, ...data])
            setFilteredLessons(oldValue => [...oldValue, ...data])
        } else {
            setLessons(data);
            setFilteredLessons(data);
        }
        
        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1) {
            return;
        }

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchLessons();
    }

    function handleLessonSelect(lesson: LessonProps) {
        navigation.navigate('Lesson', { lesson });
    }

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: route.params.program.title });
    }, [navigation, route]);

    useEffect(() => {
        fetchLessons();
    }, []);
    

    if(loading) {
        return <Load />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image
                source={{ uri: route.params.program.thumbnail}}
                resizeMode="cover"
                style={styles.imageBackground}
            />
            <View style={styles.lessons}>
                <FlatList 
                    data={filteredLessons}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <ItemLesson
                            data={item}
                            onPress={() => handleLessonSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.red} />
                        : <></>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        position: "relative",
        top: 0,
        left: 0,
        width:  Dimensions.get('window').width,
        height: Dimensions.get('window').width * (9 / 16),
        opacity: 0.6,
    },
    container: {
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        backgroundColor: colors.background
    },
    lessons: {
        flex: 1,
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
});
