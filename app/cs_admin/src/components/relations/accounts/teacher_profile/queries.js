import gql from "graphql-tag"


export const GET_ACCOUNT_TEACHER_PROFILE_QUERY = gql`
  query AccountTeacherProfileQuery($id: ID!, $accountId: ID!) {
    accountTeacherProfile(id:$id) {
      id
      classes
      appointments
      role
      education
      bio
      urlBio
      urlWebsite
    }
    account(id:$accountId) {
      id
      teacher
      firstName
      lastName
      email
      phone
      mobile
      isActive
    }
  }
`