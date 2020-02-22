import React, { useContext } from 'react'
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { v4 } from "uuid"
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'

import AppSettingsContext from '../../context/AppSettingsContext'

function InsightClasspassesSold ({ t, history }) {
  const appSettings = useContext(AppSettingsContext)
  const dateFormat = appSettings.dateFormat
  const timeFormat = appSettings.timeFormatMoment

  return (
    <SiteWrapper>
      <div className="my-3 my-md-5">
        <Container>
          <Page.Header title={t("insight.title")}>
            Header
          </Page.Header>
          <Grid.Row>
            <Grid.Col md={9}>
              Content
            </Grid.Col>
            <Grid.Col md={3}>
              Sidebar
            </Grid.Col>
          </Grid.Row>
        </Container>  
      </div>
    </SiteWrapper>
  )
}

export default withTranslation()(withRouter(InsightClasspassesSold))