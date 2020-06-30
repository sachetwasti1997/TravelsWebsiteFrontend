export const loadState = () => {
    try{
        const serialisedState = localStorage.getItem('loggedIn');
        if(!serialisedState){
            return undefined;
        }
        return {loggedIn : JSON.parse(serialisedState)};
    }catch(err){
        return undefined;
    }
}