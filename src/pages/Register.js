import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';



function Register(props) {

  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });



  function registerUser() {
    addUser();
  }



  return (
    <div className='form-container'>
      
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
`;

export default Register;
