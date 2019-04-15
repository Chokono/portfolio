import React from 'react';
import { connect } from 'react-redux';

import Header from 'shared/Header';
import Footer from 'shared/Footer';

const dictionary = require('lib/dictionary.json');

const Literature = props => {
  props.headerChange(props.match.path);
  return (
    <>
      <Header />
      <main>
        <div className="row">
          <p>{dictionary[props.language].literature.intro}</p>
          <div className="container clearFix">
            <div className="hobbyBlock">
              <img src="/src/assets/img/dozor.png" alt="" />
              <h5>{dictionary[props.language].literature.autor1}</h5>
            </div>
            <div className="hobbyBlock">
              <img src="/src/assets/img/duma.png" alt="" />
              <h5>{dictionary[props.language].literature.autor2}</h5>
            </div>
            <div className="hobbyBlock">
              <img src="/src/assets/img/ostrov.png" alt="" />
              <h5>{dictionary[props.language].literature.autor3}</h5>
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
          headerClassName: 'literaturePage',
          headerTitle: 'literature',
          path: path,
        },
      });
    },
  })
)(Literature);
