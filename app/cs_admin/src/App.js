// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';


import React, { Component } from 'react'
import {Route, Switch, HashRouter} from 'react-router-dom'
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

// Import moment locale
import moment from 'moment'
import 'moment/locale/nl'

import HomeHome from './components/home/home/HomeHome'

import FinanceHome from './components/finance/home/FinanceHome'
import FinanceCostCenters from './components/finance/costcenters/FinanceCostCenters'
import FinanceCostCenterAdd from './components/finance/costcenters/FinanceCostCenterAdd'
import FinanceCostCenterEdit from './components/finance/costcenters/FinanceCostCenterEdit'
import FinanceGLAccounts from './components/finance/glaccounts/FinanceGLAccounts'
import FinanceGLAccountAdd from './components/finance/glaccounts/FinanceGLAccountAdd'
import FinanceGLAccountEdit from './components/finance/glaccounts/FinanceGLAccountEdit'
import FinancePaymentMethods from './components/finance/payment_methods/FinancePaymentMethods'
import FinancePaymentMethodAdd from './components/finance/payment_methods/FinancePaymentMethodAdd'
import FinancePaymentMethodEdit from './components/finance/payment_methods/FinancePaymentMethodEdit'
import FinanceTaxRates from './components/finance/taxrates/FinanceTaxRates'
import FinanceTaxRatesAdd from './components/finance/taxrates/FinanceTaxRateAdd'
import FinanceTaxRatesEdit from './components/finance/taxrates/FinanceTaxRateEdit'

import OrganizationHome from './components/organization/home/OrganizationHome'
import OrganizationAppointments from './components/organization/appointment_categories/appointments/OrganizationAppointments'
import OrganizationAppointmentAdd from './components/organization/appointment_categories/appointments/OrganizationAppointmentAdd'
import OrganizationAppointmentEdit from './components/organization/appointment_categories/appointments/OrganizationAppointmentEdit'
import OrganizationAppointmentCategories from './components/organization/appointment_categories/OrganizationAppointmentCategories'
import OrganizationAppointmentCategoryAdd from './components/organization/appointment_categories/OrganizationAppointmentCategoryAdd'
import OrganizationAppointmentCategoryEdit from './components/organization/appointment_categories/OrganizationAppointmentCategoryEdit'
import OrganizationClasspasses from './components/organization/classpasses/OrganizationClasspasses'
import OrganizationClasspassAdd from './components/organization/classpasses/OrganizationClasspassAdd'
import OrganizationClasspassEdit from './components/organization/classpasses/OrganizationClasspassEdit'
import OrganizationClasspassesGroups from './components/organization/classpasses_groups/OrganizationClasspassesGroups'
import OrganizationClasspassesGroupAdd from './components/organization/classpasses_groups/OrganizationClasspassesGroupAdd'
import OrganizationClasspassesGroupEdit from './components/organization/classpasses_groups/OrganizationClasspassesGroupEdit'
import OrganizationClasspassesGroupEditPasses from './components/organization/classpasses_groups/OrganizationClasspassesGroupEditPasses'
import OrganizationClasstypes from './components/organization/classtypes/OrganizationClasstypes'
import OrganizationClasstypeAdd from './components/organization/classtypes/OrganizationClasstypeAdd'
import OrganizationClasstypeEdit from './components/organization/classtypes/OrganizationClasstypeEdit'
import OrganizationClasstypeEditImage from './components/organization/classtypes/OrganizationClasstypeEditImage'
import OrganizationDiscoveries from './components/organization/discovery/OrganizationDiscoveries'
import OrganizationDiscoveryAdd from './components/organization/discovery/OrganizationDiscoveryAdd'
import OrganizationDiscoveryEdit from './components/organization/discovery/OrganizationDiscoveryEdit'
import OrganizationLocations from './components/organization/locations/OrganizationLocations'
import OrganizationLocationAdd from './components/organization/locations/OrganizationLocationAdd'
import OrganizationLocationEdit from './components/organization/locations/OrganizationLocationEdit'
import OrganizationLocationRooms from './components/organization/locations/rooms/OrganizationLocationRooms'
import OrganizationLocationRoomAdd from './components/organization/locations/rooms/OrganizationLocationRoomAdd'
import OrganizationLocationRoomEdit from './components/organization/locations/rooms/OrganizationLocationRoomEdit'
import OrganizationLevels from './components/organization/levels/OrganizationLevels'
import OrganizationLevelAdd from './components/organization/levels/OrganizationLevelAdd'
import OrganizationLevelEdit from './components/organization/levels/OrganizationLevelEdit'
import OrganizationMemberships from './components/organization/memberships/OrganizationMemberships'
import OrganizationMembershipAdd from './components/organization/memberships/OrganizationMembershipAdd'
import OrganizationMembershipEdit from './components/organization/memberships/OrganizationMembershipEdit'
import OrganizationSubscriptions from './components/organization/subscriptions/OrganizationSubscriptions'
import OrganizationSubscriptionAdd from './components/organization/subscriptions/OrganizationSubscriptionAdd'
import OrganizationSubscriptionEdit from './components/organization/subscriptions/OrganizationSubscriptionEdit'
import OrganizationSubscriptionsGroups from './components/organization/subscriptions_groups/OrganizationSubscriptionsGroups'
import OrganizationSubscriptionsGroupAdd from './components/organization/subscriptions_groups/OrganizationSubscriptionsGroupAdd'
import OrganizationSubscriptionsGroupEdit from './components/organization/subscriptions_groups/OrganizationSubscriptionsGroupEdit'
import OrganizationSubscriptionsGroupEditSubscriptions from './components/organization/subscriptions_groups/OrganizationSubscriptionsGroupEditSubscriptions'
import OrganizationSubscriptionsPrices from './components/organization/subscriptions/prices/OrganizationSubscriptionsPrices'
import OrganizationSubscriptionPriceAdd from './components/organization/subscriptions/prices/OrganizationSubscriptionPriceAdd'
import OrganizationSubscriptionPriceEdit from './components/organization/subscriptions/prices/OrganizationSubscriptionPriceEdit'

