
export const SELECT_PHASE_OPTION = 'SELECT_PHASE_OPTION';
export const SELECT_PHASE_KEY = 'SELECT_PHASE_KEY';

const initialState = {
  selectedPhaseOption: null,
  selectedPhaseKey: null,
};



export default function reducer(state = initialState, action) {
  switch (action.type) {
  	case SELECT_PHASE_OPTION: {
  		return {
  			...state,
  			selectedPhaseOption: action.phaseOption,
  			selectedPhaseKey: null,
  		}
  	}
  	case SELECT_PHASE_KEY: {
  		return {
  			...state,
  			selectedPhaseKey: action.phaseKey,
  		}
  	}
    default:
      return state;
  }
}