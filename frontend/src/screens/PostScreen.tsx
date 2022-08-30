import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import AppView from "../components/general/AppView";
import Header from "../components/PostScreen/Header";
import PopularPostList from "../components/PostScreen/Posts/PopularPostList";
import RecentPostList from "../components/PostScreen/Posts/RecentPostList";
import { RootStackParamList } from "../navigation/types";

type PostScreenProps = NativeStackScreenProps<RootStackParamList, 'PostScreen'>;

const PostScreen: FC<PostScreenProps> = ({route}) => {

    const [left, setLeft] = useState(false);
  
    return(
        <AppView>
            <Header bar = {route.params?.bar}  left={left} setLeft={setLeft}/>
            {!left ?  <RecentPostList itemID={route.params?.bar.place_id} order='createdAt' field='placeID'/> : <PopularPostList itemID={route.params?.bar.place_id}/>}
        </AppView>
       
    );

}

export default PostScreen;