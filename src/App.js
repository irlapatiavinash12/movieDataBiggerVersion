import './App.css'

import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'

import TopRated from './components/TopRated'

import UpcomingMovies from './components/UpcomingMovies'

import MovieDetails from './components/MovieDetails'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={UpcomingMovies} />
    <Route exact path="/movie/:id" component={MovieDetails}/>
  </Switch>
)

export default App
