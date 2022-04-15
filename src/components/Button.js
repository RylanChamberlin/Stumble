import {Text, TouchableOpacity, View } from "react-native";

export default function Button({name, buttonStyle, buttonTextStyle, buttonContainerStyle}){

    return(
        <TouchableOpacity style = {buttonContainerStyle} onPress={() => console.warn({name})}>
            <View style = {buttonStyle}>
                <Text style = {buttonTextStyle}>{name}</Text> 
            </View>
        </TouchableOpacity>
    );

}
