import { FC } from "react";
import AppView from "../components/general/AppView";
import Header from "../components/PostScreen/Header/Header";
import PostList from "../components/PostScreen/PostList";


export type Props = {
    route: any
  };

const PostScreen: FC<Props> = (props) => {

    let itemId, name;
    if(props.route.params){
        itemId = props.route.params.itemId;
        name = props.route.params.name
    }

    return(
       
        <AppView>
            <Header title = {name}/>
            <PostList itemId={itemId}/>
            {/* <PostList/> */}
        </AppView>
       
    );

}

export default PostScreen;