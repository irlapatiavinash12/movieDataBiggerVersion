import {useEffect, useState} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import Navbar from '../Navbar'

import MoviePosterCard from '../MoviePosterCard'

import {Link} from "react-router-dom"

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const TopRated = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    error: '',
  })

  useEffect(() => {
    const getTopRatedMoviesData = async () => {
      setApiResponse(prevApiResponse => ({
        ...prevApiResponse,
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: '',
      }))

      const url =
        'https://api.themoviedb.org/3/movie/top_rated?api_key=2672617488e7697bf66a9a2934d1a30f&language=en-US&page=1'

      const response = await fetch(url)

      const responseData = await response.json()

      if (response.ok) {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          status: apiStatusConstants.success,
          data: responseData,
        }))
      } else {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          status: apiStatusConstants.failure,
          errorMsg: responseData.error_msg,
        }))
      }
    }
    getTopRatedMoviesData()
  }, [])

  const renderLoadingView = () => {
    return (
      <div>
        <Loader type="ThreeDots" height="50" width="50" color="#000000" />
      </div>
    )
  }

  const renderSuccessView = () => {
    const {data} = apiResponse
    const reponseformattedData = data.results.map(eachItem => ({
      adult: eachItem.adult,
      backdropPath: `https://image.tmdb.org/t/p/w500${eachItem.backdrop_path}`,
      genreIds: eachItem.genre_ids,
      id: eachItem.id,
      originalLanguage: eachItem.original_language,
      originalTitle: eachItem.original_title,
      overview: eachItem.overview,
      popularity: eachItem.popularity,
      posterPath: `https://image.tmdb.org/t/p/w500${eachItem.poster_path}`,
      title: eachItem.title,
      video: eachItem.video,
      voteAverage: eachItem.vote_average,
      voteCount: eachItem.vote_count,
      releaseDate: eachItem.release_date,
    }))
    return (
      <ul className="items-container">
        {reponseformattedData.map(eachItem => (
          <Link className="link-styling" to={`movie/${eachItem.id}`}>
            <MoviePosterCard cardDetails={eachItem} key={eachItem.id} />
          </Link>
        ))}
      </ul>
    )
  }

  const renderFailureView = () => {
    const {errorMsg} = apiResponse
    return <p>{errorMsg}</p>
  }

  const renderTopRatedMovies = () => {
    const {status} = apiResponse
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Navbar />
      <h1 className="heading">Top Rated</h1>
      <div>{renderTopRatedMovies()}</div>
    </>
  )
}

export default TopRated
