import { gql } from '@apollo/client'

export const GET_TASKS = gql`
    query GetTasks {
        tasks(input: {}) {
            id
            name
            status
            dueDate
            pointEstimate
            tags
            assignee {
                id
                fullName
                avatar
            }
            creator {
                id
                fullName
            }
            createdAt
        }
    }
`

export const GET_USERS = gql`
    query GetUsers {
        users {
            id
            fullName
            avatar
        }
    }
`

export const GET_PROFILE = gql`
    query GetProfile {
        profile {
            id
            fullName
            avatar
        }
    }
`
