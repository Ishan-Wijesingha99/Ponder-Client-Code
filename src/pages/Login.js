import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'



export const Login = props => {

  const context = useContext(AuthContext)

  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData)
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

export default Login
