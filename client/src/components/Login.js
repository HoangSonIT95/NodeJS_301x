import axios from 'axios';
import '../CSS/login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = e => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    // await fetch
    //   .post('http://localhost:5000/login', user)
    //   .then(res => {
    //     const cookies = new Cookies();
    //     cookies.set('connect.sid', res.data.cookieUser);
    //     navigate('/');
    //   })
    //   .catch(err => alert(err.response.data));
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(res => {
        const cookies = new Cookies();
        // cookies.set('connect.sid', res);
        navigate('/');
      })
      .catch(err => alert(err.response));
  };

  return (
    <div>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <button className='btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
