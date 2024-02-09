import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserCard extends Component {
  state = {userData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
      const data = await response.json()
      const data1 = data.profile_details
      const userDetails = {
        name: data1.name,
        profileImageUrl: data1.profile_image_url,
        shortBio: data1.short_bio,
      }
      this.setState({userData: userDetails})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserCard = () => {
    const {userData} = this.state
    const {name, shortBio} = userData
    console.log(userData)
    return (
      <div className="user-card">
        <img src={userData.profileImageUrl} alt="profile" />
        <h1 className="user-head">{name}</h1>
        <p className="user-para">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <>
      <div>
        <button
          type="button"
          className="retry-btn"
          onClick={this.getUserDetails}
        >
          Retry
        </button>
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success: {
        return this.renderUserCard()
      }
      case apiStatusConstants.inProgress: {
        return this.renderLoadingView()
      }
      case apiStatusConstants.failure: {
        return this.renderFailureView()
      }
      default:
        return null
    }
  }
}

export default UserCard
