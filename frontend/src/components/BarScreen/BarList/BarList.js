import {FlatList} from 'react-native'
import React, { useState } from 'react'
import BarBox from "../BarBox"; 
import Loader from '../../general/Loader';
import { connect } from 'react-redux';

const BarList = (props) => {

    if (!props.bars) return <Loader/>
        
    return (
        <FlatList
            data={props.bars} 
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
            keyExtractor={(item) => item.key}    
        />
    )
}



const mapStateToProps = (store) => ({
    bars: store.userState.bars
  })


export default connect(mapStateToProps)(BarList);