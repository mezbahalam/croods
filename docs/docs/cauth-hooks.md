---
id: cauth-hooks
title: Croods-Auth Hooks
---

Here are a list of all the hooks available to perform auth-related actions.

**Important:** Unlike Croods, croods-auth is tightly coupled to [our](https://seasoned.cc) APIs, which use [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth). Adding more flexibility for other backends and authentication methods is on our roadmap though.

**Form State:** Croods-auth uses [`react-use-form-state`](https://github.com/wsmd/react-use-form-state) under the hood. Make sure you understand the basics of it's usage for dealing with what Croods-auth returns, such as `formState`, `fields`, `fieldProps`, `formProps`, `emailProps`, etc.

All the hooks follow the same pattern of [The Croods tuple](/docs/main-concepts#the-croods-tuple), with few changes:

- The first value carries `state` for the given hook plus some form props utilities when applicable. It will be explained on every hook.
- The second value is always a single function which dispatches the request or do something else according to the hook description.
- You can pass to any hook everything that you are already used to [pass to Croods](/docs/croods-provider-api) along with few additional options described in every hook's API.

So keep the following format in mind:

```
const [{ saving, someState, formProps }, someFunction] = useSomeHook(
  path: 'foo',
  afterSuccess: () => console.log('Done'),
)
```

# List of hooks and their values:

## [useUserFromContext](/docs/cauth-user-from-context)

```
// The use of AuthProvider is required. This doesn't make a request, just returns the AuthProvider context value.
const [state, setCurrentUser] = useUserFromContext()
const {
  currentUser, // it may contain the current user
  validating, // true when validating the token
  status, // 'pending' | 'visitor' | 'loggedIn'
  error, // it may contain the error message (if an error happens)
} = state
setCurrentUser // function to change some user property on client side
```
## [useCurrentUser](/docs/cauth-current-user)

```
// The default behavior is to check croods state and if there is not a user, make a request.
// Depending on the use, it can create a kind of race-condition problem, because when it is used in multiple components at the same page, they can end doing multiple requests trying to validate the token

const [state, setCurrentUser] = useCurrentUser()
const {
  currentUser, // it may contain the current user
  validating, // true when validating the token
  status, // 'pending' | 'visitor' | 'loggedIn'
  error, // it may contain the error message (if an error happens)
} = state
setCurrentUser // function to change some user property on client side
```

## [useSignIn](/docs/cauth-sign-in)

```
const [state, signInFunction] = useSignIn()
const {
  formProps, // it contains props for the <form> element
  passwordProps, // it contains props for the password <input> element
  emailProps, // it contains props for the email <input> element
  fieldProps, // function to generate props to a field with validation
  fieldError, // function to return error message for a field
  fields // it contains all the fields from react-use-form-state
  formState, // an object that contains input values, errors, and other info
  isFormValid // a boolean that is true when the form has no errors
  signingIn, // true when executing the request
  error, // error string in the request
} = state
signInFunction // executes the sign in request
```

## [useSignUp](/docs/cauth-sign-up)

```
const [state, signUpFunction] = useSignUp()
const {
  formProps, // it contains props for the <form> element
  passwordProps, // it contains props for the password <input> element
  passwordConfirmationProps, // it contains props for the password
  // confirmation <input> element
  emailProps, // it contains props for the email <input> element
  fieldProps, // function to generate props to a field with validation
  fieldError, // function to return error message for a field
  fields // it contains all the fields from react-use-form-state
  formState, // an object that contains input values, errors, and other info
  isFormValid // a boolean that is true when the form has no errors
  signingUp, // true when executing the request
  error, // error string in the request
} = state
signUpFunction // executes the sign up request
```

## [useSignOut](/docs/cauth-sign-out)

```
const [state, signOutFunction] = useSignOut()
const {
  signingOut, // true when executing the request
  error, // error string in the request
} = state
signOutFunction // executes the sign out request and clears the current user
```

## [useEditProfile](/docs/cauth-edit-profile)

```
const [state, saveFunction] = useEditProfile()
const {
  formProps, // it contains props for the <form> element
  fieldProps, // function to generate props to a field with validation
  fieldError, // function to return error message for a field
  fields // it contains all the fields from react-use-form-state
  formState, // an object that contains input values, errors, and other info
  isFormValid // a boolean that is true when the form has no errors
  saving, // true when executing the request
  currentUser, // it contains the current user, up to date after the saving
  error, // error string in the request
} = state
saveFunction // executes the save request
```

## [useDeleteAccount](/docs/cauth-delete-account)

```
const [state, deleteFunction] = useDeleteAccount()
const {
  deleting, // true when executing the request
  error, // error string in the request
} = state
deleteFunction // executes the delete request
```

## [useForgotPassword](/docs/cauth-forgot-password)

```
const [state, sendFunction] = useForgotPassword()
const {
  formProps, // it contains props for the <form> element
  emailProps, // it contains props for the email <input> element
  fieldProps, // function to generate props to a field with validation
  fieldError, // function to return error message for a field
  fields // it contains all the fields from react-use-form-state
  formState, // an object that contains input values, errors, and other info
  isFormValid // a boolean that is true when the form has no errors
  sending, // true when executing the request
  error, // error string in the request
} = state
sendFunction // (email, redirectUrl) => sends email and redirectUrl to backend
```

## [useResetPassword](/docs/cauth-reset-password)

```
const [state, resetFunction] = useResetPassword()
const {
  formProps, // it contains props for the <form> element
  passwordProps, // it contains props for the password <input> element
  passwordConfirmationProps, // it contains props for the password
  // confirmation <input> element
  fieldProps, // function to generate props to a field with validation
  fieldError, // function to return error message for a field
  fields // it contains all the fields from react-use-form-state
  formState, // an object that contains input values, errors, and other info
  isFormValid // a boolean that is true when the form has no errors
  reseting, // true when executing the request
  error, // error string in the request
} = state
resetFunction // grabs the token from the URL and executes the request
```
