import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/duck_loader.gif'
export default function SignUp(props) {
    const [email, setEmail] = useState("")
    const [emailClass, setEmailClass] = useState("text-white")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [passLenClass, setPassLenClass] = useState("text-white")
    const [passValidityClass, setPassValidityClass] = useState("text-white")
    const [cPassValidityClass, setCPassValidityClass] = useState("text-white")
    const [cPassword, setCPassword] = useState("")
    const [loaderClass, setLoaderClass] = useState('hidden')
    const [uidVis, setUidVis] = useState('hidden')

    const validEmail = (em) => {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
        return pattern.test(em)
    }
    const getEmailClass = (em) => {
        console.log(em)
        setEmail(em)
        if (em.length === 0) {
            return 'text-white'
        } else if (validEmail(em)) {
            return 'text-green-600'
        } else {
            return 'text-rose-500'
        }
    }
    const validPass = (pass) => {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,100}$/
        return pattern.test(pass)
    }
    const PasswordClass = (pass) => {
        console.log(pass)
        setPassword(pass);
        if (pass.length === 0) {
            setPassLenClass('text-white')
        } else if (pass.length < 8) {
            setPassLenClass('text-rose-500')
        } else {
            setPassLenClass('text-green-600')
        }
        if (pass.length === 0) {
            setPassValidityClass('text-white')
        } else if (validPass(pass)) {
            setPassValidityClass('text-green-600')
        } else {
            setPassValidityClass('text-rose-500')
        }
    }

    const CPassClass = (pass) => {
        setCPassword(pass)
        if (pass === '') {
            setCPassValidityClass('text-white')
        } else if (pass === password) {
            setCPassValidityClass('text-green-600')
        } else {
            setCPassValidityClass('text-rose-500')
        }
    }

    const validateData = () => {
        return validEmail(email) && validPass(password) && (password === cPassword) && userName.length > 0
    }

    const submit = async (e) => {
        await e.preventDefault()
        if (!validateData()) {
            alert('please fill details properly')
            return;
        }
        setLoaderClass('flex items-center justify-center')
        let user_name = userName
        console.log(JSON.stringify({ user_name, email, password }))
        let url = props.baseUrl + 'api/auth/create-user';
        console.log(url)
        let header = {
            'Content-Type': 'application/json'
        }
        let data = JSON.stringify({ user_name, email, password })
        let res = await fetch(url, {
            method: 'post',
            headers: header,
            body: data
        })
            .catch(err => {
                console.log(err)
            })
        if (res.ok) {
            const json_ = await res.json()
            console.log(json_)
            await localStorage.setItem('auth-token', json_.token)
            window.location.href = '/'
        } else {
            alert('user id already exists')
            setLoaderClass('hidden')
        }
    }

    return (
        <div className="mt-4 flex items-center justify-center h-screen">
            <div className="bg-cyan-600 text-black p-7 rounded-lg">
                <div className="text-xl font-bold text-center">Sign Up</div>
                <form onSubmit={submit} className="mt-4 flex flex-col space-y-4">
                    <input
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value) }}
                        type="text"
                        className="w-64 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Username"
                    />
                    <div className={uidVis}>This user id already exists</div>
                    <input
                        value={email}
                        onChange={(e) => { setEmailClass(getEmailClass(e.target.value)) }}
                        type="email"
                        className="w-64 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Email"
                    />
                    <input
                        value={password}
                        onChange={(e) => {
                            PasswordClass(e.target.value);
                        }}
                        type="password"
                        className="w-64 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Password"
                    />
                    <input
                        value={cPassword}
                        onChange={(e) => { CPassClass(e.target.value) }}
                        type="password"
                        className="w-64 text-slate-950 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Confirm Password"
                    />
                    <div className="text-sm">
                        <ol className='list-disc'>
                            <li className={emailClass}>Email should be valid (i.e. example@dmail.com)</li>
                            <li className={passLenClass}>Password should be at least 8 characters long</li>
                            <li className={passValidityClass}>Password should contain at least 1 uppercase letter, <br/> 1 lowercase letter, 1 numeric value, and 1 special character</li>
                            <li className={cPassValidityClass}>Password and confirm password should match</li>
                        </ol>
                    </div>
                    <div className={loaderClass}>
                        <img className='h-5' src={logo} alt='loading'></img>
                        <div>please wait....</div>
                    </div>
                    <div className="flex item-center justify-center">
                        <button type='submit' className="w-48 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <span className="text-slate-100">Already have an account?</span>
                    <Link to='/'>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md ml-2">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
