import React from "react";
import { connect } from 'react-redux';

const dictionary = require('lib/dictionary.json');

import Header from 'shared/Header';
import Footer from 'shared/Footer';

const ErrorPage = (props) => {
    return(
        <>
            <Header />
            <h2>{dictionary[props.language].errors.notFound}</h2>
            <Footer />
        </>
    )
}

export default connect(
    state => ({
        language: state.changeLanguage.language,
    }),
    dispatch => ({
    	headerChange: (path) => {
	        dispatch({ type: 'headerChange', payload: {
	        	headerClassName: 'errorPage',
	        	headerTitle: 'errors',
                path: '',
	        } })
	    }
	})
)(ErrorPage);
