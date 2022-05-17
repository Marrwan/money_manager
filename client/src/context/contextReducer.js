import {getPosts} from './context'
const contextReducer= async(state, action) =>{
    let posts;
    
    if(action.type === 'DELETE_POST'){
        const options = {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
            },
          };
          await fetch(`/posts/${action.payload}`, options).then(res => res.json())
          
        //   console.log("RES", res)
        //   if(res.status === "error"){
        //       alert(res.message)
        //       throw new Error(res.message);
        //   }
        //  posts = state.filter((e) => e._id !== action.payload)
        //  localStorage.setItem('posts', JSON.stringify(posts));
         posts =  await getPosts() || [];
        return posts;
    } else if(action.type === 'ADD_POST'){
        let credentials = JSON.stringify(action.payload);
        console.log(credentials, "Credentials");
         const options = {
           method: 'POST',
           headers : {
               'Content-Type': 'application/json',
           },
           body: credentials,

         };
         await fetch('/posts', options);
        //  posts = [action.payload, ...state];
        posts =  await getPosts() || [];
         localStorage.setItem('posts', JSON.stringify(posts));
         window.location.reload();
        return posts;
    }
    else{
        return state;
    }
}

export default contextReducer;