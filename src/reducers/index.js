import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import fooReducer from './fooReducer'

const allReducers = combineReducers({
  form: formReducer,
  foo: fooReducer,
  state: () => []
})

function rootReducer(state, action) {
  return allReducers(state, action)
}

export default rootReducer
