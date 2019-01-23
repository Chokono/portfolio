import React from "react";
import { connect } from 'react-redux';
import AnchorLink from 'react-anchor-link-smooth-scroll'

import Header from 'shared/Header';
import Footer from 'shared/Footer';

const dictionary = require('lib/dictionary.json');

const Technology = (props)=>{
	props.headerChange(props.match.path);
    return(
        <>
            <Header />
            <main>
                <div className="row">
                    <div className="container clearFix">
                        {props.technologyArray.map((el,ind) => {
                            return (
                                <AnchorLink href='#technologySection' className="technologyCont" key={ind}>
                                    <div className={`technologyContInner ${el.name === props.chooseTechnology ? 'active' : null}`} onClick={props.onTechnologyClick(el.name)}>
                                        <img src={el.imgUrl} alt='' />
                                        <div className="technologyImgFon"></div>
                                    </div>
                                </AnchorLink>
                            )
                        })}
                    </div>
                </div>
                <div className="row">
                    <section className="technologySection" id="technologySection">
                        <div className={`${props.chooseTechnology ? 'open' : null} techDescription`}>
                            {props.chooseTechnology ? ([
                                <h2 key="1">{dictionary[props.language].technology[props.chooseTechnology].name}</h2>,
                                <h3 key="2">{dictionary[props.language].technology.experience}</h3>,
                                <p key="3">{dictionary[props.language].technology[props.chooseTechnology].experience}</p>,
                                <h3 key="4">{dictionary[props.language].technology.time}</h3>,
                                <p key="5">{dictionary[props.language].technology[props.chooseTechnology].time}</p>,
                                <h3 key="6">{dictionary[props.language].technology.description}</h3>,
                                <p key="7">{dictionary[props.language].technology[props.chooseTechnology].description}</p>
                            ]) : null}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}
export default connect(
    state => ({
        technologyData: state.technology.data,
        chooseTechnology: state.technology.technologyChoosen,
        technologyArray: state.technology.technologyArray,
        language: state.changeLanguage.language,
    }),
    dispatch => ({
    	headerChange: (path) => {
	        dispatch({ type: 'headerChange', payload: {
	        	headerClassName: 'technologyPage',
	        	headerTitle: 'technology',
                path: path
	        } })
	    },
        onTechnologyClick: (name) => () => {
            dispatch({ type: 'chooseTechnology', payload: {
                technologyChoosen: name
            } })
        }
	})
)(Technology);
