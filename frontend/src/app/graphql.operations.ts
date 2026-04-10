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