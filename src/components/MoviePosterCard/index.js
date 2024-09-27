import './index.css'

const MoviePosterCard = props => {
  const {cardDetails} = props
  const {posterPath, title, releaseDate, id} = cardDetails
  return (
    <li className="list-item-styling">
      <img src={posterPath} className="poster-styling" />
      <p className="title">{title}</p>
      <p className="release-styling">{releaseDate}</p>
    </li>
  )
}

export default MoviePosterCard
