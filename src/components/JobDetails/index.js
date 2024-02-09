import {Component} from 'react'
import Loader from 'react-loader-spinner'
import GetJobsCard from '../GetJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  renderjobsView = () => {
    const {jobDetails} = this.props
    return (
      <ul>
        {jobDetails.map(x => (
          <GetJobsCard x={x} key={x.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-btn1" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderZeroViews = () => (
    <div className="nj-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="nj-icon"
      />
      <h1 className="no-jobs-head">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  render() {
    const {jobDetails, apiStatus} = this.props
    if (jobDetails.length === 0) {
      this.renderZeroViews()
    }

    switch (apiStatus) {
      case apiStatusConstants.success:
        if (jobDetails.length > 0) {
          return <div className="card">{this.renderjobsView()}</div>
        }
        return this.renderZeroViews()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }
}

export default JobDetails
