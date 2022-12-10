import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';
import { FaComments } from 'react-icons/fa'

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';



function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const {
    data: { getPost }
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  const onSubmitFunction = event => {
    event.preventDefault()

    submitComment()
  }

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;



    postMarkup = (
      <div className='single-post-container'>
        <div className='postcard'>

          <p className='postcard-username'>{username}</p>

          <p className='postcard-time'>{moment.unix(createdAt/1000).fromNow()}</p>

          <span className='postcard-span'></span>

          <p className='postcard-body'>{body}</p>

          <span className='postcard-span'></span>

          <div className='postcard-button-section'>

            {/* like button */}
            <LikeButton
            user={user}
            post={{ id, likeCount, likes }}
            />
            
            {/* comment button */}
            <div
            className="comment-like-button-link"
            >
              <FaComments
              size={25}
              color='#85C7F2'
              />

              <p
              className='comment-button-commentCount'
              >
                {commentCount}
              </p>
            </div>

            {/* delete button */}
            {/* if user is true, we are logged in */}
            {/* if user.username === username, that means the post belongs to the currently logged in user */}
            {/* if both of these are true, only then render the delete button */}
            {user && user.username === username && (
              <DeleteButton
              postId={id}
              callback={deletePostCallback}
              />
            )}

          </div>

        </div>
        
        {/* post comment section */}
        {user && (
          <div className='write-comment-section'>

            <p id='post-comment-title'>Post a comment</p>

            <form className='post-comment-form'>

              <textarea
                type="text"
                placeholder="Comment..."
                name="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                ref={commentInputRef}
                className="create-comment-textarea"
                rows="3"
                style={{
                  resize: 'none'
                }}
              />

              <button
                type="submit"
                className="form-submit-button"
                disabled={comment.trim() === ''}
                onClick={onSubmitFunction}
              >
                Submit
              </button>

            </form>

          </div>
        )}
        
        {/* all comments section */}
        {/* the final thing to do on this page, style the comment section, then check if everything works fine, then we're done with this element!!! */}
        <div className='comments-section'>

          {
          comments.map(comment => (
            <div
            className='individual-comment'
            key={comment.id}
            >

              <p>{comment.username}</p>

              <p>{moment.unix(createdAt/1000).fromNow()}</p>

              <p>{comment.body}</p>

              {user && user.username === comment.username && (

                <DeleteButton
                postId={id}
                commentId={comment.id}
                />

              )
              }

            </div>
          ))
          }

        </div>

      </div>
    )

    // postMarkup = (
    //   <Grid>
    //     <Grid.Row>
    //       <Grid.Column width={2}>
    //         <Image
    //           src="https://react.semantic-ui.com/images/avatar/large/molly.png"
    //           size="small"
    //           float="right"
    //         />
    //       </Grid.Column>
    //       <Grid.Column width={10}>
    //         <Card fluid>
    //           <Card.Content>
    //             <Card.Header>{username}</Card.Header>
    //             <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
    //             <Card.Description>{body}</Card.Description>
    //           </Card.Content>
    //           <hr />
    //           <Card.Content extra>
    //             <LikeButton user={user} post={{ id, likeCount, likes }} />
    //             <MyPopup content="Comment on post">
    //               <Button
    //                 as="div"
    //                 labelPosition="right"
    //                 onClick={() => console.log('Comment on post')}
    //               >
    //                 <Button basic color="blue">
    //                   <Icon name="comments" />
    //                 </Button>
    //                 <Label basic color="blue" pointing="left">
    //                   {commentCount}
    //                 </Label>
    //               </Button>
    //             </MyPopup>
    //             {user && user.username === username && (
    //               <DeleteButton postId={id} callback={deletePostCallback} />
    //             )}
    //           </Card.Content>
    //         </Card>
    //         {user && (
    //           <Card fluid>
    //             <Card.Content>
    //               <p>Post a comment</p>
    //               <Form>
    //                 <div className="ui action input fluid">
    //                   <input
    //                     type="text"
    //                     placeholder="Comment.."
    //                     name="comment"
    //                     value={comment}
    //                     onChange={(event) => setComment(event.target.value)}
    //                     ref={commentInputRef}
    //                   />
    //                   <button
    //                     type="submit"
    //                     className="ui button teal"
    //                     disabled={comment.trim() === ''}
    //                     onClick={submitComment}
    //                   >
    //                     Submit
    //                   </button>
    //                 </div>
    //               </Form>
    //             </Card.Content>
    //           </Card>
    //         )}
    //         {comments.map((comment) => (
    //           <Card fluid key={comment.id}>
    //             <Card.Content>
    //               {user && user.username === comment.username && (
    //                 <DeleteButton postId={id} commentId={comment.id} />
    //               )}
    //               <Card.Header>{comment.username}</Card.Header>
    //               <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
    //               <Card.Description>{comment.body}</Card.Description>
    //             </Card.Content>
    //           </Card>
    //         ))}
    //       </Grid.Column>
    //     </Grid.Row>
    //   </Grid>
    // );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
