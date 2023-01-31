import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function Login () {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const { username, password } = form;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message  } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
    if(isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user,isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  } 

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password };  
    dispatch(login(userData));
  }

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1><FaSignInAlt/> Login</h1>
      </section>
      <p>Sign in to create notes</p>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" name="username" id="username" value={username} className="form-control" placeholder="Enter your username" onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" name="password" id="password" value={password} className="form-control" placeholder="Enter your password" onChange={onChange} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Sign In</button>
          </div>
        </form>           
      </section>
    </>
  )
}

export default Login
