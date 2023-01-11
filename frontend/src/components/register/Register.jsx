import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

function Register(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const history = useHistory();
    const registerHandler = (e) => {
        e.preventDefault()
        const body = {
            firstname: firstName,
            lastname: firstName,
            email: email,
            password: password
        }
        Axios.post('http://localhost:3002/user/addUser', body).then(({ data }) => {
            const config = {
                headers: {
                    Authorization: data.token
                }
            }
            Axios.get('http://localhost:3002/user/currentUser', config).then(({ data }) => { localStorage.setItem('user', JSON.stringify(data.user)); history.push('/') }).catch(err => console.error(err))
        }).catch(err => console.error(err))
    }
    return (
        <div className='login'>
            <form className='loginForm'>
                <label>
                    First Name:
                </label>
                <input type="text" name="username" onChange={(e) => setFirstName(e.target.value)} />

                <label>
                    Last Name:
                </label>
                <input type="text" name="username" onChange={(e) => setLastName(e.target.value)} />

                <label>
                    Email:
                </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                <label>
                    Password:
                </label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <span className='text-success'>{msg}</span>
                <button className='loginButton' onClick={(e) => registerHandler(e)}>Register</button>

            </form>
        </div >

    )
}

Register.propTypes = {

}

export default Register

