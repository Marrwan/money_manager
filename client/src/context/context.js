import React, {useReducer, createContext} from 'react';
import contextReducer from './contextReducer';
export const getPosts = async() => {
   let posts = await fetch('/posts').then((res)=>res ? res.json() : null).then(data => {
       if( data)
            if( data.data) 
                if(data.data.posts) 
       return data.data.posts 
    });
   console.log(posts);
   localStorage.setItem('posts', JSON.stringify(posts));
   return posts;
}

getPosts();
let startState ;
let localStoragePost = localStorage.getItem('posts')

if(typeof(localStoragePost) == 'string'){
    startState = JSON.parse(localStoragePost)
}else{
    startState = [];
}

export const MoneyManagerContext = createContext(startState);

export const Provider = ({ children }) =>{
   
    // useEffect(()=> {
    //     const reloadCount = sessionStorage.getItem('reloadCount');
    //     if(reloadCount < 2) {
    //       sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //       window.location.reload(false);
    //     } else {
    //       sessionStorage.removeItem('reloadCount');
    //     }
    //   },[])
    getPosts();
    let [posts, dispact] = useReducer(contextReducer, startState);
    posts = startState;
    const deletePost = (id) => dispact({type:'DELETE_POST', payload: id});
    const addPost = (post) => dispact({type:'ADD_POST', payload: post})
    console.log("NAJA", posts)
    const currentBalance = posts.reduce((acc, currVal) => {
        return (currVal.type === 'Spending' ? acc - currVal.amount : acc + currVal.amount)
    }, 0);
    return (
        <MoneyManagerContext.Provider value={{deletePost, addPost, posts, currentBalance}}>
            {children}
        </MoneyManagerContext.Provider>
    );
}