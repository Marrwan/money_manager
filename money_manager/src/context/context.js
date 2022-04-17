import React, {useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const startState = JSON.parse(localStorage.getItem('posts')) || [];
export const MoneyManagerContext = createContext(startState);

export const Provider = ({ children }) =>{
    const [posts, dispact] = useReducer(contextReducer, startState);

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