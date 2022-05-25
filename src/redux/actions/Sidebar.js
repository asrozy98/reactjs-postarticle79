export const SET_SIDEBAR = 'SET_SIDEBAR'
export const SET_UNFOLD = 'SET_UNFOLD'

export const setSidebar = (sidebarShow) => {
  return (dispatch) => {
    dispatch({
      type: SET_SIDEBAR,
      payload: {
        sidebarShow,
      },
    })
  }
}

export const setUnfold = (unfoldable) => {
  return (dispatch) => {
    dispatch({
      type: SET_UNFOLD,
      payload: {
        unfoldable,
      },
    })
  }
}
