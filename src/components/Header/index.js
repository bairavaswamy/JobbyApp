import {IoMdHome} from 'react-icons/io'
import {RiHandbagLine} from 'react-icons/ri'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav-cont">
        <Link to="/" className="lk-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-img"
            alt="website logo"
          />
        </Link>

        <div className="icons-container">
          <Link to="/">
            <button type="button" className="icon-btn">
              {' '}
              <IoMdHome className="header-icon" />
            </button>
          </Link>

          <Link to="/jobs">
            <button type="button" className="icon-btn">
              {' '}
              <RiHandbagLine className="header-icon" />
            </button>
          </Link>

          <button type="button" className="icon-btn1" onClick={logout}>
            {' '}
            <FiLogOut className="header-icon" />
          </button>
        </div>

        <ul className="nav-list">
          <Link to="/" className="lk-style">
            <li className="list-nav-items">Home</li>
          </Link>
          <Link to="/jobs" className="lk-style">
            <li className="list-nav-items">Jobs</li>
          </Link>
        </ul>
        <ul>
          <li className="nav-list">
            <button type="button" className="logout-btn" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)
