import { Modal, Text, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 

import AppView from "../AppView";
import styles from "./styles";
import { FC } from "react";


type Props = {
    post: boolean
    setPost: (arg0: boolean) => void
    title: string
    buttonAction: () => void;
    buttonTitle: string
}

const PopupPost: FC<Props> = (props) => {

    return(

        <GestureRecognizer
                style={{flex: 1}}
                //onSwipeDown={() => props.setPost(!props.post)}
                >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.post}
                    onRequestClose={() => props.setPost(!props.post)}
                >
        
                <AppView>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.title}>{props.title}</Text>
                        <TouchableOpacity onPress= {() => props.setPost(!props.post)} style={styles.exit}>
                            <Feather name="x" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.box}>
                            {props.children}
                    </View>

                    <TouchableOpacity style={[styles.button, styles.elevation]} onPress={props.buttonAction} >
                        <Text style={styles.buttonText}>{props.buttonTitle}</Text>
                    </TouchableOpacity>
                </AppView>
                </Modal>
        </GestureRecognizer>

        
    );
}

export default PopupPost;
