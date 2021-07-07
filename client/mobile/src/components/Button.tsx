import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  TouchableOpacityProps,
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading ?: boolean;
  block ?: boolean;
}

export function Button({ 
  title, 
  isLoading = false,
  block = false, 
  ...rest 
}: ButtonProps) {
  return (
    <TouchableOpacity 
      disabled={!isLoading ? rest?.disabled : isLoading}
      style={[ 
        styles.container, 
        { 
          backgroundColor: isLoading ? colors.red : colors.red,
          width: block ? "100%" : "auto"
        } 
      ]}
      {...rest}
    >
      { isLoading && <></>}
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  }
});
