// import React, { useState } from 'react'
// import gql from 'graphql-tag'
// import { useMutation } from '@apollo/react-hooks' // change this
// import { Confirm } from 'semantic-ui-react' // need to find another way of doing this
// import { MdOutlineDelete } from 'react-icons/md'

// import { FETCH_POSTS_QUERY } from '../util/graphql'



// const DELETE_POST_MUTATION = gql`
//   mutation deletePost($postId: ID!) {
//     deletePost(postId: $postId)
//   }
// `

// const DELETE_COMMENT_MUTATION = gql`
//   mutation deleteComment($postId: ID!, $commentId: ID!) {
//     deleteComment(postId: $postId, commentId: $commentId) {
//       id
//       comments {
//         id
//         username
//         createdAt
//         body
//       }
//       commentCount
//     }
//   }
// `



// export const DeleteButton = ({ postId, commentId, callback }) => {

//   const [confirmOpen, setConfirmOpen] = useState(false)

//   // if commentId is passed down as a prop to this DeleteButton component, that means this delete button is being used to delete a comment, not a post
//   // therefore, if commentId is true, the mutation should be DELETE_COMMENT_MUTATION, if not, it should be DELETE_POST_MUTATION
//   const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

//   const [deletePostOrMutation] = useMutation(mutation, {
//     update(proxy) {
//       // if the post/comment has been deleted successfully from the database, via the deletePostOrComment() function, the following code will be executed

//       // now that post/comment has been deleted, close confirm modal window
//       setConfirmOpen(false)

//       // if the delete button is used to delete a post, then execute the following code
//       if (!commentId) {

//         // Remove post from cache so that the deletion of the post is reflected on the frontend without having to reload the page
//         const data = proxy.readQuery({
//           query: FETCH_POSTS_QUERY
//         })

//         data.getPosts = data.getPosts.filter((p) => p.id !== postId)
//         proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
//       }

//       // once the post/comment has been deleted, you need to navigate back to the home page, use the callback that you prop drilled into this deleteButton component
//       if (callback) callback()
//     },
//     variables: {
//       postId,
//       commentId
//     }
//   })



//   return (
//     <>

//       <button
//       className='delete-button'
//       onClick={() => setConfirmOpen(true)}
//       >
//         <MdOutlineDelete
//         size={25}
//         color="red"
//         />
//       </button>

//       <Confirm
//         open={confirmOpen}
//         onCancel={() => setConfirmOpen(false)}
//         onConfirm={deletePostOrMutation}
//       />
      
//     </>
//   )
// }



// export default DeleteButton

import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';

import { MdOutlineDelete } from 'react-icons/md'



function DeleteButton({ postId, commentId, callback }) {

  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  })



  return (
    <>

      <button
      className='delete-button'
      // onClick={() => setConfirmOpen(true)}
      onClick={deletePostOrMutation}
      >
        <MdOutlineDelete
        size={25}
        color="red"
        />
      </button>
      
    </>
  );
}



const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
