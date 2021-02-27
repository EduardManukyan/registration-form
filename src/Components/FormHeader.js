import React from 'react';
import '../assets/FormHeader.scss';
import {Avatar} from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';


const FormHeader = ({pageNumber, title, avatar}) => {
        return (
            <div className={'header-container'}>
                <div>
                    <p>Step {pageNumber}/3</p>
                    <p>{title}</p>
                </div>
                {avatar}

            </div>
        );
    }
;

export default FormHeader;