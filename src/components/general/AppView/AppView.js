import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
       
    },
    image:{
        flex: 1,
    },
})

export default AppView;