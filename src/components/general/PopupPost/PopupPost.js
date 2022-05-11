import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 
import {elevation} from "../../../common/styles"
import AppView from "../../general/AppView";

export default function PopupPost(props){

    return(

        <GestureRecognizer
                style={{flex: 1}}
                // onSwipeDown={() => props.setPost(!props.post)}
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

const styles = StyleSheet.create({
   
    title:{
        color: 'white',
        fontSize: 35,
    },

    box:{
        height: "50%",
        padding: 15,
        backgroundColor: '#f2f1f1',
        borderWidth: 1,
        borderRadius: 10
    },
   
    button:{
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 230,
        marginTop: 5,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        
    },
    buttonText:{
        fontSize: 20,
        fontWeight: "bold"
    },
    elevation,

    exit: {
        alignSelf: 'flex-end',
        position: 'absolute',
        padding: 15
    }

})