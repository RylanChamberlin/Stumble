import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import useBars from "../../../hooks/useBars";
import BarBox from "../BarBox"; 
import Loader from '../../general/Loader';

const BarList = () => {

    const [{data, loading, error}, getBars] = useBars();
    useEffect(() => {
        getBars();
    }, []);

    if (loading) return <Loader/>
        
    return (
        <FlatList
            data={data} 
            renderItem={({ item, index }) => {   
            return (
                <BarBox
                    item={item}
                    numComment={1}
                /> 
            );
            }}
            vertical
            showsVerticalScrollIndicator={false}
            keyExtractor={(bar) => bar.name}    
        />
    )
}


export default BarList