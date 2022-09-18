import Main from './components/Main';
import Navigation from './components/Navigation';
import AddProduct from './components/AddProduct';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import './CSS/forms.css';
import './CSS/main.css';
import './CSS/product.css';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Switch>
        <Route exact path='/' component={() => <Main />} />
        <Route path='/add-product' component={() => <AddProduct />} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
