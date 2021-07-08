import React, { useState, useEffect, useContext } from 'react';
import { 
    StyleSheet, 
    Dimensions, 
    View, 
    Text, 
    ScrollView, 
    StatusBar,
    AppState
} from 'react-native';
import Video from 'react-native-video';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LessonProps } from '../../libs/storage';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface VideoProps {
    data: LessonProps
}

const VideoPlayer = ({ data }: VideoProps) => {
    const isFocused = useIsFocused();
    const videoRef = React.createRef<Video>();

    const navigation = useNavigation();

    const [ state, setState ] = useState({
        fullscreen: false,
        play: true,
        currentTime: 0,
        duration: 0,
        showControls: true,
        loading: true,
    });

    const [ videoPaused, toggleVideoPaused ] = useState(false);
    const [ appActive, setAppActive ] = useState(false);

    const handleAppStateChange = nextAppState => {
        if (nextAppState === 'active') {
            setAppActive(true);
        } else {
            setAppActive(false);
        }
    };

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => AppState.removeEventListener('change', handleAppStateChange);
    }, []);

    useEffect(() => {
        if(appActive){
            toggleVideoPaused(false)
        }else{
            toggleVideoPaused(true)
            setTimeout(() => {
                toggleVideoPaused(false)
            }, 2 * 1000);
        }
    }, [appActive]);


    const onLoadEnd = (data) => {
        videoRef.current.seek(0);

        setState(s => ({
            ...s,
            duration: data.duration,
            currentTime: 0,
            loading: false,
        }));
    }

    const onEnd = () => {
        setState({...state, play: false});
        // videoRef.current.seek(0);
    }

    const onProgress = async (data) => {
        setState(s => ({
            ...s,
            currentTime: data.currentTime,
        }));
    }

    return (

        <Video
            ref={videoRef}
            source={{ uri: data.video }}
            style={styles.video}
            controls={true}
            resizeMode={'cover'}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            ignoreSilentSwitch={"ignore"}
            paused={!state.play}
            playInBackground={true}
            playWhenInactive={true}
        />

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.red,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: Dimensions.get("window").width, 
        height: Dimensions.get('window').width * (9 / 16)
    },
});

export default VideoPlayer