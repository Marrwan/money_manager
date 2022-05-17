import React, {useReducer, createContext, useEffect} from 'react';
import contextReducer from './contextReducer';
export const getPosts = async() => {
   let posts = await fetch('/posts').then((res)=>res ? res.json() : null).then(data => {
       if( data)
            if( data.data) 
                if(data.data.posts) 
       return data.data.posts 
    });
    if(posts){
        console.log(posts);
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    return posts;
}

getPosts();
let startState ;
let localStoragePost = localStorage.getItem('posts')

startState =   JSON.parse(JSON.stringify(localStoragePost));
// JSON.parse(localStoragePost)

if(startState == "undefined"){
startState = [];
}

export const MoneyManagerContext = createContext(startState);

export const Provider = ({ children }) =>{
   
    useEffect(async()=> {
       let posts =  await getPosts();
       localStorage.setItem('posts', JSON.stringify(posts));
      },[])
    let [posts, dispact] = useReducer(contextReducer, startState);
    console.log("BEFORE", posts);
    console.log(typeof(posts))
    
    posts = JSON.parse(startState);
    console.log("AFTER", posts);
    console.log(typeof(posts))
    if(!posts){
        posts = [];
    }
    const deletePost = (id) => dispact({type:'DELETE_POST', payload: id});
    const addPost = (post) => dispact({type:'ADD_POST', payload: post})
    
    const currentBalance = posts.reduce((acc, currVal) => {
        return (currVal.type === 'Spending' ? acc - currVal.amount : acc + currVal.amount)
    }, 0);
    return (
        <MoneyManagerContext.Provider value={{deletePost, addPost, posts, currentBalance}}>
            {children}
        </MoneyManagerContext.Provider>
    );
}