import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAppSelector } from "../../../app/hooks";
import useNearby from "../../../hooks/useNearby";
import { RootStackParamList } from "../../../navigation/Nav";
import { sendMessage } from "../../../services/sendPosts";
import Dropdown from "../Dropdown";
import styles from "./styles";


type NavProp = NativeStackNavigationProp<RootStackParamList, 'BottomTab'>;

const NewPostbox = () => {

    const location = useAppSelector(state => state.location.coords);
    const {data: data, isLoading, searchNearbyPhone} = useNearby();
    
    const navigation = useNavigation<NavProp>()
    const [postInput, setPostInput] = useState('')
    const [selected, setSelected] = useState(undefined);

    useEffect(() => {
        searchNearbyPhone(200);
    }, [location])

    const postBar = () => {
        
        if(sendMessage(postInput, selected)){
            navigation.navigate("BottomTab")
        }   
        
    }
    
    return (
        <>
            <View style = {styles.box}>
               
                <Dropdown label="Select Bar" data={data} onSelect={setSelected} />
                <TextInput 
                    placeholder='Type SOMETHING........'
                    style = {styles.textInput} 
                    multiline={true} 
                    numberOfLines={3}
                    maxLength = {256}
                    value={postInput} 
                    onChangeText={(text: any) => {setPostInput(text)}}
                />
                
            </View>
            <TouchableOpacity style={[styles.button, styles.elevation]} onPress={() => postBar()} >
                <Text style={styles.buttonText}>POST</Text>
            </TouchableOpacity>
        </>
    )
}

  
export default NewPostbox