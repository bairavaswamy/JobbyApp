import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: {},
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobs = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )

      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getskillsCard = x => {
    const {imageUrl, name} = x
    return (
      <li className="skill-item" key={name}>
        <img src={imageUrl} alt={name} className="skill-img" />
        <p className="skill-para">{name}</p>
      </li>
    )
  }

  getSimilarJobs = x => (
    <li className="jb-card12" key={x.id}>
      <div className="jb-card-1">
        <img
          src={x.companyLogoUrl}
          alt="similar job company logo"
          className="similar-jobs-logo"
        />
        <div>
          <h1 className="jb-role">{x.title}</h1>
          <div className="ratting-card">
            <BsStarFill className="rating-icon" />
            <p className="jb-rating">{x.rating}</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="jb-head">Description</h1>
        <p className="jb-jobDescription">{x.jobDescription}</p>
      </div>

      <div className="jb-card2">
        <div className="inner-card">
          <div className="inner-card1">
            <MdLocationOn className="jb-icons" />
            <p className="jb-location">{x.location}</p>
          </div>
          <div className="inner-card1">
            <BsFillBriefcaseFill className="jb-icons" />
            <p className="jb-location">{x.employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )

  renderSuccessView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      location,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobData

    return (
      <>
        <Header />
        <div className="jd-bg-container">
          <div className="jb-list-container1">
            <div>
              <div className="jb-card1">
                <img
                  src={companyLogoUrl}
                  className="logo-size"
                  alt="job details company logo"
                />
                <div>
                  <h1 className="jb-role">{title}</h1>
                  <div className="ratting-card">
                    <BsStarFill className="rating-icon" />
                    <p className="jb-rating">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="jb-card2">
                <div className="inner-card">
                  <div className="inner-card1">
                    <MdLocationOn className="jb-icons" />
                    <p className="jb-location">{location}</p>
                  </div>
                  <div className="inner-card1">
                    <BsFillBriefcaseFill className="jb-icons" />
                    <p className="jb-location">{employmentType}</p>
                  </div>
                </div>
                <p>{packagePerAnnum}</p>
              </div>
              <hr className="hr-line12" />
              <div>
                <div className="ds-card">
                  <h1 className="jb-head">Description</h1>
                  <button type="button" className="btn">
                    <a href={companyWebsiteUrl} className="a-el">
                      <p>Visit</p>
                      <BiLinkExternal className="vist-icon" />
                    </a>
                  </button>
                </div>

                <p className="jb-jobDescription">{jobDescription}</p>
              </div>
            </div>
            <h1 className="jb-head">Skills</h1>
            <ul className="skills-container">
              {skills.map(x => this.getskillsCard(x))}
            </ul>
            <div className="life-atCompany-container">
              <div>
                <h1 className="jb-head">Life at Company</h1>
                <p>{lifeAtCompany.description}</p>
              </div>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="lft-img"
              />
            </div>
          </div>
          <h1 className="sm-jobs-head">Similar Jobs</h1>
          <div className="similar-jobs-container">
            <ul className="sm-list">
              {similarJobsData.map(x => this.getSimilarJobs(x))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="jd-bg-container">
        <div className="loader-container3" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <Header />
      <div className="jd-bg-container">
        <div className="failure-view2">
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
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }
}

export default JobItemDetails