import RelationsHome from './components/relations/home/RelationsHome'
import RelationsAccounts from './components/relations/accounts/RelationsAccounts'
import RelationsAccountAdd from './components/relations/accounts/RelationsAccountAdd'
import RelationsAccountProfile from './components/relations/accounts/RelationsAccountProfile'
import AccountClasspasses from './components/relations/accounts/classpasses/AccountClasspasses'
import AccountClasspassAdd from './components/relations/accounts/classpasses/AccountClasspassAdd'
import AccountClasspassEdit from './components/relations/accounts/classpasses/AccountClasspassEdit'
import AccountMemberships from './components/relations/accounts/memberships/AccountMemberships'
import AccountMembershipAdd from './components/relations/accounts/memberships/AccountMembershipAdd'
import AccountMembershipEdit from './components/relations/accounts/memberships/AccountMembershipEdit'
import AccountSubscriptions from './components/relations/accounts/subscriptions/AccountSubscriptions'
import AccountSubscriptionAdd from './components/relations/accounts/subscriptions/AccountSubscriptionAdd'
import AccountSubscriptionEdit from './components/relations/accounts/subscriptions/AccountSubscriptionEdit'
import RelationsAccountTeacherProfile from './components/relations/accounts/teacher_profile/RelationsAccountTeacherProfile'

import ScheduleHome from './components/schedule/home/ScheduleHome'
import ScheduleClasses from './components/schedule/classes/ScheduleClasses'
import ScheduleClassAdd from './components/schedule/classes/ScheduleClassAdd'
import ScheduleClassEditAll from './components/schedule/classes/all/edit/ScheduleClassEditAll'
import ScheduleClassClasspasses from './components/schedule/classes/all/classpasses/ScheduleClassClasspasses'
import ScheduleClassSubscriptions from './components/schedule/classes/all/subscriptions/ScheduleClassSubscriptions'
import ScheduleClassTeachers from './components/schedule/classes/all/teachers/ScheduleClassTeachers'
import ScheduleClassTeacherAdd from './components/schedule/classes/all/teachers/ScheduleClassTeacherAdd'
import ScheduleClassTeacherEdit from './components/schedule/classes/all/teachers/ScheduleClassTeacherEdit'


import Error404 from "./components/Error404"

// Tabler css 
import "tabler-react/dist/Tabler.css"
// React-datepicker css
import "react-datepicker/dist/react-datepicker.css"
// App css
import './App.css'

// Register "nl" locale for react-datepicker
// https://reactdatepicker.com/#example-17
import { registerLocale } from "react-datepicker"
import nl from 'date-fns/locale/nl';
registerLocale('nl', nl);

