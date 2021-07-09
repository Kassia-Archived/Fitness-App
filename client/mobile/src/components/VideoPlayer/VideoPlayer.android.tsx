import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PlayerControls from "./components/PlayerControls"
import ProgressBar from "./components/ProgressBar"

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useRemoteMediaClient, useCastSession } from 'react-native-google-cast';
import { LessonProps } from '../../libs/storage';
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface VideoProps {
    data: LessonProps
}

const VideoPlayer = ({ data }: VideoProps) => {
    const client = useRemoteMediaClient();
    const session = useCastSession();
    const videoRef = React.createRef<Video>();
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    
    const [state, setState] = useState({
        fullscreen: false,
        play: true,
        currentTime: 0,
        duration: 0,
        showControls: true,
        loading: true,
    });
    
    useEffect(() => {

        Orientation.addOrientationListener(handleOrientation);

        return
    }, []);

    useEffect(() => {
        const started = session?.getActiveInputState().then((r) => {
            if (r === "unknown"){
                startCast("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", data.thumbnail, data.title, '-', state.duration, state.currentTime, 'video/*')
            }
        })
    }, [session])

    const startCast = (video, image, title, subtitle, duration, currentTime, mediaType) => {
        client.loadMedia({
            autoplay: true,
            mediaInfo: {
                contentUrl: video,
                contentType: mediaType,
                metadata: {
                    images: [
                        {
                            url: image,
                        },
                    ],
                    title: title,
                    subtitle: subtitle,
                    studio: 'Fitness APP',
                    type: 'movie',
                },
                streamDuration: duration,
            },
            startTime: currentTime,
        })
    };


    const handleOrientation = (orientation) => {
        orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
        ? (setState(s => ({...s, fullscreen: true })), StatusBar.setHidden(true))
        : (setState(s => ({...s, fullscreen: false })), StatusBar.setHidden(false));
    }
    

    const skipBackward = () => {
        videoRef.current.seek(state.currentTime - 15);
        setState({...state, currentTime: state.currentTime - 15});
    }

    const skipForward = () => {
        videoRef.current.seek(state.currentTime + 15);
        setState({...state, currentTime: state.currentTime + 15});
    }

    const onSeek = (data: any)  => {
        videoRef.current.seek(data.seekTime);
        setState({...state, currentTime: data.seekTime});
    }

    const onLoadEnd = (data: any) => {
        // videoRef.current.seek(0);
        console.log("entrei")
        
        setState(s => ({
            ...s,
            duration: data.duration,
            currentTime: 0,
            loading: false,
        }));
    }

    const onProgress = async (data: any) => {
        setState(s => ({
            ...s,
            currentTime: data.currentTime,
        }));
    }

    const onEnd = () => {
        setState({...state, play: false});
        videoRef.current.seek(0);
    }

    const showControls = () => {
        state.showControls
        ? setState({...state, showControls: false})
        : setState({...state, showControls: true});
    }

    const handleFullscreen = () => {
        state.fullscreen ? Orientation.lockToPortrait() : Orientation.lockToLandscape();
    }

    const handlePlayPause = () => {
        if (state.play) {
            setState({...state, play: false, showControls: true});
            return;
        }
        
        if(client){
            startCast("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", data.thumbnail, data.title, '-', state.duration, state.currentTime, 'video/*')
            setTimeout(() => setState(s => ({...s, showControls: false})), 2000);
        }else{
            setState({...state, play: true});
            setTimeout(() => setState(s => ({...s, showControls: false})), 2000);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={showControls}>
                <View>
                    <Video
                        ref={videoRef}
                        source={{uri: data.video }}
                        style={state.fullscreen ? styles.fullscreenVideo : styles.video}
                        controls={false}
                        resizeMode={'contain'}
                        onLoad={onLoadEnd}
                        onProgress={onProgress}
                        onEnd={onEnd}
                        paused={!state.play}
                        playInBackground={true}
                    />
                    {state.showControls  && (
                        <View style={styles.controlOverlay}>
                            <View style={styles.wrapper}>
                                {/* <CastButton style={styles.chromecastButton} /> */}
                                <TouchableOpacity
                                    onPress={handleFullscreen}
                                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                                    style={styles.fullscreenButton}>
                                    {state.fullscreen ? <FontAwesome5 name="compress" color={colors.white} style={{ fontSize: 30 }} /> : <FontAwesome5 name="expand" color={colors.white} style={{ fontSize: 30 }} /> }
                                </TouchableOpacity>
                            </View>
                            <PlayerControls
                                onPlay={handlePlayPause}
                                onPause={handlePlayPause}
                                playing={state.play}
                                showPreviousAndNext={false}
                                showSkip={true}
                                skipBackwards={skipBackward}
                                skipForwards={skipForward}
                            />
                            <ProgressBar
                                currentTime={state.currentTime}
                                duration={state.duration > 0 ? state.duration : 0}
                                onSlideStart={handlePlayPause}
                                onSlideComplete={handlePlayPause}
                                onSlideCapture={onSeek}
                            />
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
            
            {
                !state.fullscreen && (
                    <ScrollView>
                        <Text style={[styles.texto, styles.tituloVideo]}>{data.title}</Text>
                        <Text style={styles.text}>
                            {data.description}
                        </Text>        
                    </ScrollView>
                )
            }
            
        </View>
    );

    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    video: {
        height: Dimensions.get('window').width * (9 / 16),
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
    },
    texto: {
        color: colors.white,
    },
    wrapper: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    fullscreenVideo: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').height,
        backgroundColor: 'black',
    },
    controlOverlayFullVideo: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000c4',
    },
    text: {
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 20,
        textAlign: 'justify',
        color: colors.white,
        fontFamily: fonts.text
    },
    chromecastButton: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
        position: "absolute",
        right: 60,
        top: 5,
        tintColor: "white",
        width: 40, 
        height: 40
    },
    fullscreenButton: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
        position: "absolute",
        top: 5
    },
    controlOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000c4',
    },
    tituloVideo: {
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: fonts.text,
        textTransform: 'uppercase'
    },
});

export default VideoPlayer