import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ProgramTypeButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function ProgramTypeButton({
  title,
  active = false,
  ...rest
}: ProgramTypeButtonProps) {
    return (
        <SafeAreaView
            style={[
                styles.container,
                active && styles.containerActive  
            ]} 
        >
            <RectButton 
                {...rest}
            >
                <Text 
                    style={[
                        styles.text,
                        active && styles.textActive
                    ]}
                >
                    {title}
                </Text>
        </RectButton>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 6,
        borderWidth: 1,
        borderColor: colors.white,
    },
    containerActive: {
        backgroundColor: colors.red,
        borderColor: colors.red,
    },
    text: {
        color: colors.white,
        fontFamily: fonts.text,
        textAlign: "center"
    },
    textActive: {
        fontFamily: fonts.heading,
        color: colors.white,
    }
});
