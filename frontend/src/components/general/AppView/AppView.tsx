import React, { FC } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import styles from './styles';

type Props = {
    style?: any
}

const AppView: FC<Props> = props => {

    const image = require('../../../assets/images/yeet.jpeg');

    return (

        <ImageBackground style= { styles.image } source={image} resizeMode='cover'>
            <SafeAreaView style={{...styles.container, ...props.style}}>
                {props.children}
            </SafeAreaView>
        </ImageBackground>
    );
};

export default AppView;