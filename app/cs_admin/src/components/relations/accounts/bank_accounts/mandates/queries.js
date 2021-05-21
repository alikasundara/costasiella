import gql from "graphql-tag"


export const GET_ACCOUNT_BANK_ACCOUNT_MANDATE_QUERY = gql`
  query AccountBankAccountMandate($id: ID!) {
    accountBankAccountMandate(id:$id) {
      id
      reference
      content
      signatureDate
    }
  }
`


export const CREATE_ACCOUNT_BANK_ACCOUNT_MANDATE = gql`
  mutation CreateAccountBankAccountMandate($input:CreateAccountBankAccountMandateInput!) {
    createAccountBankAccountMandate(input: $input) {
      accountBankAccountMandate {
        id
      }
    }
  }
`
