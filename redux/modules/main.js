export const SELECT_PHASE_OPTION = 'SELECT_PHASE_OPTION'
export const SELECT_PHASE_KEY = 'SELECT_PHASE_KEY'
export const TOGGLE_CREDITS = 'TOGGLE_CREDITS'

const initialState = {
  highlightedPhaseKey: null,
  selectedPhaseOption: null,
  selectedPhaseKey: null,
  showCredits: false,
  isMobile: false,
  isDesktop: false,
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
        highlightedPhaseKey:
          action.phaseKey === null && state.selectedPhaseKey
            ? state.selectedPhaseKey.id
            : null,
        selectedPhaseKey: action.phaseKey,
        isMobile: action.phaseKey ? !!action.isMobile : state.isMobile,
        isDesktop: action.phaseKey ? !!action.isDesktop : state.isDesktop,
      }
    }
    default:
      return state
  }
}
