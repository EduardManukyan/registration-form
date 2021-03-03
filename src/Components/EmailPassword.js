import React from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {
    Button,
    Checkbox,
    Container,
    TextField,
} from "@material-ui/core";
import FormHeader from "./FormHeader";
import '../assets/PersonalInfo.scss';
import {isEmpty} from "lodash";
import EmailIcon from '@material-ui/icons/Email';

function EmailPassword({setData, setPageNumber}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            standardPackage: false,
            premiumPackage: false
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
            // standardPackage: Yup.bool().oneOf([true], 'Standard Package is required').required('Confirm Password is required'),
            // premiumPackage: Yup.bool().oneOf([true], 'Premium Package is required').required('Confirm Password is required'),

        })
    })
    const {errors, touched, submitForm, validateForm, values, handleChange} = formik;

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

                    <Checkbox type="checkbox"
                              name="standardPackage"


                    />
                    <label htmlFor="standardPackage">Standard Package</label>
                </div>
                <div>
                    <Checkbox type="checkbox"
                              name="premiumPackage"


                    />
                    <label htmlFor="premiumPackage">Premium Package</label>
                </div>

                <Button style={{right: '8px'}} variant="contained" color="primary"
                        onClick={applyHandlerBack}>Previous</Button>
                <Button variant="contained" color="primary" onClick={applyHandler}>Next</Button>


            </Container>
        </>
    );
};
export default EmailPassword;