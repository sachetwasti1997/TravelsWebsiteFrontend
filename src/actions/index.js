import apiBase from "../apis/apiBase"

//Action Creator

export const logOut = () => {
    localStorage.removeItem('loggedIn');
    return{
        type:'LOG_OUT',
    }
}

export const fetchLogIn = (user) => async(dispatch) => {
    await apiBase.post('/api/users/login', user)
    .then(response => {
        dispatch({type:'LOG_IN', payload: response.data})
    })
}

export const signUp = (user) => async(dispatch) => {
    await apiBase.post('/api/users/signup', user)
    .then(response => {
        dispatch({type:'SIGN_UP', payload: response.data})
    })
}

export const fetchUsers = () => async (dispatch) =>{
    await apiBase.get('/api/users')
    .then((response) => {
        dispatch({type:'USER_LIST', payload: response.data})
    })
    .catch(err => {
        console.log(err);
    })
}

export const fetchUserPlace = userId => async(dispatch) => {
    await apiBase.get(`/api/places/user/${userId}`)
    .then((response) => {
        dispatch({type:'USER_DATA', payload: response.data})
    })
    .catch(err => {
        console.error(err);
    })
}

export const updatePlace = place => async (dispatch) => {
    const placeToUpdate = {
        id: place.id,
        title: place.title,
        description: place.description,
        address: place.address,
    }
    await apiBase.patch(`/api/places/${place.id}`, placeToUpdate, {
        headers:{
            'Authorization':'Bearer '+place.token
        }
    })
    .catch(err => {
        console.error(err);
    })
}

export const addPlace = place => async(dispatch) => {
    const formData = new FormData();
    formData.append('title', place['title']);
    formData.append('description', place['description']);
    formData.append('address', place['address']);
    formData.append('creator', place['creator']);
    formData.append('image', place['image']);
    await apiBase.post('/api/places', formData, {
        headers:{
            'Authorization':'Bearer '+place.token
        }
    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.error(err);
    })
}

export const deletePlace = place => async(dispatch) =>{
    await apiBase.delete(`/api/places/${place.placeId}`,{
        headers:{
            'Authorization':'Bearer '+place.token
        }
    })
    .catch(err => {
        console.log(err);
    })
}

