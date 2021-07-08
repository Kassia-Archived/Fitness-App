import React, { useEffect, useState } from 'react';
import { 
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ProgramProps, ProgramTypesProps } from '../libs/storage';

import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import { PrimaryCard } from '../components/PrimaryCard';
import { ProgramTypeButton } from '../components/ProgramTypeButton';

export function Programs() {
    const navigation = useNavigation();

    const [ loading, setLoading ] = useState(true);
    const [ programTypes, setProgramTypes ] = useState<ProgramTypesProps[]>([]);
    const [ typeSelected, setTypeSelected ] = useState('all');
    const [ programs, setPrograms ] = useState<ProgramProps[]>([]);
    const [ filteredPrograms, setFilteredPrograms ] = useState<ProgramProps[]>([]);

    const [ page, setPage ] = useState(1);
    const [ loadingMore, setLoadingMore ] = useState(false);
    const [ isRefreshing, setIsRefreshing ] = useState(false)

    function handleTypeSelected(type: string) {
        setTypeSelected(type);
    
        if(type === 'all') {
          return setFilteredPrograms(programs)
        }
    
        const filtered = programs.filter(program =>
            program.type === type
        );
    
        setFilteredPrograms(filtered);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1) {
            return;
        }

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPrograms();
    }

    function handleProgramSelect(program: ProgramProps) {
        navigation.navigate('Program', { program });
    }

    async function fetchPrograms() {
        const { data } = await api
          .get(`programs?_sort=name&order=asc&_page=${page}&_limit=8`);
        
        if(!data) {
          return setLoading(true);
        }
        
        if(page > 1) {
            setPrograms(oldValue => [...oldValue, ...data])
            setFilteredPrograms(oldValue => [...oldValue, ...data])
        } else {
            setPrograms (data);
            setFilteredPrograms(data);
        }
        
        setLoading(false);
        setLoadingMore(false);
    }

    useEffect(() => {
        fetchPrograms();
    }, []);


    useEffect(() => {
        async function fetchProgramTypes() {
            const { data } = await api
                .get('programs_types?_sort=title&order=asc');
          
                setProgramTypes([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }
        fetchProgramTypes();
    }, []);

    const onRefresh = React.useCallback(() => {
        setIsRefreshing(true);
        fetchPrograms();
        setIsRefreshing(false);
    }, []);


    if(loading) {
        return <Load />
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Programas</Text>
                <View>
                    <FlatList
                        data={programTypes}
                        keyExtractor={(item) => String(item.key)}
                        renderItem={({ item }) => (
                            <ProgramTypeButton 
                                title={item.title} 
                                active={item.key === typeSelected}
                                onPress={() => handleTypeSelected(item.key)}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.programTypeList}
                    />
                </View>
                <View style={styles.programs}>
                    <FlatList 
                        data={filteredPrograms}
                        refreshing={isRefreshing}
                        refreshControl={ 
                            <RefreshControl 
                                refreshing={isRefreshing} 
                                onRefresh={onRefresh} 
                                tintColor={colors.white}
                            /> 
                        }
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <PrimaryCard 
                                data={item}
                                onPress={() => handleProgramSelect(item)}
                            />
                        )}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        backgroundColor: colors.background
    },
    content: {
        flex: 1,
        justifyContent: "flex-start"
    },
    title: {
        fontFamily: fonts.heading,
        color: colors.white,
        marginLeft: 10,
        marginTop: 20,
        fontSize: 25
    },
    programTypeList: {
        height: 40,
        marginVertical: 20
    },
    programs: {
        flex: 1,
        justifyContent: "space-between",
    },
});
