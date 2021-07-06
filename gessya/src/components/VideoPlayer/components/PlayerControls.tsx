import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import colors from "./../../../styles/colors";

interface PlayerControlsProps {
    playing: boolean;
    showSkip: boolean;
    showPreviousAndNext: boolean,
    previousDisabled?: boolean;
    nextDisabled?: boolean;
    onPlay: () => void;
    onPause: () => void;
    skipForwards?: () => void;
    skipBackwards?: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
}

const PlayerControls = ({
    playing,
    showPreviousAndNext,
    showSkip,
    previousDisabled,
    nextDisabled,
    onPlay,
    onPause,
    skipForwards,
    skipBackwards,
    onNext,
    onPrevious,
}: PlayerControlsProps) => {
    return (
        <View style={styles.wrapper}>
            {showPreviousAndNext && (
            <TouchableOpacity
                style={[styles.touchable, previousDisabled && styles.touchableDisabled]}
                onPress={onPrevious}
                disabled={previousDisabled}>
                <FontAwesome5 name="caret-left" color={colors} style={{ fontSize: 30 }} />
            </TouchableOpacity>
            )}

            {showSkip && (
            <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
                <FontAwesome5 name="undo" color={colors.white} style={{ fontSize: 30 }} />
            </TouchableOpacity>
            )}

            <TouchableOpacity
            style={styles.touchable}
            onPress={playing ? onPause : onPlay}>
            {playing ? <FontAwesome5 name="pause" color={colors.white} style={{ fontSize: 30 }} /> : <FontAwesome5 name="play" color={colors.white} style={{ fontSize: 30 }} />}
            </TouchableOpacity>

            {showSkip && (
            <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
                <FontAwesome5 name="redo" color={colors.white} style={{ fontSize: 30 }} />
            </TouchableOpacity>
            )}

            {showPreviousAndNext && (
            <TouchableOpacity
                style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
                onPress={onNext}
                disabled={nextDisabled}>
                <FontAwesome5 name="caret-right" color={colors.white} style={{ fontSize: 30 }} />
            </TouchableOpacity>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 4,
    },
    touchable: {
        padding: 5,
    },
    touchableDisabled: {
        opacity: 0.3,
    },
});

export default PlayerControls;