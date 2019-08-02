// @flow

import React from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"


import {
  Card
} from "tabler-react"


import { UPDATE_INVOICE } from "./queries"


const FinanceInvoiceEditSummary = ({ t, history, data }) => (
  <Card statusColor="blue">
    <Card.Header>
      <Card.Title>{t('general.summary')}</Card.Title>
    </Card.Header>
    <Card.Body>
      summary form here
    </Card.Body>
  </Card>
)

export default withTranslation()(withRouter(FinanceInvoiceEditSummary))