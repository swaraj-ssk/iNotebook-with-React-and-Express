import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/notes/alertContext';

const Login = () => {
    const context = useContext(alertContext);
    const{showAlert}= context;

    const [credentials, setCredentials] = useState({email:"", password:""});

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value })
    }
    
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:7789/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email , password : credentials.password})
        })
        const json = await response.json();
        console.log(json)

        if(json.success){
            //Save auth token and redirect
            localStorage.setItem('token', json.authtoken);
            showAlert("Logged in Successfully", "success");
            navigate("/");
        }
        else{
            showAlert("Invalid credentials", "danger");
        }
    }
    
    return (
        <div className='mt-3'>
            <h2 className='my-2'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
