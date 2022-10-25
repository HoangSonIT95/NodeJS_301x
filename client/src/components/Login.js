import axios from 'axios';
import '../CSS/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async e => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    await axios
      .post('http://localhost:3000/login', user)
      .then(res => {
        navigate('/');
      })
      .catch(err => alert(err.response.data));
  };

  return (
    <div>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' id='email' />
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
