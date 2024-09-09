import { gql } from '@apollo/client';

// Mutación para crear una nueva tarea
export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
      status
      dueDate
      pointEstimate
      tags
      assignee {
        id
        fullName
      }
      creator {
        id
        fullName
      }
      createdAt
    }
  }
`;

// Mutación para actualizar una tarea existente
export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      name
      status
      dueDate
      pointEstimate
      tags
      assignee {
        id
        fullName
      }
      createdAt
    }
  }
`;

// Mutación para eliminar una tarea por su ID
export const DELETE_TASK = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;
