import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import AppView from "../components/general/AppView";
import Header from "../components/PostScreen/Header";
import PopularPostList from "../components/PostScreen/Posts/PopularPostList";
import RecentPostList from "../components/PostScreen/Posts/RecentPostList";
import { RootStackParamList } from "../navigation/Nav";

type PostScreenProps = NativeStackScreenProps<RootStackParamList, 'PostScreen'>;

const PostScreen: FC<PostScreenProps> = ({route}) => {

    const [left, setLeft] = useState(false);
  
    return(
        <AppView>
            <Header title = {route.params?.name} left={left} setLeft={setLeft}/>
            {!left ?  <RecentPostList itemID={route.params?.placeID} order='createdAt' field='placeID'/> : <PopularPostList itemID={route.params?.placeID}/>}
        </AppView>
       
    );

}

export default PostScreen;