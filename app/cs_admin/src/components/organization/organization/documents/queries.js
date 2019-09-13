import gql from "graphql-tag"

export const GET_DOCUMENTS_QUERY = gql`
  query OrganizationDocuments($documentType: String!) {
    organizationDocuments(documentType:$documentType) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          documentType
          version
          dateStart
          dateEnd
          document
          urlDocument
        }
      }
    }
  }
`

export const GET_DOCUMENT_QUERY = gql`
  query OrganizationDocument($id: ID!) {
    organizationDocument(id:$id) {
      id
      version
      dateStart
      dateEnd
      document
    }
  }
`

export const ADD_DOCUMENT = gql`
  mutation CreateOrganizationDocument($input:CreateOrganizationDocumentInput!) {
    createOrganizationDocument(input: $input) {
      organizationDocument{
        id
        version
        dateStart
        dateEnd
      }
    }
  }
`