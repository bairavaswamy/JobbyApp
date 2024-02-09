import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
    showPassError: false,
    showUserError: false,
  }

  renderUserDetails = () => (
    <div className="inner-form-container">
      <label className="Lb-form" htmlFor="ip1">
        USERNAME
      </label>
      <input
        type="text"
        id="ip1"
        className="form-ip"
        placeholder="Username"
        onChange={this.getUserName}
        onBlur={this.noUser}
      />
    </div>
  )

  noUser = () => {
    const {username} = this.state
    if (username === '') {
      this.setState({showUserError: true})
    } else {
      this.setState({showUserError: false})
    }
  }

  noPassword = () => {
    const {password} = this.state
    if (password === '') {
      this.setState({showPassError: true})
    } else {
      this.setState({showPassError: false})
    }
  }

  renderPassword = () => (
    <div className="inner-form-container">
      <label className="Lb-form" htmlFor="ip2">
        PASSWORD
      </label>
      <input
        type="password"
        id="ip2"
        className="form-ip"
        placeholder="Password"
        onChange={this.getPassword}
        onBlur={this.noPassword}
      />
    </div>
  )

  getUserName = e => {
    this.setState({username: e.target.value})
  }

  getPassword = e => {
    this.setState({password: e.target.value})
  }

  onsubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onsubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg, showUserError, showPassError} = this.state
    const jwtCookies = Cookies.get('jwt_token')
    if (jwtCookies !== undefined) {
      const {history} = this.props
      history.replace('/')
    }

    return (
      <div className="bg-login">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="img-width"
          />

          <form onSubmit={this.submitForm}>
            {this.renderUserDetails()}
            {showUserError && <p className="err-msg">*required</p>}
            {this.renderPassword()}
            {showPassError && <p className="err-msg">*required</p>}
            <button className="lg-btn" type="submit">
              Login
            </button>
            {showSubmitError && <p className="err-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
