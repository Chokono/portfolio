import React from "react";
import { connect } from 'react-redux';

import Header from 'shared/Header';
import Footer from 'shared/Footer';

const dictionary = require('lib/dictionary.json');

const HomeComp = (props)=>{
	props.headerChange(props.match.path);
    return(
        <>
            <Header />
            <main>
                <div className="row">
                    <h2>{dictionary[props.language].contacts.name}</h2>
                    <div className="container clearFix">
                        <div className="twoFields">
                            <h4 className="homeSectionH4">{dictionary[props.language].contacts.phoneLabel}</h4>
                            <a className="linkBlue" href="callto:+375291492303">+375 (29) 959-04-99</a>
                        </div>
                        <div className="twoFields">
                            <h4 className="homeSectionH4">{dictionary[props.language].contacts.emailLabel}</h4>
                            <a className="linkBlue" href="mailto:ne_zabivai@tut.by">ne_zabivai@tut.by</a>
                        </div>
                        <div className="twoFields">
                            <h4 className="homeSectionH4">{dictionary[props.language].contacts.githubLabel}</h4>
                            <a className="linkBlue" href="https://github.com/Chokono" target="_blank">https://github.com/Chokono</a>
                        </div>
                        <div className="twoFields">
                            <h4 className="homeSectionH4">{dictionary[props.language].contacts.skypeLabel}</h4>
                            <a className="linkBlue">ChoconoTiler</a>
                        </div>
                        <div className="twoFields">
                            <h4 className="homeSectionH4">{dictionary[props.language].contacts.codewarsLabel}</h4>
                            <a className="linkBlue" href="https://www.codewars.com/users/Chokono" target="_blank">https://www.codewars.com/users/Chokono</a>
                        </div>
                    </div>
                </div>
            </main>
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
	        	headerClassName: 'contactPage',
	        	headerTitle: 'contacts',
                path: path
	        } })
	    }
	})
)(HomeComp);
