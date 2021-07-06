import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import {
    MediaPlayerState,
    useMediaStatus,
    useRemoteMediaClient,
    useStreamPosition,
  } from 'react-native-google-cast';
import { RectButton } from 'react-native-gesture-handler';
import { 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity,
    Image,
    View 
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

type AuthContextData = {

};

export const AuthContext = createContext({} as AuthContextData);

type AuthContextProviderProps = {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const client = useRemoteMediaClient();
    const status = useMediaStatus();
    const streamPosition = useStreamPosition();


    useEffect(() => {
        const started = client?.onMediaPlaybackStarted(() =>
            console.log('playback started')
        )
        const ended = client?.onMediaPlaybackEnded(() =>
            console.log('playback ended')
        )
    
        return () => {
            started?.remove()
            ended?.remove()
        }
    }, [client])

    
    return (
        <AuthContext.Provider 
            value={{
            }}
        >
            { children }

            { client && status && status.playerState !== MediaPlayerState.IDLE && (
                <RectButton 
                    style={[styles.container, { bottom: 70 }]}
                >
                    <Image
                        source={{ uri: status?.mediaInfo.metadata.images[0].url }}
                        style={{ width: 40, height: 40 }}
                        resizeMode={"contain"}
                    />
                    <Text style={styles.text}>
                        {status?.mediaInfo.metadata.title}
                    </Text>

                    {
                        status?.playerState === MediaPlayerState.PAUSED ? (
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={() => client.play()}
                            >
                                <FontAwesome5 name="play" color={colors.white} style={{ fontSize: 15 }} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={() => client.pause()}
                            >
                                <FontAwesome5 name="pause" color={colors.white} style={{ fontSize: 15 }} />
                            </TouchableOpacity>
                        )
                    }

                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => client.stop()}
                    >
                        <FontAwesome5 name="stop" color={colors.white} style={{ fontSize: 15 }} />
                    </TouchableOpacity>
                    
                </RectButton>
            )}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        height: 50,
        padding: 10,
        backgroundColor: "#4e4e4e",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
    },
    touchable: {
        padding: 5,
    },
    text: {
        fontFamily: fonts.text,
        fontSize: 15,
        color: colors.white
    }
})