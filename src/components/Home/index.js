import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="home-bg">
    <Header />

    <div className="hm-txt-container">
      <h1 className="hm-head">Find The Job That Fits Your Life</h1>
      <p className="hm-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="hm-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
