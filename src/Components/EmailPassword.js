import React from 'react';
import "../assets/EmailPassword.scss"
import * as Yup from "yup";
import {useFormik} from "formik";
import {
    Button,
    Container,
    TextField,
    Radio,
} from "@material-ui/core";
import FormHeader from "./FormHeader";
import {isEmpty} from "lodash";
import EmailIcon from '@material-ui/icons/Email';

function EmailPassword({setData, setPageNumber}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            checkRadio: '',
        },
        onSubmit: () => {
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
            checkRadio: Yup.string().required('radio group is required'),
        })
    })
    const {errors, touched, submitForm, validateForm, values, handleChange, setFieldValue} = formik;

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
                    setPageNumber(1);
                    setData(values);
                }
            })
        })
    }

    function handleChangeRadio(e) {
        setFieldValue('checkRadio', e.target.id);
    }

    return (
        <>
            <FormHeader pageNumber={2} title={'Choose a package'} avatar={<EmailIcon/>}/>
            <Container className={'form-container'}>
                <TextField name="email"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.email && errors.email}
                           helperText={touched.email && errors.email}
                           id="email"
                           label="Email"/>
                <TextField name="password"
                           type="password"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.password && errors.password}
                           helperText={touched.password && errors.password}
                           id="password"
                           label="Password"/>
                <TextField name="confirmPassword"
                           type="password"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.confirmPassword && errors.confirmPassword}
                           helperText={touched.confirmPassword && errors.confirmPassword}
                           id="confirmPassword"
                           label="Confirm Password"/>
                <div style={{display: 'block'}}>
                    <Radio type="checkbox"
                           id="standardPackage"
                           checked={values.checkRadio === "standardPackage"}
                           onChange={handleChangeRadio}
                           className={(touched.checkRadio && errors.checkRadio) ? "radioStyle" : ""}
                    />
                    <label htmlFor="standardPackage">Standard Package</label>
                </div>
                <div>
                    <Radio type="checkbox"
                           id="premiumPackage"
                           checked={values.checkRadio === "premiumPackage"}
                           className={(touched.checkRadio && errors.checkRadio) ? "radioStyle" : ""}
                           onClick={handleChangeRadio}
                    />
                    <label htmlFor="premiumPackage">Premium Package</label>
                </div>
                <Button style={{right: '8px'}} variant="contained" color="primary"
                        onClick={applyHandlerBack}>Previous</Button>
                <Button variant="contained" color="primary" onClick={applyHandler}>Next</Button>
            </Container>
        </>
    );
}

export default EmailPassword;