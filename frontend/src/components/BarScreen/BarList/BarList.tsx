import {FlatList, RefreshControl} from 'react-native'
import React, { useCallback} from 'react'
import BarBox from "../BarBox"; 
import Loader from '../../general/Loader';
import { useGetBarsByLocationQuery } from '../../../services/bars';

const BarList = () => {

    const { data: bars, error, isLoading, isFetching, isSuccess, refetch } = useGetBarsByLocationQuery();

    const renderItem = useCallback (({ item }) => <BarBox item={item}/>,[]);
    const onRefresh = useCallback(() => {refetch()}, []);
          
    if(isLoading) return <Loader/>


    return (
        <FlatList
    
            data={bars} 
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