import React from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {
    Button,
    Container,
    TextField
} from "@material-ui/core";
import FormHeader from "./FormHeader";
import '../assets/BankCard.scss'
import {isEmpty} from "lodash";
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';


function BankCard({setData, setPageNumber}) {
    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            fullName: '',
            cardExpirationDate: '',
            cvc: ''
        },

        onSubmit: () => {
        },

        validationSchema: Yup.object().shape({
            cardNumber: Yup.string()
                .max(19, "Card number mast be smaller then 19")
                .required("Card number is required"),
            cvc: Yup.number()
                .required("Card number cvc is required")
                .max(9999, "CVC mast be smaller then 4"),
            fullName: Yup.string()
                .max(100, "Full name mast be smaller then 100")
                .required("Full name is required"),
            cardExpirationDate: Yup.string()
                .required("Card expiration date is required"),
        })
    })

    const {errors, touched, submitForm, setFieldValue, validateForm, values, setFieldTouched} = formik;

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
            setFieldValue('cardNumber', e.target.value.replace(/[^\dA-Z]/g, '')
                .replace(/(.{4})/g, '$1 ').trim());
        }
    }

    function handleChangeCvc(e) {
        setFieldValue('cvc', e.target.value, true)
            .then(() => {
                setFieldTouched("cvc", true);
            })
    }

    function handleChangeFullName(e) {
        setFieldValue('fullName', e.target.value, true).then(() => {
            setFieldTouched("fullName", true);
        })
    }

    function handleChangeToData(e) {
        setFieldValue('cardExpirationDate', e.target.value, true)
            .then(() => {
                setFieldTouched("cardExpirationDate", true);
            })
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
                <TextField name="CardExpirationDate"
                           variant="outlined"
                           margin="normal"
                           type={"date"}
                           onChange={handleChangeToData}
                           required
                           fullWidth
                           error={touched.cardExpirationDate && errors.cardExpirationDate}
                           helperText={touched.cardExpirationDate && errors.cardExpirationDate}
                           id="cardExpirationDate"
                           label="Card Expiration Date"
                           value={values.cardExpirationDate}
                />
                <Button style={{right: '8px'}} variant="contained" color="primary"
                        onClick={applyHandlerBack}>Previous</Button>
                <Button variant="contained" color="primary" onClick={applyHandler}>Next</Button>
            </Container>
        </>
    )
}

export default BankCard;