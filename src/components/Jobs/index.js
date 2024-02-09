import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Header from '../Header'
import UserCard from '../UserCard'
import JobDetails from '../JobDetails'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobDetails: [],
    apiStatus: apiStatusConstants.initial,
    employeeType: [],
    minimumSalary: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employeeType, minimumSalary, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${minimumSalary}&search=${searchInput}`
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
      const jobdatas = data.jobs.map(x => ({
        companyLogoUrl: x.company_logo_url,
        employmentType: x.employment_type,
        jobDescription: x.job_description,
        packagePerAnnum: x.package_per_annum,
        id: x.id,
        location: x.location,
        rating: x.rating,
        title: x.title,
      }))
      this.setState({jobDetails: jobdatas})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getCheckBox = x => {
    const getfilter1 = e => {
      const {employeeType} = this.state
      if (employeeType.includes(e)) {
        const a = employeeType.filter(y => y !== e)
        this.setState({employeeType: a})
      }

      return this.setState(
        prevState => ({
          employeeType: [...prevState.employeeType, e],
        }),
        this.getJobs,
      )
    }

    return (
      <li
        className="check-box-container"
        onChange={() => getfilter1(x.employmentTypeId)}
        key={x.employmentTypeId}
      >
        <input type="checkbox" id={x.employmentTypeId} />
        <label className="label-txt" htmlFor={x.employmentTypeId}>
          {x.label}
        </label>
      </li>
    )
  }

  getRadio = x => {
    const getfilter1 = e => {
      this.setState({minimumSalary: e}, this.getJobs)
    }
    return (
      <li
        className="check-box-container"
        key={x.salaryRangeId}
        onChange={() => getfilter1(x.salaryRangeId)}
      >
        <input type="radio" id={x.salaryRangeId} name="Salary" />
        <label className="label-txt" htmlFor={x.salaryRangeId}>
          {x.label}
        </label>
      </li>
    )
  }

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  pressEnter = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  renderSearchip = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.pressEnter}
        />
        <button
          type="button"
          id="searchButton"
          className="search-button-container"
          onClick={this.getJobs}
          data-testid="searchButton"
        >
          {' '}
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderSearchip1 = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container1">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.pressEnter}
        />
        <button
          type="button"
          id="searchButton"
          className="search-button-container"
          onClick={this.getJobs}
          data-testid="searchButton"
        >
          {' '}
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {jobDetails, apiStatus} = this.state
    return (
      <div>
        <Header />
        <div className="jr-bg-container">
          {this.renderSearchip1()}

          <div className="card-left">
            <UserCard />
            <hr className="hr-line-jb" />
            <div>
              <h1 className="jb-toe">Type of Employment</h1>
              <ul className="toe-style">
                {employmentTypesList.map(x => this.getCheckBox(x))}
              </ul>
              <hr className="hr-line-jb" />
              <h1 className="jb-toe">Salary Range</h1>
              <ul className="toe-style">
                {salaryRangesList.map(x => this.getRadio(x))}
              </ul>
            </div>
          </div>
          <div>
            {this.renderSearchip()}
            <JobDetails jobDetails={jobDetails} apiStatus={apiStatus} />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
