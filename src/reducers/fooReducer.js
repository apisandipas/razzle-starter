export default (state = { value: '' }, action) => {
  switch (action.type) {
    case 'FOO_SUCCESS':
      return { value: action.payload }

    default:
      return state
  }
}
