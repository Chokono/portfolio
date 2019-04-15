import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import changeHeaderReducer from 'reducers/ChangeHeader';
import MenuTriggerReduser from 'reducers/MenuTrigger';
import TechnologyReducer from 'reducers/Technology';
import LanguageReduser from 'reducers/LanguageReduser';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  changeHeader: changeHeaderReducer,
  router: routerReducer,
  menuTrigger: MenuTriggerReduser,
  technology: TechnologyReducer,
  changeLanguage: LanguageReduser,
  firebase: firebaseReducer,
});

export default rootReducer;
