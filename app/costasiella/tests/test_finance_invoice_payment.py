# from graphql.error.located_error import GraphQLLocatedError
import graphql
import datetime

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone
from graphene.test import Client
from graphql_relay import to_global_id

# Create your tests here.
from django.contrib.auth.models import AnonymousUser, Permission

from . import factories as f
from .helpers import execute_test_client_api_query
from .. import models
from .. import schema
from ..modules.gql_tools import get_rid



class GQLFinanceInvoicePayment(TestCase):
    # https://docs.djangoproject.com/en/2.1/topics/testing/overview/
    fixtures = ['finance_invoice_group.json', 'finance_payment_methods.json']

    def setUp(self):
        # This is run before every test
        self.admin_user = f.AdminUserFactory.create()
        self.anon_user = AnonymousUser()

        self.permission_view = 'view_financeinvoicepayment'
        self.permission_add = 'add_financeinvoicepayment'
        self.permission_change = 'change_financeinvoicepayment'
        self.permission_delete = 'delete_financeinvoicepayment'

        self.finance_payment_method = models.FinancePaymentMethod.objects.get(id=102)

        self.variables_create = {
            "input": {}
        }

        # self.variables_update = {
        #     "input": {
        #       "productName": "Updated product",
        #       "description": "Updated description",
        #       "quantity": 10,
        #       "price": 12.51,
        #       "financeTaxRate": to_global_id("FinanceTaxRateNode", self.finance_tax_rate.pk),
        #       "financeGlaccount": to_global_id("FinanceGLAccountNode", self.finance_glaccount.pk),
        #       "financeCostcenter": to_global_id("FinanceCostCenterNode", self.finance_costcenter.pk)
        #     }
        # }

        self.invoice_payments_query = '''
  query FinanceInvoicesPayments($financeInvoice: ID!) {
    financeInvoicePayments(first: 100, financeInvoice: $financeInvoice) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          financeInvoice {
            id
          }
          date
          amount
          note
          financePaymentMethod {
            id
            name
          }
        }
      }
    }
  }
'''

        self.invoice_payment_query = '''
  query FinanceInvoicePayment($id: ID!) {
    financeInvoicePayment(id:$id) {
      id
      financeInvoice {
        id
      }
      date
      amount
      note
      financePaymentMethod {
        id
        name
      }
    }
  }
'''

        self.invoice_payment_create_mutation = ''' 
  mutation CreateFinanceInvoicePayment($input: CreateFinanceInvoicePaymentInput!) {
    createFinanceInvoicePayment(input: $input) {
      financeInvoicePayment {
        id
        financeInvoice {
          id
        }
        productName
        description
        quantity
        price
        financeTaxRate {
          id
          name
        }
      }
    }
  }
'''

        self.invoice_payment_update_mutation = '''
  mutation UpdateFinanceInvoicePayment($input: UpdateFinanceInvoicePaymentInput!) {
    updateFinanceInvoicePayment(input: $input) {
      financeInvoicePayment {
        id
        financeInvoice {
          id
        }
        productName
        description
        quantity
        price
        financeTaxRate {
          id
          name
        }
        financeGlaccount {
          id
          name
        }
        financeCostcenter {
          id
          name
        }
      }
    }
  }
'''

        self.invoice_payment_delete_mutation = '''
  mutation DeleteFinanceInvoicePayment($input: DeleteFinanceInvoicePaymentInput!) {
    deleteFinanceInvoicePayment(input: $input) {
      ok
    }
  }
'''

    def tearDown(self):
        # This is run after every test
        pass


    def test_query(self):
        """ Query list of account invoice payments """
        query = self.invoice_payments_query
        invoice_payment = f.FinanceInvoicePaymentFactory.create()

        variables = {
          "financeInvoice": to_global_id('FinanceInvoiceNode', invoice_payment.finance_invoice.pk)
        }

        executed = execute_test_client_api_query(query, self.admin_user, variables=variables)
        data = executed.get('data')

        self.assertEqual(
          data['financeInvoicePayments']['edges'][0]['node']['id'],
          to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)
        )
        self.assertEqual(
          data['financeInvoicePayments']['edges'][0]['node']['financeInvoice']['id'],
          to_global_id('FinanceInvoiceNode', invoice_payment.finance_invoice.id)
        )
        self.assertEqual(data['financeInvoicePayments']['edges'][0]['node']['date'], str(invoice_payment.date))
        self.assertEqual(data['financeInvoicePayments']['edges'][0]['node']['amount'], invoice_payment.amount)
        self.assertEqual(data['financeInvoicePayments']['edges'][0]['node']['note'], invoice_payment.note)
        self.assertEqual(
          data['financeInvoicePayments']['edges'][0]['node']['financePaymentMethod']['id'], 
          to_global_id('FinancePaymentMethodNode', invoice_payment.finance_payment_method.id)
        )


    def test_query_permision_denied(self):
        """ Query list of account invoice payments - check permission denied """
        query = self.invoice_payments_query
        invoice_payment = f.FinanceInvoicePaymentFactory.create()

        variables = {
          "financeInvoice": to_global_id('FinanceInvoicePaymentNode', invoice_payment.finance_invoice.pk)
        }

        # Create regular user
        user = get_user_model().objects.get(pk=invoice_payment.finance_invoice.account.id)
        executed = execute_test_client_api_query(query, user, variables=variables)
        errors = executed.get('errors')

        self.assertEqual(errors[0]['message'], 'Permission denied!')


    def test_query_permision_granted(self):
        """ Query list of account invoice payments with view permission """
        query = self.invoice_payments_query
        invoice_payment = f.FinanceInvoicePaymentFactory.create()

        variables = {
          "financeInvoice": to_global_id('FinanceInvoicePaymentNode', invoice_payment.finance_invoice.pk)
        }


        # Create regular user
        user = get_user_model().objects.get(pk=invoice_payment.finance_invoice.account.id)
        permission = Permission.objects.get(codename='view_financeinvoicepayment')
        user.user_permissions.add(permission)
        user.save()

        executed = execute_test_client_api_query(query, user, variables=variables)
        data = executed.get('data')

        # List selected invoice payments
        self.assertEqual(
          data['financeInvoicePayments']['edges'][0]['node']['id'],
          to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)
        )


    def test_query_anon_user(self):
        """ Query list of account invoice payments - anon user """
        query = self.invoice_payments_query
        invoice_payment = f.FinanceInvoicePaymentFactory.create()

        variables = {
          "financeInvoice": to_global_id('FinanceInvoicePaymentNode', invoice_payment.finance_invoice.pk)
        }

        executed = execute_test_client_api_query(query, self.anon_user, variables=variables)
        errors = executed.get('errors')
        self.assertEqual(errors[0]['message'], 'Not logged in!')


    def test_query_one(self):
        """ Query one account invoice payment as admin """   
        invoice_payment = f.FinanceInvoicePaymentFactory.create()
        
        variables = {
            "id": to_global_id("FinanceInvoicePaymentNode", invoice_payment.id),
        }

        # Now query single invoice and check
        executed = execute_test_client_api_query(self.invoice_payment_query, self.admin_user, variables=variables)
        data = executed.get('data')

        self.assertEqual(
            data['financeInvoicePayment']['id'],
            to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)
        )
        self.assertEqual(
            data['financeInvoicePayment']['financeInvoice']['id'],
            to_global_id('FinanceInvoiceNode', invoice_payment.finance_invoice.id)
        )
        self.assertEqual(data['financeInvoicePayment']['date'], str(invoice_payment.date))
        self.assertEqual(data['financeInvoicePayment']['amount'], invoice_payment.amount)
        self.assertEqual(data['financeInvoicePayment']['note'], invoice_payment.note)
        self.assertEqual(
            data['financeInvoicePayment']['financePaymentMethod']['id'],
            to_global_id('FinancePaymentMethodNode', invoice_payment.finance_payment_method.id)
        )


    def test_query_one_anon_user(self):
        """ Deny permission for anon users Query one account invoice """   
        invoice_payment = f.FinanceInvoicePaymentFactory.create()
        
        variables = {
            "id": to_global_id("FinanceInvoicePaymentNode", invoice_payment.id),
        }

        # Now query single invoice and check
        executed = execute_test_client_api_query(self.invoice_payment_query, self.anon_user, variables=variables)
        errors = executed.get('errors')
        self.assertEqual(errors[0]['message'], 'Not logged in!')


    def test_query_one_permission_denied(self):
        """ Permission denied message when user lacks authorization """   
        # Create regular user
        invoice_payment = f.FinanceInvoicePaymentFactory.create()
        user = invoice_payment.finance_invoice.account

        variables = {
            "id": to_global_id("FinanceInvoicePaymentNode", invoice_payment.id),
        }

        # Now query single invoice and check
        executed = execute_test_client_api_query(self.invoice_payment_query, user, variables=variables)
        errors = executed.get('errors')
        self.assertEqual(errors[0]['message'], 'Permission denied!')


    def test_query_one_permission_granted(self):
        """ Respond with data when user has permission """   
        invoice_payment = f.FinanceInvoicePaymentFactory.create()
        user = invoice_payment.finance_invoice.account
        permission = Permission.objects.get(codename='view_financeinvoicepayment')
        user.user_permissions.add(permission)
        user.save()
        
        variables = {
            "id": to_global_id("FinanceInvoicePaymentNode", invoice_payment.id),
        }

        # Now query single invoice and check   
        executed = execute_test_client_api_query(self.invoice_payment_query, user, variables=variables)
        data = executed.get('data')
        self.assertEqual(
            data['financeInvoicePayment']['id'],
            to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)
        )


    # def test_create_invoice_payment(self):
    #     """ Create an account invoice """
    #     query = self.invoice_payment_create_mutation

    #     invoice = f.FinanceInvoiceFactory.create()
    #     variables = self.variables_create
    #     variables['input']['financeInvoice'] = to_global_id('FinanceInvoiceNode', invoice.id)

    #     executed = execute_test_client_api_query(
    #         query, 
    #         self.admin_user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')

    #     # Get invoice
    #     rid = get_rid(data['createFinanceInvoicePayment']['financeInvoicePayment']['financeInvoice']['id'])
    #     invoice = models.FinanceInvoice.objects.get(pk=rid.id)

    #     self.assertEqual(
    #         data['createFinanceInvoicePayment']['financeInvoicePayment']['financeInvoice']['id'], 
    #         variables['input']['financeInvoice']
    #     )


    # def test_create_invoice_payment_anon_user(self):
    #     """ Don't allow creating account invoices for non-logged in users """
    #     query = self.invoice_payment_create_mutation

    #     invoice = f.FinanceInvoiceFactory.create()
    #     variables = self.variables_create
    #     variables['input']['financeInvoice'] = to_global_id('FinanceInvoiceNode', invoice.id)
        
    #     executed = execute_test_client_api_query(
    #         query, 
    #         self.anon_user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     errors = executed.get('errors')
    #     self.assertEqual(errors[0]['message'], 'Not logged in!')


    # def test_create_invoice_payment_permission_granted(self):
    #     """ Allow creating invoices for users with permissions """
    #     query = self.invoice_payment_create_mutation

    #     invoice = f.FinanceInvoiceFactory.create()
    #     variables = self.variables_create
    #     variables['input']['financeInvoice'] = to_global_id('FinanceInvoiceNode', invoice.id)

    #     # Create regular user
    #     user = get_user_model().objects.get(pk=invoice.account.id)
    #     permission = Permission.objects.get(codename=self.permission_add)
    #     user.user_permissions.add(permission)
    #     user.save()

    #     executed = execute_test_client_api_query(
    #         query, 
    #         user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     self.assertEqual(
    #         data['createFinanceInvoicePayment']['financeInvoicePayment']['financeInvoice']['id'], 
    #         variables['input']['financeInvoice']
    #     )


    # def test_create_invoice_payment_permission_denied(self):
    #     """ Check create invoice permission denied error message """
    #     query = self.invoice_payment_create_mutation

    #     invoice = f.FinanceInvoiceFactory.create()
    #     variables = self.variables_create
    #     variables['input']['financeInvoice'] = to_global_id('FinanceInvoiceNode', invoice.id)

    #     # Create regular user
    #     user = get_user_model().objects.get(pk=invoice.account.id)

    #     executed = execute_test_client_api_query(
    #         query, 
    #         user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     errors = executed.get('errors')
    #     self.assertEqual(errors[0]['message'], 'Permission denied!')


    # def test_update_invoice_payment(self):
    #     """ Update a invoice payment """
    #     query = self.invoice_payment_update_mutation

    #     invoice_payment = f.FinanceInvoicePaymentFactory.create()
    #     variables = self.variables_update
    #     variables['input']['id'] = to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)

    #     executed = execute_test_client_api_query(
    #         query, 
    #         self.admin_user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')

    #     self.assertEqual(data['updateFinanceInvoicePayment']['financeInvoicePayment']['productName'], variables['input']['productName'])
    #     self.assertEqual(data['updateFinanceInvoicePayment']['financeInvoicePayment']['description'], variables['input']['description'])
    #     self.assertEqual(data['updateFinanceInvoicePayment']['financeInvoicePayment']['quantity'], variables['input']['quantity'])
    #     self.assertEqual(data['updateFinanceInvoicePayment']['financeInvoicePayment']['price'], variables['input']['price'])
    #     self.assertEqual(
    #       data['updateFinanceInvoicePayment']['financeInvoicePayment']['financeTaxRate']['id'], 
    #       variables['input']['financeTaxRate']
    #     )
    #     self.assertEqual(
    #       data['updateFinanceInvoicePayment']['financeInvoicePayment']['financeGlaccount']['id'], 
    #       variables['input']['financeGlaccount']
    #     )
    #     self.assertEqual(
    #       data['updateFinanceInvoicePayment']['financeInvoicePayment']['financeCostcenter']['id'], 
    #       variables['input']['financeCostcenter']
    #     )


    # def test_update_invoice_payment_anon_user(self):
    #     """ Don't allow updating invoices for non-logged in users """
    #     query = self.invoice_payment_update_mutation

    #     invoice_payment = f.FinanceInvoicePaymentFactory.create()
    #     variables = self.variables_update
    #     variables['input']['id'] = to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)

    #     executed = execute_test_client_api_query(
    #         query, 
    #         self.anon_user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     errors = executed.get('errors')
    #     self.assertEqual(errors[0]['message'], 'Not logged in!')


    # def test_update_invoice_payment_permission_granted(self):
    #     """ Allow updating invoices for users with permissions """
    #     query = self.invoice_payment_update_mutation

    #     invoice_payment = f.FinanceInvoicePaymentFactory.create()
    #     variables = self.variables_update
    #     variables['input']['id'] = to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)

    #     user = invoice_payment.finance_invoice.account
    #     permission = Permission.objects.get(codename=self.permission_change)
    #     user.user_permissions.add(permission)
    #     user.save()

    #     executed = execute_test_client_api_query(
    #         query, 
    #         user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     self.assertEqual(data['updateFinanceInvoicePayment']['financeInvoicePayment']['productName'], variables['input']['productName'])


    # def test_update_invoice_payment_permission_denied(self):
    #     """ Check update invoice permission denied error message """
    #     query = self.invoice_payment_update_mutation

    #     invoice_payment = f.FinanceInvoicePaymentFactory.create()
    #     variables = self.variables_update
    #     variables['input']['id'] = to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)

    #     user = invoice_payment.finance_invoice.account

    #     executed = execute_test_client_api_query(
    #         query, 
    #         user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     errors = executed.get('errors')
    #     self.assertEqual(errors[0]['message'], 'Permission denied!')


    # def test_delete_invoice(self):
    #     """ Delete an account invoice """
    #     query = self.invoice_payment_delete_mutation
    #     invoice_payment = f.FinanceInvoicePaymentFactory.create()
    #     variables = {"input":{}}
    #     variables['input']['id'] = to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)

    #     executed = execute_test_client_api_query(
    #         query, 
    #         self.admin_user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     self.assertEqual(data['deleteFinanceInvoicePayment']['ok'], True)


    # def test_delete_invoice_payment_anon_user(self):
    #     """ Delete invoice denied for anon user """
    #     query = self.invoice_payment_delete_mutation
    #     invoice_payment = f.FinanceInvoicePaymentFactory.create()
    #     variables = {"input":{}}
    #     variables['input']['id'] = to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)

    #     executed = execute_test_client_api_query(
    #         query, 
    #         self.anon_user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     errors = executed.get('errors')
    #     self.assertEqual(errors[0]['message'], 'Not logged in!')


    # def test_delete_invoice_payment_permission_granted(self):
    #     """ Allow deleting invoices for users with permissions """
    #     query = self.invoice_payment_delete_mutation
    #     invoice_payment = f.FinanceInvoicePaymentFactory.create()
    #     variables = {"input":{}}
    #     variables['input']['id'] = to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)

    #     # Give permissions
    #     user = invoice_payment.finance_invoice.account
    #     permission = Permission.objects.get(codename=self.permission_delete)
    #     user.user_permissions.add(permission)
    #     user.save()

    #     executed = execute_test_client_api_query(
    #         query, 
    #         user,
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     self.assertEqual(data['deleteFinanceInvoicePayment']['ok'], True)


    # def test_delete_invoice_payment_permission_denied(self):
    #     """ Check delete invoice permission denied error message """
    #     query = self.invoice_payment_delete_mutation
    #     invoice_payment = f.FinanceInvoicePaymentFactory.create()
    #     variables = {"input":{}}
    #     variables['input']['id'] = to_global_id('FinanceInvoicePaymentNode', invoice_payment.id)
        
    #     user = invoice_payment.finance_invoice.account

    #     executed = execute_test_client_api_query(
    #         query, 
    #         user, 
    #         variables=variables
    #     )
    #     data = executed.get('data')
    #     errors = executed.get('errors')
    #     self.assertEqual(errors[0]['message'], 'Permission denied!')

