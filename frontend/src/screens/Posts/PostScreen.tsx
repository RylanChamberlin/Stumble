import { useState } from "react";
import AppView from "../../components/general/AppView";
import Header from "../../components/PostScreen/Header";
import PopularPostList from "../../components/PostScreen/Posts/PopularPostList";
import RecentPostList from "../../components/PostScreen/Posts/RecentPostList";


const PostScreen = () => {

    const [left, setLeft] = useState(false);
  
    return(
        <AppView>
            <Header left={left} setLeft={setLeft}/>
            {!left ?  <RecentPostList/> : <PopularPostList/>}
        </AppView>
       
    );

}

export default PostScreen;