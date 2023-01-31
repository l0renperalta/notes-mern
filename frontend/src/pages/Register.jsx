import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const { username, password, confirmPassword } = form;
  
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
