import React from 'react';
import { connect } from 'react-redux';

import Header from 'shared/Header';
import Footer from 'shared/Footer';

const dictionary = require('lib/dictionary.json');

const Sport = props => {
  props.headerChange(props.match.path);
  return (
    <>
      <Header />
      <main>
        <div className="row">
          <p>{dictionary[props.language].sport.intro}</p>
          <div className="container clearFix">
            <div className="hobbyBlock">
              <img src="/src/assets/img/basketbol.png" alt="" />
              <h5>{dictionary[props.language].sport.sport1}</h5>
            </div>
            <div className="hobbyBlock">
              <img src="/src/assets/img/perekladina.png" alt="" />
              <h5>{dictionary[props.language].sport.sport2}</h5>
            </div>
            <div className="hobbyBlock">
              <img src="/src/assets/img/pingpong.png" alt="" />
              <h5>{dictionary[props.language].sport.sport3}</h5>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default connect(
  state => ({
    language: state.changeLanguage.language,
  }),
  dispatch => ({
    headerChange: path => {
      dispatch({
        type: 'headerChange',
        payload: {
          headerClassName: `sportPage`,
          headerTitle: `sport`,
          path: path,
        },
      });
    },
  })
)(Sport);
