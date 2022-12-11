import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'



const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`



const PostForm = () => {

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      data.getPosts = [result.data.createPost, ...data.getPosts]
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
      values.body = ''
    }
  })

  function createPostCallback() {
    createPost()
  }



  return (
    <>
      <form
      onSubmit={onSubmit}
      className="post-form"
      >
        <h2 className='post-form-title'>Create a post:</h2>

        <textarea
        placeholder="Hi World!"
        name="body"
        onChange={onChange}
        value={values.body}
        error={error ? true : false}
        className='create-post-form-textarea'
        rows="3"
        style={{
          resize: 'none'
        }}
        />

        <button
        type='submit'
        className='post-form-submit-button'
        >
          Post
        </button>
      </form>
    </>
  )
}



export default PostForm
