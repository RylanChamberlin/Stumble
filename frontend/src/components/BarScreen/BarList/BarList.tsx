import {FlatList, RefreshControl} from 'react-native'
import React, { useCallback, useEffect, useMemo, useState} from 'react'
import BarBox from "../BarBox"; 
import { useGetBarsByLocationQuery } from '../../../services/bars';
import EmptyList from '../../general/EmptyList';
import Loader from '../../general/Loader';

const BarList = () => {

    const { data, error, isLoading, isFetching, isSuccess, refetch } = useGetBarsByLocationQuery();
    const [bars, setBars] = useState([])

    const renderItem = useCallback (({ item }) => <BarBox bar={item}/>,[]);
    const onRefresh = useCallback(() => {refetch()}, []);
    const listEmptyComponent = () => {return <EmptyList name={'No Bars Found Nearby'}/>}

    useEffect(() => {
       setBars(data)
    },[data])

    const getSortedPostCount = (data: any[]) => [...data].sort((a, b) => parseInt(b.postCount) - parseInt(a.postCount));
    const sortedItems = useMemo(() => {
        if(bars) {
          return getSortedPostCount(bars);
        }
        return bars;
      }, [bars]);


    if(!bars){
        return <Loader/>
    }

    return (
        <FlatList
            data={sortedItems} 
            ListEmptyComponent={listEmptyComponent}
            renderItem={renderItem}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh}/>}
            showsVerticalScrollIndicator={false}
            keyExtractor={(bar) => bar.place_id}    
        />
    )
}


export default BarList;