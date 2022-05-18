import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import styles from './styles';

const AppView = props => {

    const image = require('../../../../src/assets/images/yeet.jpeg');

    return (

        <ImageBackground style= { styles.image } source={image} resizeMode='cover'>
            <SafeAreaView style={{...styles.container, ...props.style}}>
                {props.children}
            </SafeAreaView>
        </ImageBackground>
    );
};

export default AppView;