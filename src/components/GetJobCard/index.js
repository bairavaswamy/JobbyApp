import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import {Link} from 'react-router-dom'

import './index.css'

const GetJobsCard = props => {
  const {x} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    id,
    location,
    rating,
    title,
  } = x

  return (
    <Link to={`/jobs/${id}`} className="jobs-card12-jobs lk-style">
      <li className="jb-list-container">
        <div className="jb-card1">
          <img src={companyLogoUrl} className="logo-size" alt="company logo" />
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
          <p className="lpa">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <div>
          <h1 className="jb-head">Description</h1>
          <p className="jb-jobDescription">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default GetJobsCard
