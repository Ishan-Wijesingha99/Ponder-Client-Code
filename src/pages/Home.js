import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';



function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY);



  return (
    <div className='home-container'>
      <h1 id='home-title'>Recent Posts</h1>

      {user && (   
        <PostForm />
      )}

      {
        loading 
        
        ? 
        
        (
          <h1>Loading posts..</h1>
        ) 
        
        : 
        
        (    
          <div>
            {posts && posts.map(postObject => (
              <PostCard
                key={postObject.id}
                post={postObject}
              />
            ))}
          </div> 
        )
        
      }

    </div>
  )


  
}

export default Home;
