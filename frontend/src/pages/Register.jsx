import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const { username, password, confirmPassword } = form;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

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
    
    if(password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData = { username, password };
      dispatch(register(userData));
    }
  }

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1><FaUser/> Register</h1>
      </section>
      <p>Please create an account</p>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" name="username" id="username" value={username} className="form-control" placeholder="Enter your username" onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" name="password" id="password" value={password} className="form-control" placeholder="Enter your password" onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} className="form-control" placeholder="Type again your password" onChange={onChange} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>           
      </section>
    </>
  )
}

export default Register
