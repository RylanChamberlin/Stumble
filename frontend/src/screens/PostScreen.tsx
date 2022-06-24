import { FC, useState } from "react";
import AppView from "../components/general/AppView";
import Header from "../components/PostScreen/Header";
import PopularPostList from "../components/PostScreen/PopularPostList";
import PostList from "../components/PostScreen/PostList";


export type Props = {
    route: any
  };

const PostScreen: FC<Props> = (props) => {

    const [left, setLeft] = useState(false);
    // useEffect(() => {
    //     console.log('left')
    // },[left])

    let placeID, name;
    if(props.route.params){
        placeID = props.route.params.itemId;
        name = props.route.params.name
    }

    return(
       
        <AppView>
           {/* // <Header title = {name} left={left} setLeft={setLeft}/> */}
            <Header title = {name} left={left} setLeft={setLeft}/>

            {!left ?  <PostList itemID={placeID} order='createdAt' field='placeID'/> : <PopularPostList itemID={placeID}/>}
         
           
            {/* <PostList/> */}
        </AppView>
       
    );

}

export default PostScreen;