const client = new ApolloClient({
     uri: "http://localhost:8000/graphql/",
})


const GET_USER = gql`
  query {
    user {
    id
    email
    firstName
    lastName
  }
}
`


class App extends Component {
  
  componentWillMount() {
    client.query({
      query:GET_USER
    })
  }

  render() {
    // Register "NL" locale for moment
    moment.locale('en-US')

    return (
      <HashRouter>
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={HomeHome} />
            
            {/* FINANCE */}
            <Route exact path="/finance" component={FinanceHome} />
            <Route exact path="/finance/costcenters" component={FinanceCostCenters} />
            <Route exact path="/finance/costcenters/add" component={FinanceCostCenterAdd} />
            <Route exact path="/finance/costcenters/edit/:id" component={FinanceCostCenterEdit} />
            <Route exact path="/finance/glaccounts" component={FinanceGLAccounts} />
            <Route exact path="/finance/glaccounts/add" component={FinanceGLAccountAdd} />
            <Route exact path="/finance/glaccounts/edit/:id" component={FinanceGLAccountEdit} />
            <Route exact path="/finance/paymentmethods" component={FinancePaymentMethods} />
            <Route exact path="/finance/paymentmethods/add" component={FinancePaymentMethodAdd} />
            <Route exact path="/finance/paymentmethods/edit/:id" component={FinancePaymentMethodEdit} />
            <Route exact path="/finance/taxrates" component={FinanceTaxRates} />
            <Route exact path="/finance/taxrates/add" component={FinanceTaxRatesAdd} />
            <Route exact path="/finance/taxrates/edit/:id" component={FinanceTaxRatesEdit} />
            
            {/* ORGANIZATION */}
            <Route exact path="/organization" component={OrganizationHome} />
            <Route exact path="/organization/appointment_categories" component={OrganizationAppointmentCategories} />
            <Route exact path="/organization/appointment_categories/add" component={OrganizationAppointmentCategoryAdd} />
            <Route exact path="/organization/appointment_categories/edit/:id" component={OrganizationAppointmentCategoryEdit} />
            <Route exact path="/organization/appointment_categories/appointments/:category_id" component={OrganizationAppointments} />
            <Route exact path="/organization/appointment_categories/appointments/add/:category_id" component={OrganizationAppointmentAdd} />
            <Route exact path="/organization/appointment_categories/appointments/edit/:category_id/:id" component={OrganizationAppointmentEdit} />
            <Route exact path="/organization/classpasses" component={OrganizationClasspasses} />
            <Route exact path="/organization/classpasses/add" component={OrganizationClasspassAdd} />
            <Route exact path="/organization/classpasses/edit/:id" component={OrganizationClasspassEdit} />    
            <Route exact path="/organization/classpasses/groups" component={OrganizationClasspassesGroups} />
            <Route exact path="/organization/classpasses/groups/add" component={OrganizationClasspassesGroupAdd} />
            <Route exact path="/organization/classpasses/groups/edit/:id" component={OrganizationClasspassesGroupEdit} />
            <Route exact path="/organization/classpasses/groups/edit/passes/:id" component={OrganizationClasspassesGroupEditPasses} />
            <Route exact path="/organization/classtypes" component={OrganizationClasstypes} />
            <Route exact path="/organization/classtypes/add" component={OrganizationClasstypeAdd} />
            <Route exact path="/organization/classtypes/edit/:id" component={OrganizationClasstypeEdit} />
            <Route exact path="/organization/classtypes/edit_image/:id" component={OrganizationClasstypeEditImage} />
            <Route exact path="/organization/discoveries" component={OrganizationDiscoveries} />
            <Route exact path="/organization/discoveries/add" component={OrganizationDiscoveryAdd} /> 
            <Route exact path="/organization/discoveries/edit/:id" component={OrganizationDiscoveryEdit} /> 
            <Route exact path="/organization/levels" component={OrganizationLevels} />
            <Route exact path="/organization/levels/add" component={OrganizationLevelAdd} />
            <Route exact path="/organization/levels/edit/:id" component={OrganizationLevelEdit} />
            <Route exact path="/organization/locations" component={OrganizationLocations} />
            <Route exact path="/organization/locations/add" component={OrganizationLocationAdd} />
            <Route exact path="/organization/locations/edit/:id" component={OrganizationLocationEdit} />
            <Route exact path="/organization/locations/rooms/:location_id" component={OrganizationLocationRooms} />
            <Route exact path="/organization/locations/rooms/add/:location_id" component={OrganizationLocationRoomAdd} />
            <Route exact path="/organization/locations/rooms/edit/:location_id/:id" component={OrganizationLocationRoomEdit} />
            <Route exact path="/organization/memberships" component={OrganizationMemberships} />
            <Route exact path="/organization/memberships/add" component={OrganizationMembershipAdd} />
            <Route exact path="/organization/memberships/edit/:id" component={OrganizationMembershipEdit} /> 
            <Route exact path="/organization/subscriptions" component={OrganizationSubscriptions} />
            <Route exact path="/organization/subscriptions/add" component={OrganizationSubscriptionAdd} />
            <Route exact path="/organization/subscriptions/edit/:id" component={OrganizationSubscriptionEdit} />
            <Route exact path="/organization/subscriptions/groups" component={OrganizationSubscriptionsGroups} />
            <Route exact path="/organization/subscriptions/groups/add" component={OrganizationSubscriptionsGroupAdd} />
            <Route exact path="/organization/subscriptions/groups/edit/:id" component={OrganizationSubscriptionsGroupEdit} />
            <Route exact path="/organization/subscriptions/groups/edit/subscriptions/:id" component={OrganizationSubscriptionsGroupEditSubscriptions} />
            <Route exact path="/organization/subscriptions/prices/:subscription_id" component={OrganizationSubscriptionsPrices} />
            <Route exact path="/organization/subscriptions/prices/add/:subscription_id" component={OrganizationSubscriptionPriceAdd} />
            <Route exact path="/organization/subscriptions/prices/edit/:subscription_id/:id" component={OrganizationSubscriptionPriceEdit} />

            {/* RELATIONS */}
            <Route exact path="/relations" component={RelationsHome} />
            <Route exact path="/relations/accounts" component={RelationsAccounts} />
            <Route exact path="/relations/accounts/add" component={RelationsAccountAdd} />
            <Route exact path="/relations/accounts/:account_id/profile" component={RelationsAccountProfile} />
            <Route exact path="/relations/accounts/:account_id/classpasses" component={AccountClasspasses} />
            <Route exact path="/relations/accounts/:account_id/classpasses/add" component={AccountClasspassAdd} />
            <Route exact path="/relations/accounts/:account_id/classpasses/edit/:id" component={AccountClasspassEdit} />
            <Route exact path="/relations/accounts/:account_id/memberships" component={AccountMemberships} />
            <Route exact path="/relations/accounts/:account_id/memberships/add" component={AccountMembershipAdd} />
            <Route exact path="/relations/accounts/:account_id/memberships/edit/:id" component={AccountMembershipEdit} />
            <Route exact path="/relations/accounts/:account_id/subscriptions" component={AccountSubscriptions} />
            <Route exact path="/relations/accounts/:account_id/subscriptions/add" component={AccountSubscriptionAdd} />
            <Route exact path="/relations/accounts/:account_id/subscriptions/edit/:id" component={AccountSubscriptionEdit} />
            <Route exact path="/relations/accounts/:account_id/teacher_profile" component={RelationsAccountTeacherProfile} />

            {/* SCHEDULE */}
            <Route exact path="/schedule" component={ScheduleHome} />
            <Route exact path="/schedule/classes" component={ScheduleClasses} />
            <Route exact path="/schedule/classes/add/" component={ScheduleClassAdd} />
            <Route exact path="/schedule/classes/all/edit/:class_id/" component={ScheduleClassEditAll} />
            <Route exact path="/schedule/classes/all/classpasses/:class_id/" component={ScheduleClassClasspasses} />
            <Route exact path="/schedule/classes/all/subscriptions/:class_id/" component={ScheduleClassSubscriptions} />
            <Route exact path="/schedule/classes/all/teachers/:class_id/" component={ScheduleClassTeachers} />
            <Route exact path="/schedule/classes/all/teachers/:class_id/add" component={ScheduleClassTeacherAdd} />
            <Route exact path="/schedule/classes/all/teachers/:class_id/edit/:id" component={ScheduleClassTeacherEdit} />

            <Route component={Error404} />
          </Switch>
        </ApolloProvider>
      </HashRouter>
    )};
}

export default App

