import { SET_SIDEBAR, SET_UNFOLD } from '../actions/Sidebar'

const initialState = {
  sidebarShow: true,
  unfoldable: false,
}

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR:
      return { ...state, sidebarShow: action.payload.sidebarShow }
    case SET_UNFOLD:
      return { ...state, unfoldable: action.payload.unfoldable }
    default:
      return state
  }
}

export default sidebar
