import React, { useState } from 'react';
import { 
  TextInput, 
  StyleSheet, 
  TouchableOpacityProps,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  placeholder: string;
}

export function Input({ 
    placeholder, 
    ...rest 
}: ButtonProps) {
    const [ inputValue, setInputValue ] = useState<string>()
    const [ isFocused, setIsFocused ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!inputValue);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setInputValue(value);
    }

    return (
        <View style={styles.container}>
            <Feather name="search" size={24} color="white" />            
            <TextInput
                placeholder={placeholder}
                style={[
                    styles.input,
                    (isFocused || isFilled) && { borderColor: colors.black } 
                ]}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                placeholderTextColor="#FFF"
                textAlign={"left"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#232323",
        borderRadius: 16,
        padding: 10,
    },
    icon: {

    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.text,
        color: colors.white,
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: "#232323",
    },
});
