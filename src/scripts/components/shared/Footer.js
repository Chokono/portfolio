import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const dictionary = require('lib/dictionary.json');

const Footer = (props)=>{
  	return (
    	<footer className="footer">
            <div className="row">
                <p>
                    {dictionary[props.language].footer[1]}<br />
                    {dictionary[props.language].footer[2]}<br />
                    {dictionary[props.language].footer[3]}
                </p>
            </div>
        </footer>
  	)
}
export default connect(
    state => ({
        language: state.changeLanguage.language,
    })
)(Footer);
