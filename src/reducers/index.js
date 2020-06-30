import { combineReducers } from "redux";

const fetchUserData = (userPlace = {}, action) => {
  switch (action.type) {
    case "USER_DATA":
      const userPlacesData = { ...userPlace };
      if (action.payload.placesList.length > 0)
        userPlacesData[action.payload.placesList[0].creator] =
          action.payload.placesList;
      return userPlacesData;
    default:
      return userPlace;
  }
};

const fetchUsers = (userList = [], action) => {
  switch (action.type) {
    case "USER_LIST":
      return action.payload;

    default:
      return userList;
  }
};

const signup = (signUp = null, action) => {
    switch(action.type){
        case 'SIGN_UP':
            const json = {
                userId: action.payload.userId,
                token: action.payload.token,
            };
            localStorage.setItem("loggedIn", JSON.stringify(json));
            return JSON.parse(localStorage.getItem("loggedIn"));
        default:
            return signUp;
    }
}

const login = (login = null, action) => {
  switch (action.type) {
    case "LOG_IN":
      const json = {
        userId: action.payload.userId,
        token: action.payload.token,
      };
      localStorage.setItem("loggedIn", JSON.stringify(json));
      return JSON.parse(localStorage.getItem("loggedIn"));
    default:
      return login;
  }
};

export default combineReducers({
  loggedIn: login,
  userPlaces: fetchUserData,
  users: fetchUsers,
  signUp: signup
});
