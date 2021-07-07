import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet } from 'react-native';

import colors from "./../../../styles/colors";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ProgressBar = ({
    currentTime,
    duration,
    onSlideCapture,
    onSlideStart,
    onSlideComplete
}) => {
    const position = getMinutesFromSeconds(currentTime);
    const fullDuration = getMinutesFromSeconds(duration);

    const [ buttons, setButtons ] = useState();

    return (
        <View style={styles.wrapper}>
            <View style={{ width: "100%"}} >
                <Slider
                    value={currentTime}
                    minimumValue={0}
                    maximumValue={duration}
                    step={1}
                    onValueChange={handleOnSlide}
                    onSlidingStart={onSlideStart}
                    onSlidingComplete={onSlideComplete}
                    minimumTrackTintColor={colors.red}
                    maximumTrackTintColor={'#FFFFFF'}
                    thumbTintColor={colors.red}
                />
                <View style={styles.timeWrapper}>
                    <Text style={styles.timeLeft}>{position}</Text>
                    <Text style={styles.timeRight}>{fullDuration}</Text>
                </View>      
            </View>
        </View>
    );

    function getMinutesFromSeconds(time) {
        const minutes = time >= 60 ? Math.floor(time / 60) : 0;
        const seconds = Math.floor(time - minutes * 60);

        return `${minutes >= 10 ? minutes : '0' + minutes}:${
        seconds >= 10 ? seconds : '0' + seconds
        }`;
    }

    function handleOnSlide(time) {
        onSlideCapture({seekTime: time});
    }
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: "row",
        paddingBottom: 10
    },
    resolutionButton: {
        flex: 1,
        flexDirection: 'column',
        display: "flex",
        alignSelf: 'center',
        alignItems: 'center',
    },
    timeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    timeLeft: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
        paddingLeft: 10,
    },
    timeRight: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'right',
        paddingRight: 10,
    },
});

export default ProgressBar