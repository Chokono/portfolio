import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import Header from 'shared/Header';
import Footer from 'shared/Footer';

const dictionary = require('lib/dictionary.json');

const InterestingComp = (props)=>{
	props.headerChange(props.match.path);
    return (
        <>
            <Header />
            <main>
                <div className="row">
                    <p>{dictionary[props.language].hobby.intro}</p>
                    <div className="container clearFix">
                        <Link to="/interesting/sport" className="hobbyBlock linkBlock">
                            <img src="/src/assets/img/run.png" alt="" />
                            <h5>{dictionary[props.language].header.sport}</h5>
                        </Link>
                        <Link to="/interesting/literature" className="hobbyBlock linkBlock">
                            <img src="/src/assets/img/poet.png" alt="" />
                            <h5>{dictionary[props.language].header.literature}</h5>
                        </Link>
                        <Link to="/interesting/games" className="hobbyBlock linkBlock">
                            <img src="/src/assets/img/virtual.png" alt="" />
                            <h5>{dictionary[props.language].header.games}</h5>
                        </Link>
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
                headerClassName: 'interestingPage',
                headerTitle: 'hobby',
                path: path
            } })
        }
    })
)(InterestingComp);