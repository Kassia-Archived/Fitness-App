import React, { useEffect, useState } from 'react';
import { 
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { LiveCard } from '../components/LiveCard';
import { Load } from '../components/Load';
import { LiveProps } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import { UserIcon } from '../components/UserIcon';

interface PersonalProps {
    id: string;
    name: string;
    photo: string;
}
const personals: PersonalProps[] = [{id: "1", name: "Jane Doe", photo: "https://image.freepik.com/fotos-gratis/mulher-desportiva-saiu-demonstrar-muscule-em-estudio_273443-1245.jpg"}]

export function Home() {
    const [ loading, setLoading ] = useState(true);
    const [ lives, setLives ] = useState<LiveProps[]>([]);
    const [ pageLive, setPageLive ] = useState(1);
    const [ loadingMoreLive, setLoadingMoreLive ] = useState(false);

    async function fetchLives() {
        const { data } = await api
            .get(`lives?_sort=name&order=asc&_page=${pageLive}&_limit=3`);
        
        if(!data) {
          return setLoading(true);
        }
    
        if(pageLive > 1) {
            setLives(oldValue => [...oldValue, ...data]);
        } else {
            setLives(data);
        }
        setLoading(false);
        setLoadingMoreLive(false);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1) {
            return;
        }
    
        setLoadingMoreLive(true);
        setPageLive(oldValue => oldValue + 1);
        fetchLives();
    }

    useEffect(() => {
        fetchLives();
    }, [])


    if(loading) {
        return <Load />
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <Header />
            <View style={styles.content}>
                <Input 
                    placeholder={"Pesquisar..."}
                />
                <Text style={styles.title}>Personal trainer</Text>
                <FlatList
                    data={personals}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <UserIcon
                            data={item}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.userList}
                />
                <Text style={styles.title}>Lives</Text>
                <FlatList
                    data={lives}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <LiveCard
                            data={item}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.livesList}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMoreLive
                        ? <View style={styles.wrapperActiveIndicator}><ActivityIndicator color={colors.red} /></View>
                        : <></>
                    }
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        backgroundColor: colors.background,
    },
    content: {
        justifyContent: "flex-start",
        paddingVertical: 20
    },
    title: {
        fontFamily: fonts.heading,
        color: colors.white,
        marginLeft: 10,
        marginTop: 20,
        fontSize: 25
    },
    livesList: {
        height: 250,
        justifyContent: 'center',
    },
    userList: {
        height: 150,
        justifyContent: 'center',
    },
    wrapperActiveIndicator: {
        height: 250, 
        flex: 1, 
        justifyContent: "center" 
    }
});
