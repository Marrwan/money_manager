const contextReducer= (state, action) =>{
    let posts;
    if(action.type === 'DELETE_POST'){
         posts = state.filter((e) => e.id !== action.payload)
         localStorage.setItem('posts', JSON.stringify(posts));
        return posts;
    } else if(action.type === 'ADD_POST'){
         posts = [action.payload, ...state];
         localStorage.setItem('posts', JSON.stringify(posts));
        return posts;
    }
    else{
        return state;
    }
}

export default contextReducer;