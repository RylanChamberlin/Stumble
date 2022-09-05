import {FlatList, RefreshControl} from 'react-native'
import React, { useCallback} from 'react'
import BarBox from "../BarBox"; 
import EmptyList from '../../general/EmptyList';
import Loader from '../../general/Loader';
import useBars from '../../../hooks/useBars';

const BarList = () => {

    const {isLoading, isError, data,  getBars, getMore, isMoreLoading} = useBars();

    const fetchMoreData = () => {
        !isMoreLoading && getMore();
    }

    const renderItem = useCallback (({ item }) => <BarBox bar={item}/>,[]);
    const renderFooter = () => {return isMoreLoading ? <Loader/> : null}
    const onRefresh = useCallback(() => {getBars()}, []);
    const keyExtractor = useCallback( (item) => item.place_id, []);
    const listEmptyComponent = () => {return <EmptyList name={'No Bars Found Nearby'}/>}

    return (
        <FlatList
            contentContainerStyle={{marginBottom: 300}}
            data={data}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                />
            }
            ListEmptyComponent={listEmptyComponent}
            keyExtractor={keyExtractor}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}   
        />
    )
}


export default BarList;