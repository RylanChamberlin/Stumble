import { StyleSheet, Text} from "react-native";
import { auth } from "../../../firebase";
import PopupPost from "../../general/PopupPost/PopupPost";


export default function CheckIn({post, setPost}){
    return(
        <PopupPost post={post} setPost={setPost} title={'CHECK-IN'} buttonTitle={'CHECK-IN'}>
            <Text style={{color: 'red'}}>{auth.currentUser?.email}</Text>
            <Text style={{color: 'red'}}>{auth.currentUser?.name}</Text>
        </PopupPost>        
    );
}
