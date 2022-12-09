import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

import { BiLike } from 'react-icons/bi'





function LikeButton({ user, post: { id, likeCount, likes } }) {

  const [liked, setLiked] = useState(false);

  useEffect(() => {

    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);

  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <button
      className='comment-like-button-link'
      onClick={likePost}
      style={{
        backgroundColor: '#85C7F2',
        border: '2px solid black'
      }}
      >
        <BiLike 
        size={25}
        color='black'
        />

        <p
        className='like-button-likeCount'
        style={{
          color: 'black'
        }}
        >{likeCount}</p>
      </button>
    ) : (
      <button
      className='comment-like-button-link'
      onClick={likePost}
      >
        <BiLike
        size={25}
        color='#85C7F2'
        />

        <p className='like-button-likeCount'>{likeCount}</p>
      </button>
    )
  ) : (
    <Link
    to="/login"
    className='comment-like-button-link'
    >
      <BiLike
      size={25}
      color='#85C7F2'
      />

      <p className='like-button-likeCount'>{likeCount}</p>
    </Link>
  );

  return likeButton
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
