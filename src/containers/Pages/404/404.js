import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../../../assets/images/404.gif'
import FourZeroFourStyleWrapper from './404.styles'

export default function () {
  return (
    <FourZeroFourStyleWrapper className="iso404Page">
      <div className="iso404Content">
        <h1>Oops! page not found</h1>
        <h3>Looks like you got lost</h3>
        <p>The page you are looking for doesn't exist or has been moved</p>
        <Link to="/dashboard">
          <button type="button">BACK HOME</button>
        </Link>
      </div>

      <div className="iso404Artwork">
        <img alt="#" src={Image} />
      </div>
    </FourZeroFourStyleWrapper>
  )
}
