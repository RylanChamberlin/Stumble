import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAppSelector } from "../../../app/hooks";
import useNearby from "../../../hooks/useNearby";
import { RootStackParamList } from "../../../navigation/Nav";
import { sendMessage } from "../../../services/sendPosts";
import Dropdown from "../Dropdown";
import styles from "./styles";


type NavProp = NativeStackNavigationProp<RootStackParamList, 'PostScreen'>;
type NewPostboxProps = {
    bar?: any
}

const NewPostbox: FC<NewPostboxProps>= ({bar}) => {

    const location = useAppSelector(state => state.location.coords);
    const {data: data, isLoading, searchNearbyPhone} = useNearby();
    
    const navigation = useNavigation<NavProp>()
    const [postInput, setPostInput] = useState('')
    const [selected, setSelected] = useState(undefined);

    useEffect(() => {

        if(!bar){
            searchNearbyPhone(300);
        }else{
            console.log('selected ' + bar.name)
            setSelected(bar)
        }

        
    }, [location])

    const postBar = () => {
        console.log(selected)
        if(sendMessage(postInput, selected)){

            if(bar){
                navigation.navigate('PostScreen', {
                    bar: bar
                  });
            }else{
                navigation.goBack();
            }
            
        }   
    }
    
    return (
        <>
            <View style = {styles.box}>
               
                <Dropdown label="Select Bar" data={data} onSelect={setSelected} select={selected} />
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