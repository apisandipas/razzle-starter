const FOO_SUCCESS = 'FOO_SUCCESS'

export const sayHeyDude = () => ({
  type: FOO_SUCCESS,
  payload: 'Hey dude'
})

export const saySomethingElse = () => ({
  type: FOO_SUCCESS,
  payload: 'Something Else'
})
