export default function ChangeHeader(state = {}, action) {
  if (action.type === 'headerChange') {
    return {
      headerClassName: action.payload.headerClassName,
      headerTitle: action.payload.headerTitle,
      path: action.payload.path,
    };
  }
  return state;
}
