// @flow

import React from 'react'
import { withTranslation } from 'react-i18next'
import { t } from 'i18next'
import { v4 } from 'uuid'
import { withRouter } from "react-router"
import { Form as FoForm, Field, ErrorMessage } from 'formik'


import {
  Button,
  Card,
  Form,
  Grid
} from "tabler-react"


import CSDatePicker from "../../ui/CSDatePicker"


const RelationsAccountProfileForm = ({ t, history, isSubmitting, errors, values, return_url, setFieldTouched, setFieldValue }) => (
  <FoForm>
      <Card.Body>
        <Grid.Row>
          <Grid.Col>
            <Form.Group label={t('general.first_name')}>
              <Field type="text" 
                      name="firstName" 
                      className={(errors.firstName) ? "form-control is-invalid" : "form-control"} 
                      autoComplete="off" />
              <ErrorMessage name="firstName" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label={t('general.last_name')}>
              <Field type="text" 
                      name="lastName" 
                      className={(errors.lastName) ? "form-control is-invalid" : "form-control"} 
                      autoComplete="off" />
              <ErrorMessage name="lastName" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label={t('general.date_of_birth')}>
              <CSDatePicker 
                selected={values.dateOfBirth}
                onChange={(date) => setFieldValue("dateOfBirth", date)}
                onBlur={() => setFieldTouched("dateOfBirth", true)}
              />
              <ErrorMessage name="dateOfBirth" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label={t('general.gender')}>
              <Field component="select" 
                    name="gender" 
                    className={(errors.organizationMembership) ? "form-control is-invalid" : "form-control"} 
                    autoComplete="off">
                <option value=""></option>
                <option value="F">{t("genders.female")}</option>
                <option value="M">{t("genders.male")}</option>
                <option value="X">{t("genders.other")}</option>
              </Field>
              <ErrorMessage name="gender" component="span" className="invalid-feedback" />
            </Form.Group> 
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Form.Group label={t('general.email')}>
              <Field type="text" 
                      name="email" 
                      className={(errors.email) ? "form-control is-invalid" : "form-control"} 
                      autoComplete="off" />
              <ErrorMessage name="email" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label={t('relations.accounts.emergency')}>
              <Field type="text" 
                     name="emergency" 
                     className={(errors.emergency) ? "form-control is-invalid" : "form-control"} 
                     autoComplete="off" />
              <ErrorMessage name="emergency" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Form.Group label={t('general.phone')}>
              <Field type="text" 
                      name="phone" 
                      className={(errors.phone) ? "form-control is-invalid" : "form-control"} 
                      autoComplete="off" />
              <ErrorMessage name="phone" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label={t('general.mobile')}>
              <Field type="text" 
                     name="mobile" 
                     className={(errors.mobile) ? "form-control is-invalid" : "form-control"} 
                     autoComplete="off" />
              <ErrorMessage name="mobile" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Form.Group label={t('general.address')}>
              <Field type="text" 
                      name="address" 
                      className={(errors.address) ? "form-control is-invalid" : "form-control"} 
                      autoComplete="off" />
              <ErrorMessage name="address" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label={t('general.postcode')}>
              <Field type="text" 
                     name="postcode" 
                     className={(errors.postcode) ? "form-control is-invalid" : "form-control"} 
                     autoComplete="off" />
              <ErrorMessage name="postcode" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Form.Group label={t('general.city')}>
              <Field type="text" 
                      name="city" 
                      className={(errors.city) ? "form-control is-invalid" : "form-control"} 
                      autoComplete="off" />
              <ErrorMessage name="city" component="span" className="invalid-feedback" />
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label={t('general.country')}>
              <Field component="select" 
                     name="country" 
                     className={(errors.country) ? "form-control is-invalid" : "form-control"} 
                     autoComplete="off">
                <option value=""></option>
                { ISO_COUNTRY_CODES.map(
                    country => <option value={country.Code} key={v4()}>{country.Name}</option>
                )}
              </Field>
              <ErrorMessage name="gender" component="span" className="invalid-feedback" />
            </Form.Group> 
          </Grid.Col>
        </Grid.Row>
      </Card.Body>
      <Card.Footer>
          <Button 
            color="primary"
            // className="pull-right" 
            type="submit" 
            disabled={isSubmitting}
          >
            {t('general.submit')}
          </Button>
          
          {/* <Button color="link" onClick={() => history.push(return_url)}>
              {t('general.cancel')}
          </Button> */}
      </Card.Footer>
  </FoForm>
)

