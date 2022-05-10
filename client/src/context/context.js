import React, { createContext, useEffect, useState} from 'react';
// import contextReducer from './contextReducer';

const startState = JSON.parse(localStorage.getItem('posts')) || [];
export const MoneyManagerContext = createContext(startState);

export const Provider = ({ children }) =>{
    // const [posts, dispact] = useReducer(contextReducer, startState);
    const [posts, setPosts] = useState([])
    useEffect(async()=>{
     fetch('/posts').then(data => {
            return data.json()
      })
      .then(async (details) => {
         setPosts(details.data.posts);
        })
    },[])
    // const deletePost = (id) => dispact({type:'DELETE_POST', payload: id});
    
    // const addPost = (post) => dispact({type:'ADD_POST', payload: post})
    const addPost = async(post) => {
      
        let {amount, category, type,date} = post;
        let credentials = {amount, category, type, date};
        const options = {
            method: 'POST',
            headers : {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          };

        let response = await fetch('/posts', options);
        let json = await response.json();
        return json
            
    }

    const currentBalance = posts.reduce((acc, currVal) => {
        return (currVal.type === 'Spending' ? acc - currVal.amount : acc + currVal.amount)
    }, 0);
    return (
        <MoneyManagerContext.Provider value={{ addPost, posts, currentBalance}}>
            {children}
        </MoneyManagerContext.Provider>
    );
}