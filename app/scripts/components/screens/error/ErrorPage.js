import React from "react";
import {ERRORS} from 'root/globals';

const ErrorPage = (props) => {
    return(
        <div>
            <h1>{'You have a Problem'}</h1>
            <p>{ERRORS[props.errorCode]}</p>
        </div>
    )
}

export default ErrorPage;