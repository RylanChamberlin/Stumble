import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {elevation} from "../../common/styles";

import FilterChoice from "./FilterChoice";


export default function Search(){

    const [input, setInput] = useState("")
    const [filterBy, setFilterBy] = useState(false);

    const handleEndEditing = () => {
        if(!input) return
        setInput("")
    }
    

    return (
        <View>
            <View style = {[styles.searchBar, styles.elevation]}>
            <TextInput 
                style = {styles.input} 
                placeholder={'search by location...'}
                value={input} 
                onChangeText={(text) => {setInput(text);
                }}
                onEndEditing={handleEndEditing} 
            />

            
            </View>

            <View style = {styles.resultHeader}>
                <Text style = {styles.resultText}>RESULTS</Text>
                <TouchableOpacity onPress= {() => setFilterBy(!filterBy)}>
                    <Text style = {styles.filterByText}>FILTER BY</Text>
                </TouchableOpacity>
            </View>


            <FilterChoice filterBy = {filterBy} setFilterBy={setFilterBy}/>

            

        </View>
    );

}

const styles = StyleSheet.create({
   
    elevation,
    searchBar: {
        marginTop: 5,
        marginHorizontal: 25,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 40,
    },
    resultHeader: {
        flexDirection: "row",
        marginTop: 25,
        marginHorizontal: 25
    },
    resultText: {
        fontWeight: "bold",
        marginRight: 75
        
    },
    filterByText: {
        marginLeft: 135,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
      buttonOpen: {
        backgroundColor: "#F194FF",
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
        marginBottom: 15,
        textAlign: "center"
      }

})