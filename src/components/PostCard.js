import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaComments } from 'react-icons/fa'

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';



function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);



  return (
    <div className='postcard'>
      <div className='postcard-top'>
        <p className='postcard-username'>{username}</p>

        <Link
        to={`/posts/${id}`}
        className="postcard-time-link"
        >
          <p className='postcard-time'>{moment.unix(createdAt/1000).fromNow()}</p>
        </Link>

        <span className='postcard-span'></span>

        <p className='postcard-body'>{body}</p>

        <span className='postcard-span'></span>

        <div className='postcard-button-section'>
          <div className='like-and-comment-buttons'>
            <LikeButton
            user={user}
            post={{ id, likes, likeCount }}
            />

            <Link
            to={`/posts/${id}`}
            className="comment-like-button-link"
            >
              <FaComments
              size={25}
              color='#85C7F2'
              />

              <p className='comment-button-commentCount'>{commentCount}</p>
            </Link>
          </div>


          
        </div>
      </div>
    </div>
  )
}

export default PostCard;
