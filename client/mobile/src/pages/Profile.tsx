import React, { useEffect, useState } from 'react';
import { 
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Profile() {
    const [ loading, setLoading ] = useState(false);

    if(loading) {
        return <Load />
    }

    return (
        <View style={styles.container}>
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
});
