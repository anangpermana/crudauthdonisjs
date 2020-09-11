'use strict'
const User = use('App/Models/User')
const {
  validate
} = use('Validator')

class RegisterController {
  index({
    view
  }) {
    return view.render('auth.register')
  }

  async store({
    request,
    session,
    response
  }) {
    const rules = {
      username: 'required',
      email: 'required|unique:users,email',
      password: 'required'
    }

    const messages = {
      'username.required': 'Username Tidak Boleh Kosong',
      'email.required': 'Email Tidak Boleh Kosong',
      'email.unique': 'Email Sudah Terdaftar',
      'password.required': 'Password TIdak boleh kosong'
    }
    const validation = await validate(request.all(), rules, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password'])
      return response.redirect('back')
    }

    const user = await User.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password')
    })

    session.flash({
      notification: 'Register berhasil'
    })
    return response.redirect('back')
  }
}

module.exports = RegisterController
