import { Modal, StyleSheet, Text, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import {elevation} from "../../../common/styles";
import Choices from "../Choices";



export default function FilterChoice({filterBy, setFilterBy}){
    return(
        <GestureRecognizer
            style={{flex: 1}}
            onSwipeDown={() => setFilterBy(!filterBy)}
            >
            <Modal
                animationType="slide"
                transparent={true}
                visible={filterBy}
                //onRequestClose={() => setFilterBy(!filterBy)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>-----</Text>

                        <Choices onClose = {() => setFilterBy(!filterBy)}/>
                
                    </View>
                </View>
            </Modal>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
   
    elevation,
   
    centeredView: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        marginTop: 125
      },
      modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 25,
        textAlign: "center"
      }

})