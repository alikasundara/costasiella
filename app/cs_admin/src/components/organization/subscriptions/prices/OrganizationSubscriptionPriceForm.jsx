// @flow

import React from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"
import { Form as FoForm, Field, ErrorMessage } from 'formik'
import { v4 } from "uuid"

import {
  Button,
  Card,
  Form,
} from "tabler-react"

import DatePicker from "react-datepicker"


const OrganizationSubscriptionPriceForm = (
  { t, history, match, inputData, isSubmitting, errors, values, setFieldTouched, setFieldValue, return_url }
  ) => (
  <FoForm>
    <Card.Body>
      <Form.Group label={t('general.price')}>
        <Field type="text" 
              name="price" 
              className={(errors.price) ? "form-control is-invalid" : "form-control"} 
              autoComplete="off" />
        <ErrorMessage name="price" component="span" className="invalid-feedback" />
      </Form.Group>
      <Form.Group label={t('general.taxrate')}>
        <Field component="select" 
                name="financeTaxRate" 
                className={(errors.financeTaxRate) ? "form-control is-invalid" : "form-control"} 
                autoComplete="off">
          {console.log("query data in classpass add:")}
          {console.log(inputData)}
          <option value="" key={v4()}></option>
          {inputData.financeTaxrates.edges.map(({ node }) =>
            <option value={node.id} key={v4()}>{node.name} ({node.percentage}% {node.rateType})</option>
          )}
        </Field>
        <ErrorMessage name="financeTaxRate" component="span" className="invalid-feedback" />
      </Form.Group>
      <Form.Group label={t('general.date_start')}>
        <DatePicker 
          locale='nl-NL'
          selected={values.dateStart}
          className="form-control"
          onChange={(date) => { 
            let res = date.split('T')
            setFieldValue("dateStart", res[0])
          }}
          onBlur={() => setFieldTouched("dateStart", true)}
        />
        {/* <Field type="text" 
               name="dateStart" 
               className={(errors.dateStart) ? "form-control is-invalid" : "form-control"} 
               autoComplete="off" /> */}
        <ErrorMessage name="dateStart" component="span" className="invalid-feedback" />
      </Form.Group>
      <Form.Group label={t('general.date_end')}>
        <Field type="text" 
               name="dateEnd" 
               className={(errors.dateEnd) ? "form-control is-invalid" : "form-control"} 
               autoComplete="off" />
        <ErrorMessage name="dateEnd" component="span" className="invalid-feedback" />
      </Form.Group>
    </Card.Body>
    <Card.Footer>
      <Button 
        color="primary"
        className="pull-right" 
        type="submit" 
        disabled={isSubmitting}
      >
        {t('general.submit')}
      </Button>
      <Button color="link" onClick={() => history.push(return_url)}>
        {t('general.cancel')}
      </Button>
    </Card.Footer>
  </FoForm>
);

export default withTranslation()(withRouter(OrganizationSubscriptionPriceForm))