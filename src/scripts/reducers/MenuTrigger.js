const menuTriggerState = {
  menuTriggerStatus: false,
  menuTriggerClassName: 'close',
};

export default function MenuTriggerReduser(state = menuTriggerState, action) {
  if (action.type === 'menuTrigger') {
    return {
      menuTriggerStatus: action.payload.menuTriggerStatus,
      menuTriggerClassName: action.payload.menuTriggerStatus ? 'open' : 'close',
    };
  }
  return state;
}
