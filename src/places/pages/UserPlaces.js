import React, { Component } from 'react';

import PlaceList from '../components/PlaceList';
import {fetchUserPlace} from '../../actions/index';
import { connect } from 'react-redux';

class UserPlaces extends Component{

    componentDidMount(){
        const id = this.props.match.params.userId;
        // console.log(id);
        this.props.fetchUserPlace(id);
    }

    render(){
        const id = this.props.match.params.userId;
        // console.log(this.props);
        return <div>
            <PlaceList place={this.props.userPlaces[id]} />
        </div>;
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return state;
}

export default connect(mapStateToProps,{
    fetchUserPlace
})(UserPlaces);
