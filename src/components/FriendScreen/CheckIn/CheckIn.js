import { Image, StyleSheet, Text, TextInput, View} from "react-native";
import { auth } from "../../../firebase";
import PopupPost from "../../general/PopupPost/PopupPost";
import styles from "./styles";


export default function CheckIn({post, setPost}){
    return(
        <PopupPost post={post} setPost={setPost} title={'CHECK-IN'} buttonTitle={'CHECK-IN'}>

        <View style={styles.container}>
            <View style={styles.userBox}>
                <Image style={styles.image}/>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>Rylan Chamberlin</Text>
                    <Text style={styles.username}>@pretty.boy.3</Text>
                </View>
            </View>
            <TextInput style={styles.input} placeholder='is at....'></TextInput>
            
            <Text style={{color: 'red'}}>NEARBY</Text>
            <View style={styles.barnameBox}>
                <Text style={styles.barName}>Harpo's </Text>
                <Text style={styles.cityName}>Columbia, MO</Text>
            </View>
            <View style={styles.barnameBox}>
                <Text style={styles.barName}>The Shot Bar </Text>
                <Text style={styles.cityName}>Columbia, MO</Text>
            </View>
        </View>
        </PopupPost>        
    );
}
