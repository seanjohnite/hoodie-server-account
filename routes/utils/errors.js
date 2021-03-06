module.exports = {
  parse: parse
}

function hoodieError (options) {
  var error = new Error(options.message)
  error.name = options.name || error.name
  error.status = options.status

  return error
}

module.exports.INVALID_SESSION = hoodieError({
  name: 'Unauthorized',
  message: 'Session invalid',
  status: 401
})

module.exports.INVALID_CREDENTIALS = hoodieError({
  name: 'Unauthorized',
  message: 'Invalid credentials',
  status: 401
})

module.exports.FORBIDDEN_ADMIN_ACCOUNT = hoodieError({
  name: 'Forbidden',
  message: 'Admins have no account',
  status: 403
})

module.exports.NO_ADMIN_ACCOUNT = hoodieError({
  name: 'Not Found',
  message: 'Admins have no accounts',
  status: 404
})

module.exports.NO_PROFILE_ACCOUNT = hoodieError({
  name: 'Not Found',
  message: 'Admins have no profiles',
  status: 404
})

function parse (error) {
  if (error.message === 'Name or password is incorrect.') {
    error.message = 'Invalid credentials'
  }

  if (error.message === 'Only admins can access _all_docs of system databases.') {
    error.message = 'Only admins can access /users'
  }

  if (error.message === 'Forbidden by design doc validate_doc_update function') {
    error.message = 'Only admins can access /users'
  }

  return error
}
