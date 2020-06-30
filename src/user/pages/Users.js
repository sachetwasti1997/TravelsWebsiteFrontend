import React, { Component } from 'react';
import UserList from '../components/UserList';
import { fetchUsers } from '../../actions';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

class Users extends Component{
    
    componentDidMount(){
        this.props.fetchUsers();
    }

    render(){
        // console.log(this.props.users.users)
        return(
            <Container style={{textAlign:'center'}}>
                <UserList usersList={this.props.users.users}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state.users);
    return state;
}

export default connect(mapStateToProps,{
    fetchUsers
})(Users);


