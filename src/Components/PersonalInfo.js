import React from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {
    Button,
    Checkbox,
    Container,
    FormControl,
    Grid,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import FormHeader from "./FormHeader";
import '../assets/PersonalInfo.scss';
import {isEmpty} from "lodash";
import {Avatar} from "@material-ui/core";


const PersonalInfo = ({setData, setPageNumber}) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            country: '',
            city: '',
            address: '',
            postalCod: '',
            shopping: '',
            shippingCity: '',
            shippingAddress: '',
            shippingPostalCod: '',
            acceptTerms: false
        },
        onSubmit: () => {
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string()
                .required('First Name is required'),
            lastName: Yup.string()
                .required('Last Name is required'),
            country: Yup.string()
                .required('Country is required'),
            city: Yup.string()
                .required('City is required'),
            address: Yup.string()
                .required('Address is required'),
            postalCod: Yup.string()
                .required('Postal Cod is required'),
            shopping: Yup.string()
                .required('Shopping Country is required'),
            shippingCity: Yup.string()
                .required('Shipping City  is required'),
            shippingAddress: Yup.string()
                .required('Shipping Address Code is required'),
            shippingPostalCod: Yup.string()
                .required('Shipping Address Postal Code is required'),
        })
    });
    const {errors, touched, submitForm, validateForm, values, handleChange} = formik;

    function applyHandler() {
        submitForm().then(() => {
            validateForm(values).then((formErrors) => {
                if (isEmpty(formErrors)) {

                    setPageNumber(2);
                    setData(values);
                }
            })
        })
    }

    return (
        <>
            <FormHeader pageNumber={1} title={'Tell us who you are'} avatar={<Avatar/>}/>
            <Container className={'form-container'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField name="firstName"
                                   variant="outlined"
                                   margin="normal"
                                   onChange={handleChange}
                                   required
                                   fullWidth
                                   error={touched.firstName && errors.firstName}
                                   helperText={touched.firstName && errors.firstName}
                                   id="firstName"
                                   label="First Name"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="lastName"
                                   variant="outlined"
                                   margin="normal"
                                   onChange={handleChange}
                                   required
                                   fullWidth
                                   error={touched.lastName && errors.lastName}
                                   helperText={touched.lastName && errors.lastName}
                                   id="lastName"
                                   label="Last Name"



                        />
                    </Grid>
                </Grid>

                <FormControl error={touched.country && errors.country}>
                    <Select labelId="label"
                            id="select"
                            name={'country'}
                            variant={"outlined"}
                            onChange={handleChange}
                            value={values.country}
                            fullWidth
                            helperText={touched.country && errors.country}

                    >
                        <MenuItem value="Armenia">Armenia</MenuItem>
                        <MenuItem value="Russia">Russia</MenuItem>
                    </Select>
                </FormControl>
                <TextField name="city"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.city && errors.city}
                           helperText={touched.city && errors.city}
                           id="city"
                           label="City"/>
                <TextField name="address"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.address && errors.address}
                           helperText={touched.address && errors.address}
                           id="city"
                           label="Address"/>
                <TextField name="postalCod"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.postalCod && errors.postalCod}
                           helperText={touched.postalCod && errors.postalCod}
                           id="postalCod"
                           label="Postal Cod"/>
                <Checkbox type="checkbox"
                          name="acceptTerms"
                />
                <label htmlFor="acceptTerms">Use filled data for shipping</label>

                <TextField name="shopping"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.shopping && errors.shopping}
                           helperText={touched.shopping && errors.shopping}
                           id="shopping"
                           label="Shopping"/>
                <TextField name="shippingCity"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.shippingCity && errors.shippingCity}
                           helperText={touched.shippingCity && errors.shippingCity}
                           id="shippingCity"
                           label="Shipping City"/>
                <TextField name="shippingAddress"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.shippingAddress && errors.shippingAddress}
                           helperText={touched.shippingAddress && errors.shippingAddress}
                           id="shippingAddress"
                           label="Shipping Address"/>
                <TextField name="shippingPostalCod"
                           variant="outlined"
                           margin="normal"
                           onChange={handleChange}
                           required
                           fullWidth
                           error={touched.shippingPostalCod && errors.shippingPostalCod}
                           helperText={touched.shippingPostalCod && errors.shippingPostalCod}
                           id="shippingPostalCod"
                           label="Shipping Postal Code"/>
                <Button variant="contained" color="primary" onClick={applyHandler}>Next</Button>
            </Container>
        </>
    );
};

export default PersonalInfo;