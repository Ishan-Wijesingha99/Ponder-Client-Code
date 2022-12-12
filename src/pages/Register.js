import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'
import { AlreadyLoggedIn } from '../components/AlreadyLoggedIn'



export const Register = props => {

  // even when you are logged in, the user can still type /register or /login in the url and access those pages, we need to make sure they can't access these pages
  // this can be easily solved by conditionally rendering the register form, if the user is logged in, do not render the form

  const context = useContext(AuthContext)

  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // the update function will be triggered if the mutation is successful
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      // if addUser() was successful, then execute the following code

      // even though we are registering, the login function attached to the context can be used for both registering and logging in
      context.login(userData)

      // finally, redirect to the homepage
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })



  function registerUser() {
    addUser()
  }



  return (
    <div className='form-container'>


      {
        // render form if token doesn't exist in local storage, render button to take user back to homepage if it already exists
        localStorage.getItem('token')

        ?

        (
          <AlreadyLoggedIn />
        )

        :

        (
          <form
          onSubmit={onSubmit}
          noValidate
          className='register-form'
          >
            <h1 className='register-form-title'>Register</h1>

            <label
            htmlFor="Username"
            className='input-label'
            >
              Username
            </label>
            <input
            type="text"
            label="Username"
            placeholder="Username..."
            name="username"
            value={values.username}
            error={errors.username ? true : false}
            onChange={onChange}
            className='login-input-field'
            />

            <label
            htmlFor="Email"
            className='input-label'
            >
              Email
            </label>
            <input
            type="text"
            label="Email"
            placeholder="Email..."
            name="email"
            value={values.email}
            error={errors.email ? true : false}
            onChange={onChange}
            className='login-input-field'
            />

            <label
            htmlFor="Password"
            className='input-label'
            >
              Password
            </label>
            <input
            type="password"
            label="Password"
            placeholder="Password..."
            name="password"
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}
            className='login-input-field'
            />

            <label
            htmlFor="Confirm Password"
            className='input-label'
            >
              Confirm Password
            </label>
            <input
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password..."
            name="confirmPassword"
            value={values.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={onChange}
            className='login-input-field'
            />

            <button
            type='submit'
            className='form-submit-button'
            >
              Register
            </button>

          </form>
        )
      }
      
      

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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`

