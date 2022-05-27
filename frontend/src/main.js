import { Text, View } from 'react-native'
import React, { Component } from 'react'

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser} from './redux/actions/index'

export class Main extends Component {


    componentDidMount() {
        this.props.fetchUser();
    }


    render() {

        const {currentUser} = this.props;

        console.log(currentUser)

        return (
        <View>
            <Text>Main</Text>
        </View>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchToProps = (dispatch) => ({bindActionCreators({fetchUser}, dispatch)})



export default connect(mapStateToProps, mapDispatchProps)(Main);