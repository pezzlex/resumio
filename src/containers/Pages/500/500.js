import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../../../assets/images/500.jpeg'
import FiveZeroZeroStyleWrapper from './500.styles'

export default function () {
  return (
    <FiveZeroZeroStyleWrapper className="iso500Page">
      <div className="iso500Content">
        <h1>Internal server error</h1>
        <h3>Something went wrong. Please try again later</h3>
        {/* <p>
          <IntlMessages id="page500.description" />
        </p> */}
        <Link to="/dashboard">
          <button type="button">BACK HOME</button>
        </Link>
      </div>

      <div className="iso500Artwork">
        <img alt="#" src={Image} />
      </div>
    </FiveZeroZeroStyleWrapper>
  )
}
