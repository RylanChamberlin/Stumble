import {FlatList, ActivityIndicator, View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import PostBox from '../PostBox';
import Loader from '../../general/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts, fetchPostsByID, clearData } from '../../../redux/actions/index'
//{itemId = null, userId = null}

function PostList(props){

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    setPosts([])
    setData({})

    
    setPage(page - 1)

  },[props.order])
  
  useEffect(() => {
   
    props.fetchPostsByID(props.field, props.itemID, props.order, data.lastDoc).then(setData);
  
  }, [page]);

  useEffect(() => {
    if(data.secondFetch && posts){
      setPosts([...posts, ...data.posts])
    }else{  
      setPosts(data.posts)
    }
   
  }, [data.posts]);

  const fetchMoreData = () => {
    console.log('getch more\n')
    if(data.isMore) setPage(page + 1);
  }

  const renderFooter = () => (
    <View >
        {!data.isMore && <Text>No more comments at the moment</Text>}
    </View>
  )

  const renderItem = useCallback(
    ({ item, index }) => {
      // console.log('render: ' + index + ' key: ' + item.key)
      return (<PostBox item = {item}/>
      )},
    []
    );


  const keyExtractor = useCallback( (item) => item.key, []);

  if (!data.posts) {
      return  <Loader/>
  }
    //console.log(props.posts)
  return (
    <FlatList

    contentContainerStyle={{marginBottom: 300}}
    data={posts}
    
    renderItem={renderItem}
    keyExtractor={keyExtractor}

    showsVerticalScrollIndicator={false}
    onEndReachedThreshold={0.2}
    onEndReached={fetchMoreData}
    ListFooterComponent={renderFooter}

/>  
  )
}

const mapStateToProps = (store) => ({
  posts: store.usersState.posts, 
  allPosts: store.usersState.allPosts,
  lastDoc: store.usersState.lastDoc
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchPosts, fetchPostsByID, clearData }, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(PostList);