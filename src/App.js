import {Route, Switch} from 'react-router-dom'

import Register from './components/Register'

import UsersList from './components/UsersList'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Register} />
    <Route exact path="/users/" component={UsersList} />
  </Switch>
)

export default App
