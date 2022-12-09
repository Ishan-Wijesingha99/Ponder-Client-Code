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



  // return (
  //   <Card fluid>
  //     <Card.Content>
  //       <Image
  //         floated="right"
  //         size="mini"
  //         src="https://react.semantic-ui.com/images/avatar/large/molly.png"
  //       />
  //       <Card.Header>{username}</Card.Header>
  //       <Card.Meta as={Link} to={`/posts/${id}`}>
  //         {moment(createdAt).fromNow(true)}
  //       </Card.Meta>
  //       <Card.Description>{body}</Card.Description>
  //     </Card.Content>

  //     <Card.Content extra>
  //       <LikeButton user={user} post={{ id, likes, likeCount }} />
  //       <MyPopup content="Comment on post">
  //         <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
  //           <Button color="blue" basic>
  //             <Icon name="comments" />
  //           </Button>
  //           <Label basic color="blue" pointing="left">
  //             {commentCount}
  //           </Label>
  //         </Button>
  //       </MyPopup>
  //       {user && user.username === username && <DeleteButton postId={id} />}
  //     </Card.Content>
  //   </Card>
  // );

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
            className="comment-button-link"
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
