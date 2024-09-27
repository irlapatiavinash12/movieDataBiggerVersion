import './index.css'

import {useEffect, useState} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import MoviePosterCard from '../MoviePosterCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

import Navbar from '../Navbar'

const UpcomingMovies = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    erroMsg: '',
  })

  useEffect(() => {
    const getMoviesData = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: '',
      })
      const url =
        'https://api.themoviedb.org/3/movie/upcoming?api_key=2672617488e7697bf66a9a2934d1a30f&language=en-US&page=1'
      const options = {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjcyNjE3NDg4ZTc2OTdiZjY2YTlhMjkzNGQxYTMwZiIsIm5iZiI6MTcyNzQxODYxNi40ODc0ODksInN1YiI6IjY2ZjYzOGU3NmM5YTY4MTU1MDcwYWFiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fmgj9G3XZ7zSWZVcm8LleoLu7nVwmoGL9vPHbAnIwVo',
        },
      }

      const response = await fetch(url, options)
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
          erroMsg: responseData.error_msg,
        }))
      }
    }
    getMoviesData()
  }, [])

  const renderFailureView = () => {
    const {errorMsg} = apiResponse
    return <p>{errorMsg}</p>
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

  const renderLoadingView = () => {
    return (
      <div>
        <Loader type="ThreeDots" height="50" width="50" color="#000000" />
      </div>
    )
  }

  const renderPopularMovies = () => {
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
    <div>
      <Navbar />
      <h1 className="heading">Upcoming Movies</h1>
      <div>{renderPopularMovies()}</div>
    </div>
  )
}

export default UpcomingMovies