export default withTranslation()(withRouter(RelationsAccountProfileForm))






const ISO_COUNTRY_CODES = [{"Name":t("countries.Afghanistan"),"Code":"AF"},{"Name":t("countries.Åland_Islands"),"Code":"AX"},{"Name":t("countries.Albania"),"Code":"AL"},{"Name":t("countries.Algeria"),"Code":"DZ"},{"Name":t("countries.American_Samoa"),"Code":"AS"},{"Name":t("countries.Andorra"),"Code":"AD"},{"Name":t("countries.Angola"),"Code":"AO"},{"Name":t("countries.Anguilla"),"Code":"AI"},{"Name":t("countries.Antarctica"),"Code":"AQ"},{"Name":t("countries.Antigua_and_Barbuda"),"Code":"AG"},{"Name":t("countries.Argentina"),"Code":"AR"},{"Name":t("countries.Armenia"),"Code":"AM"},{"Name":t("countries.Aruba"),"Code":"AW"},{"Name":t("countries.Australia"),"Code":"AU"},{"Name":t("countries.Austria"),"Code":"AT"},{"Name":t("countries.Azerbaijan"),"Code":"AZ"},{"Name":t("countries.Bahamas"),"Code":"BS"},{"Name":t("countries.Bahrain"),"Code":"BH"},{"Name":t("countries.Bangladesh"),"Code":"BD"},{"Name":t("countries.Barbados"),"Code":"BB"},{"Name":t("countries.Belarus"),"Code":"BY"},{"Name":t("countries.Belgium"),"Code":"BE"},{"Name":t("countries.Belize"),"Code":"BZ"},{"Name":t("countries.Benin"),"Code":"BJ"},{"Name":t("countries.Bermuda"),"Code":"BM"},{"Name":t("countries.Bhutan"),"Code":"BT"},{"Name":t("countries.Bolivia,_Plurinational_State_of"),"Code":"BO"},{"Name":t("countries.Bonaire,_Sint_Eustatius_and_Saba"),"Code":"BQ"},{"Name":t("countries.Bosnia_and_Herzegovina"),"Code":"BA"},{"Name":t("countries.Botswana"),"Code":"BW"},{"Name":t("countries.Bouvet_Island"),"Code":"BV"},{"Name":t("countries.Brazil"),"Code":"BR"},{"Name":t("countries.British_Indian_Ocean_Territory"),"Code":"IO"},{"Name":t("countries.Brunei_Darussalam"),"Code":"BN"},{"Name":t("countries.Bulgaria"),"Code":"BG"},{"Name":t("countries.Burkina_Faso"),"Code":"BF"},{"Name":t("countries.Burundi"),"Code":"BI"},{"Name":t("countries.Cambodia"),"Code":"KH"},{"Name":t("countries.Cameroon"),"Code":"CM"},{"Name":t("countries.Canada"),"Code":"CA"},{"Name":t("countries.Cape_Verde"),"Code":"CV"},{"Name":t("countries.Cayman_Islands"),"Code":"KY"},{"Name":t("countries.Central_African_Republic"),"Code":"CF"},{"Name":t("countries.Chad"),"Code":"TD"},{"Name":t("countries.Chile"),"Code":"CL"},{"Name":t("countries.China"),"Code":"CN"},{"Name":t("countries.Christmas_Island"),"Code":"CX"},{"Name":t("countries.Cocos_(Keeling)_Islands"),"Code":"CC"},{"Name":t("countries.Colombia"),"Code":"CO"},{"Name":t("countries.Comoros"),"Code":"KM"},{"Name":t("countries.Congo"),"Code":"CG"},{"Name":t("countries.Congo,_the_Democratic_Republic_of_the"),"Code":"CD"},{"Name":t("countries.Cook_Islands"),"Code":"CK"},{"Name":t("countries.Costa_Rica"),"Code":"CR"},{"Name":t("countries.Côte_d'Ivoire"),"Code":"CI"},{"Name":t("countries.Croatia"),"Code":"HR"},{"Name":t("countries.Cuba"),"Code":"CU"},{"Name":t("countries.Curaçao"),"Code":"CW"},{"Name":t("countries.Cyprus"),"Code":"CY"},{"Name":t("countries.Czech_Republic"),"Code":"CZ"},{"Name":t("countries.Denmark"),"Code":"DK"},{"Name":t("countries.Djibouti"),"Code":"DJ"},{"Name":t("countries.Dominica"),"Code":"DM"},{"Name":t("countries.Dominican_Republic"),"Code":"DO"},{"Name":t("countries.Ecuador"),"Code":"EC"},{"Name":t("countries.Egypt"),"Code":"EG"},{"Name":t("countries.El_Salvador"),"Code":"SV"},{"Name":t("countries.Equatorial_Guinea"),"Code":"GQ"},{"Name":t("countries.Eritrea"),"Code":"ER"},{"Name":t("countries.Estonia"),"Code":"EE"},{"Name":t("countries.Ethiopia"),"Code":"ET"},{"Name":t("countries.Falkland_Islands_(Malvinas)"),"Code":"FK"},{"Name":t("countries.Faroe_Islands"),"Code":"FO"},{"Name":t("countries.Fiji"),"Code":"FJ"},{"Name":t("countries.Finland"),"Code":"FI"},{"Name":t("countries.France"),"Code":"FR"},{"Name":t("countries.French_Guiana"),"Code":"GF"},{"Name":t("countries.French_Polynesia"),"Code":"PF"},{"Name":t("countries.French_Southern_Territories"),"Code":"TF"},{"Name":t("countries.Gabon"),"Code":"GA"},{"Name":t("countries.Gambia"),"Code":"GM"},{"Name":t("countries.Georgia"),"Code":"GE"},{"Name":t("countries.Germany"),"Code":"DE"},{"Name":t("countries.Ghana"),"Code":"GH"},{"Name":t("countries.Gibraltar"),"Code":"GI"},{"Name":t("countries.Greece"),"Code":"GR"},{"Name":t("countries.Greenland"),"Code":"GL"},{"Name":t("countries.Grenada"),"Code":"GD"},{"Name":t("countries.Guadeloupe"),"Code":"GP"},{"Name":t("countries.Guam"),"Code":"GU"},{"Name":t("countries.Guatemala"),"Code":"GT"},{"Name":t("countries.Guernsey"),"Code":"GG"},{"Name":t("countries.Guinea"),"Code":"GN"},{"Name":t("countries.Guinea-Bissau"),"Code":"GW"},{"Name":t("countries.Guyana"),"Code":"GY"},{"Name":t("countries.Haiti"),"Code":"HT"},{"Name":t("countries.Heard_Island_and_McDonald_Islands"),"Code":"HM"},{"Name":t("countries.Holy_See_(Vatican_City_State)"),"Code":"VA"},{"Name":t("countries.Honduras"),"Code":"HN"},{"Name":t("countries.Hong_Kong"),"Code":"HK"},{"Name":t("countries.Hungary"),"Code":"HU"},{"Name":t("countries.Iceland"),"Code":"IS"},{"Name":t("countries.India"),"Code":"IN"},{"Name":t("countries.Indonesia"),"Code":"ID"},{"Name":t("countries.Iran,_Islamic_Republic_of"),"Code":"IR"},{"Name":t("countries.Iraq"),"Code":"IQ"},{"Name":t("countries.Ireland"),"Code":"IE"},{"Name":t("countries.Isle_of_Man"),"Code":"IM"},{"Name":t("countries.Israel"),"Code":"IL"},{"Name":t("countries.Italy"),"Code":"IT"},{"Name":t("countries.Jamaica"),"Code":"JM"},{"Name":t("countries.Japan"),"Code":"JP"},{"Name":t("countries.Jersey"),"Code":"JE"},{"Name":t("countries.Jordan"),"Code":"JO"},{"Name":t("countries.Kazakhstan"),"Code":"KZ"},{"Name":t("countries.Kenya"),"Code":"KE"},{"Name":t("countries.Kiribati"),"Code":"KI"},{"Name":t("countries.Korea,_Democratic_People's_Republic_of"),"Code":"KP"},{"Name":t("countries.Korea,_Republic_of"),"Code":"KR"},{"Name":t("countries.Kuwait"),"Code":"KW"},{"Name":t("countries.Kyrgyzstan"),"Code":"KG"},{"Name":t("countries.Lao_People's_Democratic_Republic"),"Code":"LA"},{"Name":t("countries.Latvia"),"Code":"LV"},{"Name":t("countries.Lebanon"),"Code":"LB"},{"Name":t("countries.Lesotho"),"Code":"LS"},{"Name":t("countries.Liberia"),"Code":"LR"},{"Name":t("countries.Libya"),"Code":"LY"},{"Name":t("countries.Liechtenstein"),"Code":"LI"},{"Name":t("countries.Lithuania"),"Code":"LT"},{"Name":t("countries.Luxembourg"),"Code":"LU"},{"Name":t("countries.Macao"),"Code":"MO"},{"Name":t("countries.Macedonia,_the_Former_Yugoslav_Republic_of"),"Code":"MK"},{"Name":t("countries.Madagascar"),"Code":"MG"},{"Name":t("countries.Malawi"),"Code":"MW"},{"Name":t("countries.Malaysia"),"Code":"MY"},{"Name":t("countries.Maldives"),"Code":"MV"},{"Name":t("countries.Mali"),"Code":"ML"},{"Name":t("countries.Malta"),"Code":"MT"},{"Name":t("countries.Marshall_Islands"),"Code":"MH"},{"Name":t("countries.Martinique"),"Code":"MQ"},{"Name":t("countries.Mauritania"),"Code":"MR"},{"Name":t("countries.Mauritius"),"Code":"MU"},{"Name":t("countries.Mayotte"),"Code":"YT"},{"Name":t("countries.Mexico"),"Code":"MX"},{"Name":t("countries.Micronesia,_Federated_States_of"),"Code":"FM"},{"Name":t("countries.Moldova,_Republic_of"),"Code":"MD"},{"Name":t("countries.Monaco"),"Code":"MC"},{"Name":t("countries.Mongolia"),"Code":"MN"},{"Name":t("countries.Montenegro"),"Code":"ME"},{"Name":t("countries.Montserrat"),"Code":"MS"},{"Name":t("countries.Morocco"),"Code":"MA"},{"Name":t("countries.Mozambique"),"Code":"MZ"},{"Name":t("countries.Myanmar"),"Code":"MM"},{"Name":t("countries.Namibia"),"Code":"NA"},{"Name":t("countries.Nauru"),"Code":"NR"},{"Name":t("countries.Nepal"),"Code":"NP"},{"Name":t("countries.Netherlands"),"Code":"NL"},{"Name":t("countries.New_Caledonia"),"Code":"NC"},{"Name":t("countries.New_Zealand"),"Code":"NZ"},{"Name":t("countries.Nicaragua"),"Code":"NI"},{"Name":t("countries.Niger"),"Code":"NE"},{"Name":t("countries.Nigeria"),"Code":"NG"},{"Name":t("countries.Niue"),"Code":"NU"},{"Name":t("countries.Norfolk_Island"),"Code":"NF"},{"Name":t("countries.Northern_Mariana_Islands"),"Code":"MP"},{"Name":t("countries.Norway"),"Code":"NO"},{"Name":t("countries.Oman"),"Code":"OM"},{"Name":t("countries.Pakistan"),"Code":"PK"},{"Name":t("countries.Palau"),"Code":"PW"},{"Name":t("countries.Palestine,_State_of"),"Code":"PS"},{"Name":t("countries.Panama"),"Code":"PA"},{"Name":t("countries.Papua_New_Guinea"),"Code":"PG"},{"Name":t("countries.Paraguay"),"Code":"PY"},{"Name":t("countries.Peru"),"Code":"PE"},{"Name":t("countries.Philippines"),"Code":"PH"},{"Name":t("countries.Pitcairn"),"Code":"PN"},{"Name":t("countries.Poland"),"Code":"PL"},{"Name":t("countries.Portugal"),"Code":"PT"},{"Name":t("countries.Puerto_Rico"),"Code":"PR"},{"Name":t("countries.Qatar"),"Code":"QA"},{"Name":t("countries.Réunion"),"Code":"RE"},{"Name":t("countries.Romania"),"Code":"RO"},{"Name":t("countries.Russian_Federation"),"Code":"RU"},{"Name":t("countries.Rwanda"),"Code":"RW"},{"Name":t("countries.Saint_Barthélemy"),"Code":"BL"},{"Name":t("countries.Saint_Helena,_Ascension_and_Tristan_da_Cunha"),"Code":"SH"},{"Name":t("countries.Saint_Kitts_and_Nevis"),"Code":"KN"},{"Name":t("countries.Saint_Lucia"),"Code":"LC"},{"Name":t("countries.Saint_Martin_(French_part)"),"Code":"MF"},{"Name":t("countries.Saint_Pierre_and_Miquelon"),"Code":"PM"},{"Name":t("countries.Saint_Vincent_and_the_Grenadines"),"Code":"VC"},{"Name":t("countries.Samoa"),"Code":"WS"},{"Name":t("countries.San_Marino"),"Code":"SM"},{"Name":t("countries.Sao_Tome_and_Principe"),"Code":"ST"},{"Name":t("countries.Saudi_Arabia"),"Code":"SA"},{"Name":t("countries.Senegal"),"Code":"SN"},{"Name":t("countries.Serbia"),"Code":"RS"},{"Name":t("countries.Seychelles"),"Code":"SC"},{"Name":t("countries.Sierra_Leone"),"Code":"SL"},{"Name":t("countries.Singapore"),"Code":"SG"},{"Name":t("countries.Sint_Maarten_(Dutch_part)"),"Code":"SX"},{"Name":t("countries.Slovakia"),"Code":"SK"},{"Name":t("countries.Slovenia"),"Code":"SI"},{"Name":t("countries.Solomon_Islands"),"Code":"SB"},{"Name":t("countries.Somalia"),"Code":"SO"},{"Name":t("countries.South_Africa"),"Code":"ZA"},{"Name":t("countries.South_Georgia_and_the_South_Sandwich_Islands"),"Code":"GS"},{"Name":t("countries.South_Sudan"),"Code":"SS"},{"Name":t("countries.Spain"),"Code":"ES"},{"Name":t("countries.Sri_Lanka"),"Code":"LK"},{"Name":t("countries.Sudan"),"Code":"SD"},{"Name":t("countries.Suriname"),"Code":"SR"},{"Name":t("countries.Svalbard_and_Jan_Mayen"),"Code":"SJ"},{"Name":t("countries.Swaziland"),"Code":"SZ"},{"Name":t("countries.Sweden"),"Code":"SE"},{"Name":t("countries.Switzerland"),"Code":"CH"},{"Name":t("countries.Syrian_Arab_Republic"),"Code":"SY"},{"Name":t("countries.Taiwan,_Province_of_China"),"Code":"TW"},{"Name":t("countries.Tajikistan"),"Code":"TJ"},{"Name":t("countries.Tanzania,_United_Republic_of"),"Code":"TZ"},{"Name":t("countries.Thailand"),"Code":"TH"},{"Name":t("countries.Timor-Leste"),"Code":"TL"},{"Name":t("countries.Togo"),"Code":"TG"},{"Name":t("countries.Tokelau"),"Code":"TK"},{"Name":t("countries.Tonga"),"Code":"TO"},{"Name":t("countries.Trinidad_and_Tobago"),"Code":"TT"},{"Name":t("countries.Tunisia"),"Code":"TN"},{"Name":t("countries.Turkey"),"Code":"TR"},{"Name":t("countries.Turkmenistan"),"Code":"TM"},{"Name":t("countries.Turks_and_Caicos_Islands"),"Code":"TC"},{"Name":t("countries.Tuvalu"),"Code":"TV"},{"Name":t("countries.Uganda"),"Code":"UG"},{"Name":t("countries.Ukraine"),"Code":"UA"},{"Name":t("countries.United_Arab_Emirates"),"Code":"AE"},{"Name":t("countries.United_Kingdom"),"Code":"GB"},{"Name":t("countries.United_States"),"Code":"US"},{"Name":t("countries.United_States_Minor_Outlying_Islands"),"Code":"UM"},{"Name":t("countries.Uruguay"),"Code":"UY"},{"Name":t("countries.Uzbekistan"),"Code":"UZ"},{"Name":t("countries.Vanuatu"),"Code":"VU"},{"Name":t("countries.Venezuela,_Bolivarian_Republic_of"),"Code":"VE"},{"Name":t("countries.Viet_Nam"),"Code":"VN"},{"Name":t("countries.Virgin_Islands,_British"),"Code":"VG"},{"Name":t("countries.Virgin_Islands,_U.S."),"Code":"VI"},{"Name":t("countries.Wallis_and_Futuna"),"Code":"WF"},{"Name":t("countries.Western_Sahara"),"Code":"EH"},{"Name":t("countries.Yemen"),"Code":"YE"},{"Name":t("countries.Zambia"),"Code":"ZM"},{"Name":t("countries.Zimbabwe"),"Code":"ZW"}]