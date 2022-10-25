import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const handleSignUp = e => {
    e.preventDefault();
    if (e.target.password.value !== e.target.password_confirm.value) {
      return alert('Confirmation password must be same as password');
    }
    const newUser = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post('/register', newUser)
      .then(res => navigate('/login'))
      .catch(err => alert(err.response.data));
  };

  return (
    <div>
      <form onSubmit={handleSignUp} className='signup-form'>
        <div className='signup-form-control'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' id='email' />
        </div>

        <div className='signup-form-control'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <div className='signup-form-control'>
          <label htmlFor='password_confirm'>Confirm Password</label>
          <input
            type='password'
            name='password_confirm'
            id='password_confirm'
          />
        </div>
        <button className='btn' type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
