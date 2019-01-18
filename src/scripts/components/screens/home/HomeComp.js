import React from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import Header from 'shared/Header';
import Footer from 'shared/Footer';

const dictionary = require('lib/dictionary.json');

const HomeComp = ({ 
    headerChange,
    match,
    language,
    countOfLike,
    firebase,
    ...props
})=>{
	headerChange(match.path);
    const count = !isLoaded(countOfLike)
    ? 'loading'
    : isEmpty(countOfLike)
		? 0
		: Object.keys(countOfLike).map((key, id) => (countOfLike[key]))[0];
	const setLike = (val) => () => {
        firebase.set('like', {like: val})
		return;
	}
    return([
        <Header key="1" countOfLike={count} setLike={setLike} />,
        <main key="2">
            <div className="row">
                <h4 className="homeSectionH4">{dictionary[language].main.topText}</h4>
                <ul className="anchorWorkCompany">
                    <li><AnchorLink href='#AET'>AET Groupe</AnchorLink></li>
                    <li><AnchorLink href="#Webmatrix">Webmatrix</AnchorLink></li>
                    <li><AnchorLink href="#LTD">Business Solution LTD</AnchorLink></li>
                    <li><AnchorLink href="#Software">Software Business Technology</AnchorLink></li>
                </ul>
                <div className="homeSection">
                    <hr />
                    <section id="AET">
                        <h3 className="homeSectionH3">AET Groupe</h3>
                        <p>{dictionary[language].main.aetDescription}</p>
                        <p>{dictionary[language].main.workPeriodLabel+dictionary[language].main.aetPeriod}</p>
                        <p>{dictionary[language].main.learn}</p>
                        <ul className="technologyList">
                            <li>HTML5</li>
                            <li>CSS3</li>
                            <li>JS</li>
                            <li>MODX</li>
                            <li>{dictionary[language].main.layout}</li>
                            <li className="siteLink"><a target="_blank" href="http://www.5d.by/new/">http://www.5d.by/new/</a></li>
                        </ul>
                    </section>
                    <hr />
                    <section id="Webmatrix">
                        <h3 className="homeSectionH3">Webmatrix</h3>
                        <p>{dictionary[language].main.webmatrixDescription}</p>
                        <p>{dictionary[language].main.workPeriodLabel+dictionary[language].main.webmatrixPeriod}</p>
                        <p>{dictionary[language].main.learn}</p>
                        <ul className="technologyList">
                            <li>MYSQL</li>
                            <li>Opencart</li>
                            <li>PHP</li>
                            <li className="siteLink"><a target="_blank" href="http://autotechnology.by/">http://autotechnology.by</a></li>
                        </ul>
                    </section>
                    <hr />
                    <section id="LTD">
                        <h3 className="homeSectionH3">Business Solution LTD</h3>
                        <p>{dictionary[language].main.ltd}</p>
                        <p>{dictionary[language].main.workPeriodLabel+dictionary[language].main.ltdPeriod}</p>
                        <p>{dictionary[language].main.learn}</p>
                        <ul className="technologyList">
                            <li>Laravel</li>
                            <li>WordPress</li>
                            <li>PHP</li>
                        </ul>
                    </section>
                    <hr />
                    <section id="Software">
                        <h3 className="homeSectionH3">Software Business Technology</h3>
                        <p>{dictionary[language].main.software}</p>
                        <p>{dictionary[language].main.workPeriodLabel+dictionary[language].main.softwarePeriod}</p>
                        <p>{dictionary[language].main.learn}</p>
                        <ul className="technologyList">
                            <li>React JS</li>
                            <li>Node JS</li>
                            <li>Redux JS</li>
                            <li>MongoDB</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>,
        <Footer key="3" />
    ])
}
export default compose(
    firebaseConnect([
        'like',
    ]),
    connect(state => ({
        countOfLike: state.firebase.data.like,
        language: state.changeLanguage.language,
    }),
    dispatch => ({
        headerChange: (path) => {
            dispatch({ type: 'headerChange', payload: {
                headerClassName: 'homePage',
                headerTitle: 'main',
                path: path
            } })
        }
    })),
)(HomeComp);
