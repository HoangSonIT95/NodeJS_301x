import Header from './components/Header';
import Users from './components/Users';
import AddUser from './components/AddUser';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={() => <AddUser />} />
        <Route path='/Users' component={() => <Users />} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
