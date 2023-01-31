import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login () {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const { username, password } = form;
  
  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  } 

  const onSubmit = (e) => {
    e.preventDefault();
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
