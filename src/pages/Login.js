import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'



export const Login = props => {

  // even when you are logged in, the user can still type /register or /login in the url and access those pages, we need to make sure they can't access these pages
  // this can be easily solved by conditionally rendering the login form, if the user is logged in, do not render the form

  const context = useContext(AuthContext)

  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  })

  // the update function will be triggered if the mutation is successful
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      // if loginUser() was successful, then execute the following code

      // use login function which is attached to the context
      // result.data.login is the userData
      context.login(userData)

      // finally, redirect to the homepage
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })



  function loginUserCallback() {
    loginUser()
  }



  return (
    <div className='form-container'>

      <form
      onSubmit={onSubmit}
      noValidate
      className='login-form'
      >

        <h1 className='login-form-title'>Login</h1>

        <label
        htmlFor="Username"
        className='input-label'
        >
          Username
        </label>
        <input
        className='login-input-field'
        type="text"
        label="Username"
        placeholder="Username..."
        name="username"
        value={values.username}
        error={errors.username ? true : false}
        onChange={onChange}
        />

        <label
        htmlFor="Password"
        className='input-label'
        >
          Password
        </label>
        <input
        className='login-input-field'
        label="Password"
        placeholder="Password..."
        name="password"
        type="password"
        value={values.password}
        error={errors.password ? true : false}
        onChange={onChange}
        />

        <button
        type='submit'
        className='form-submit-button'
        >
          Login
        </button>

      </form>

      {/* this will only be rendered if there are properties in the error object, which is only possible if the form is being rendered, so you don't need to worry about this component being rendered if the form isn't also rendered */}
      {
      Object.keys(errors).length > 0 && (
        <ul className="error-message-list">
          {Object.values(errors).map(error => (
            <li
            key={error}
            className="error-message-li"
            >
              {error}
            </li>
          ))}
        </ul>
      )
      }

    </div>
  )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`

