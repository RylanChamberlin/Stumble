import AppView from "../components/general/AppView";
import Header from "../components/PostScreen/Header/Header";
import PostList from "../components/PostScreen/PostList";



export default function PostScreen(route){

    let itemId, name;
    if(route.route.params){
        itemId = route.route.params.itemId;
        name = route.route.params.name
    }

    return(
       
        <AppView>
            <Header title = {name}/>
            <PostList itemId={itemId}/>
        </AppView>
       
    );

}

