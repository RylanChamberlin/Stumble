import {FlatList, RefreshControl, Text} from 'react-native'
import React, { useCallback, useState} from 'react'
import BarBox from "../BarBox"; 
import Loader from '../../general/Loader';
import { useGetBarsByLocationQuery } from '../../../services/bars';

const BarList = () => {

    const { data, error, isLoading, isFetching, isSuccess, refetch } = useGetBarsByLocationQuery();

    const renderItem = useCallback (({ item }) => <BarBox item={item}/>,[]);
    const onRefresh = useCallback(() => {refetch()}, []);
          
    if(isLoading) return <Loader/>

    return (
        <FlatList
    
            data={data} 
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={onRefresh}
                />
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.key}    
        />
    )
}


export default BarList;