import { FC, useEffect, useState } from "react";
import AppView from "../components/general/AppView";
import Header from "../components/PostScreen/Header/Header";
import PostList from "../components/PostScreen/PostList";


export type Props = {
    route: any
  };

const PostScreen: FC<Props> = (props) => {

    const [left, setLeft] = useState(true);
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
            <Header title = {name} left={left} setLeft={setLeft}/>

            {!left ?  <PostList itemID={placeID} field={'placeID'} left={left} order={'createdAt'}/> :  <PostList itemID={placeID} field={'placeID'} order={'score'} left={left}/>}
           
            {/* <PostList/> */}
        </AppView>
       
    );

}

export default PostScreen;