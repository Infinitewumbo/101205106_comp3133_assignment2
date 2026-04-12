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
      employee_photo
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
    $employee_photo: String 
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
      employee_photo: $employee_photo 
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

export const GET_EMPLOYEE_BY_ID = gql`
  query SearchEmployeeById($eid: ID!) {
    searchEmployeeById(eid: $eid) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      department
      date_of_joining
      employee_photo
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployeeByEid(
    $eid: ID!, 
    $first_name: String,
    $last_name: String,
    $email: String,
    $gender: String,
    $designation: String,
    $salary: Float,
    $date_of_joining: String,
    $department: String,
    $employee_photo: String
  ) {
    updateEmployeeByEid(
      eid: $eid,
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      gender: $gender,
      designation: $designation,
      salary: $salary,
      date_of_joining: $date_of_joining,
      department: $department,
      employee_photo: $employee_photo
    ) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;