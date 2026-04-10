import { gql } from 'apollo-angular';

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      first_name
      last_name
      email
      designation
      department
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;