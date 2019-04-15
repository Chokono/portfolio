const languageState = {
  language: 'ru',
};

export default function MenuTriggerReduser(state = languageState, action) {
  if (action.type === 'changeLanguage') {
    return {
      language: action.payload.language,
    };
  }
  return state;
}
