import { useNavigation } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAppSelector } from "../../../app/hooks";
import useNearby from "../../../hooks/useNearby";
import { sendMessage } from "../../../services/sendPosts";
import Dropdown from "../Dropdown";
import styles from "./styles";

type NewPostboxProps = {
    bar?: any
}

const NewPostbox: FC<NewPostboxProps>= ({bar}) => {

    const location = useAppSelector(state => state.location.coords);


   
    const {data: data, isLoading, searchNearbyPhone} = useNearby();
    
    const navigation = useNavigation()
    const [postInput, setPostInput] = useState('')
    const [posting, setPosting] = useState(false)
    const [selected, setSelected] = useState(undefined);

    useEffect(() => {

        if(!bar){
            searchNearbyPhone(100);
        }else{
            console.log('selected ' + bar.name)
            setSelected(bar)
        }
    
        
    }, [location])

    const postBar = async() => {
        console.log(selected)
        setPosting(true);
        await sendMessage(postInput, selected)   
        navigation.goBack();
        setPosting(false)
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
            <TouchableOpacity style={[styles.button, styles.elevation]} onPress={() => postBar()} disabled={posting}>
                <Text style={styles.buttonText}>POST</Text>
            </TouchableOpacity>
        </>
    )
}

  
export default NewPostbox