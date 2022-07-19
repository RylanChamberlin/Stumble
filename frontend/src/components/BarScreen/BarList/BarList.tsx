import {FlatList, RefreshControl} from 'react-native'
import React, { useCallback} from 'react'
import BarBox from "../BarBox"; 
import { useGetBarsByLocationQuery } from '../../../services/bars';
import EmptyList from '../../general/EmptyList';

const BarList = () => {

    const { data: bars, error, isLoading, isFetching, isSuccess, refetch } = useGetBarsByLocationQuery();

    const renderItem = useCallback (({ item }) => <BarBox bar={item}/>,[]);
    const onRefresh = useCallback(() => {refetch()}, []);
    const listEmptyComponent = () => {return <EmptyList name={'No Bars Within 10 miles of your location'}/>}
          
    return (
        <FlatList
            data={bars} 
            ListEmptyComponent={listEmptyComponent}
            renderItem={renderItem}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh}/>}
            showsVerticalScrollIndicator={false}
            keyExtractor={(bar) => bar.place_id}    
        />
    )
}


export default BarList;