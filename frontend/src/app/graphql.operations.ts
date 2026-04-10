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

export const LOGIN_USER = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!, 
    $last_name: String!, 
    $email: String!, 
    $gender: String!, 
    $designation: String!, 
    $salary: Float!, 
    $department: String!, 
    $date_of_joining: String!,
    $employee_photo: String # Add this line
  ) {
    addEmployee(
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      gender: $gender,
      designation: $designation,
      salary: $salary,
      department: $department,
      date_of_joining: $date_of_joining,
      employee_photo: $employee_photo # Add this line
    ) {
      id
      first_name
      employee_photo
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployeeByEid($eid: ID!) {
    deleteEmployeeByEid(eid: $eid)
  }
`;