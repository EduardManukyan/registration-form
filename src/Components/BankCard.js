import React from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {
    Button,
    Container,
    TextField
} from "@material-ui/core";
import FormHeader from "./FormHeader";
import '../assets/PersonalInfo.scss';
import '../assets/BankCard.scss'
import {isEmpty} from "lodash";
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';


function BankCard({setData, setPageNumber}) {
    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            fullName: '',
            expiry: '',
            cvc: ''

        },
        onSubmit: () => {
        },


        validationSchema: Yup.object().shape({
            cardNumber: Yup.string()
                .max(19)

                .required("cardNumber"),
            cvc: Yup.number()
                .label('CVC')
                .max(4)
                .required(),
            nameOnCard: Yup.string()
                .label('Full name on card')
                .max(100)
                .required(),
            expiry: Yup.string()
                .label('Expiry month')
                .min(2)
                .max(2)
                .required(),


        })
    })
    const {errors, touched, submitForm, setFieldValue, validateForm, values, handleChange, ha} = formik;

    function applyHandler() {
        submitForm().then(() => {
            validateForm(values).then((formErrors) => {
                if (isEmpty(formErrors)) {

                    setPageNumber(3);
                    setData(values);
                }
            })
        })
    }

    function applyHandlerBack() {
        submitForm().then(() => {
            validateForm(values).then((formErrors) => {
                if (isEmpty(formErrors)) {

                    setPageNumber(2);
                    setData(values);
                }
            })
        })
    }

    function changeHandler(e) {
        if (e.target.value.length <= 19) {
            setFieldValue('cardNumber', e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim());
        }
    }

    function handleChangeCvc(e) {
        if (Number(e.target.value) && e.target.value.length <= 4) {
            setFieldValue('cvc', e.target.value)
        }
    }

    function handleChangeFullName(e) {
        if (e.target.value.length <= 100) {
            setFieldValue('fullName', e.target.value)
        }
    }

    return (
        <>
            <FormHeader pageNumber={3} title={'Fill your credit card details'} avatar={<PaymentRoundedIcon/>}/>
            <Container className={'form-container'}>
                <TextField
                    style={{
                        background: 'url(\'https://cdn0.iconfinder.com/data/icons/ThemeShock-credit-cards-icons/64/mastercard.png\') no-repeat right',
                    }}
                    variant="outlined"
                    margin="normal"
                    onChange={changeHandler}
                    fullWidth
                    error={touched.cardNumber && errors.cardNumber}
                    helperText={touched.cardNumber && errors.cardNumber}
                    value={values.cardNumber}
                    id="cardNumber"
                    label="cardNumber"
                    name='cardNumber'
                />
                <TextField name="fullName"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChangeFullName}
                           required
                           fullWidth
                           error={touched.fullName && errors.fullName}
                           helperText={touched.fullName && errors.fullName}
                           id="fullName"
                           label="Full Name"
                           value={values.fullName}

                />
                <TextField name="expiry"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.expiry && errors.expiry}
                           helperText={touched.expiry && errors.expiry}
                           id="expiry"
                           label="expiry"/>

                <TextField name="cvc"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChangeCvc}
                           required
                           fullWidth
                           value={values.cvc}
                           error={touched.cvc && errors.cvc}
                           helperText={touched.cvc && errors.cvc}
                           id="cvc"
                           label="cvc"
                />

                <Button style={{right: '8px'}} variant="contained" color="primary"
                        onClick={applyHandlerBack}>Previous</Button>
                <Button variant="contained" color="primary" onClick={applyHandler}>Next</Button>
            </Container>
        </>
    )
}

export default BankCard;