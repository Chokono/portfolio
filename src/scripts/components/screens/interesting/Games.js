import React from "react";
import { connect } from 'react-redux';

import Header from 'shared/Header';
import Footer from 'shared/Footer';

const dictionary = require('lib/dictionary.json');

const Games = (props)=>{
	props.headerChange(props.match.path);
    return (
        <>
            <Header />
            <main >
                <div className="row">
                    <p>{dictionary[props.language].games.intro}</p>
                    <div className="container clearFix">
                        <div className="hobbyBlock">
                            <img src="/src/assets/img/titan.png" alt="" />
                            <h5>{dictionary[props.language].games.h3}</h5>
                        </div>
                        <div className="hobbyBlock">
                            <img src="/src/assets/img/arhimond.png" alt="" />
                            <h5>{dictionary[props.language].games.w3}</h5>
                        </div>
                        <div className="hobbyBlock">
                            <img src="/src/assets/img/amazonka.png" alt="" />
                            <h5>{dictionary[props.language].games.d2}</h5>
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
	        	headerClassName: 'gamesPage',
	        	headerTitle: 'games',
                path: path
	        } })
	    }
	})
)(Games);