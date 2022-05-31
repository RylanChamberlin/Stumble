import {FlatList, ActivityIndicator, View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import useMessages from '../../../hooks/useMessages';
import PostBox from '../PostBox';
import Loader from '../../general/Loader';
import { db } from '../../../firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts } from '../../../redux/actions/index'
//{itemId = null, userId = null}

function PostList(props){

  // const [{data, loading, error}, getMessages] = useMessages();

  const [lastDocument, setLastDocument] = useState();
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

    useEffect(() => {
      //   getMessages(itemId, userId);
      LoadData();
      //props.fetchPosts()
      
    }, [page]);// [] could be which bar? 

  const fetchMoreData = () => {
    
    setPage(page + 1);
  }

  

  function LoadData() {

    if(!end){

    setIsMoreLoading(true);
    console.log('LOAD');

    let query = db.collection('messages').orderBy('createdAt', 'desc'); // sort the data
    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument); // fetch data following the last document accessed
    }
    query.limit(8) // limit to your page size, 3 is just an example
        .get()
        .then(querySnapshot => {

          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
    
          const users = [...userData];
          
          querySnapshot.forEach(documentSnapshot => {
            //console.log(documentSnapshot.id)
          users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
          });
          });

          setUserData(users);

          if (querySnapshot.docs.length < 8) setEnd(true);

        });

      }else{
        console.log('end of list')
      }

      setIsMoreLoading(false);
    }


  const renderFooter = () => (
    <View >
        {isMoreLoading && <ActivityIndicator />}
        {end && <Text>No more comments at the moment</Text>}
    </View>
  )

  const renderItem = useCallback(
    ({ item, index }) => {
      console.log('render: ' + index + ' key: ' + item.key)
      return (<PostBox item = {item}/>
      )},
    []
    );


  const keyExtractor = useCallback( (item) => item.key, []);

  if (!userData) {
      return  <Loader/>
  }

    //console.log(props.posts)

  return (
    <FlatList

    contentContainerStyle={{marginBottom: 300}}
    data={userData}
    
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
  lastDoc: store.usersState.lastDoc
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchPosts }, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(PostList);