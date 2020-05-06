export const SELECT_PHASE_OPTION = 'SELECT_PHASE_OPTION'
export const SELECT_PHASE_KEY = 'SELECT_PHASE_KEY'
export const TOGGLE_CREDITS = 'TOGGLE_CREDITS'

const initialState = {
  selectedPhaseOption: null,
  selectedPhaseKey: null,
  showCredits: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CREDITS: {
      return {
        ...state,
        showCredits: !state.showCredits,
      }
    }
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
      return state
  }
}
