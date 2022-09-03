import FriendAddBox from "../../components/AddFriendScreen/FriendAddBox";
import AppView from "../../components/general/AppView";
import SimpleHeader from "../../components/general/SimpleHeader";




const AddFriendScreen = () => {

    return(
       
        <AppView>    
            <SimpleHeader title={"Add New Friends"}/>
            <FriendAddBox/>
        </AppView>
    );

}

export default AddFriendScreen;