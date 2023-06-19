import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/duck_loader.gif'
export default function Login(props) {
    const [isValid, setValidity] = useState(true)
    const [user_name, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loaderClass, setLoaderClass] = useState("hidden")
    const submit = async (e) => {
        await e.preventDefault()
        setLoaderClass('flex items-center justify-center')
        console.log(JSON.stringify({ user_name, password }))
        let url = props.baseUrl + 'api/auth/login';
        console.log(url)
        let header = {
            'Content-Type': 'application/json'
        }
        let data = await JSON.stringify({ user_name, password })
        let res = await fetch(url, {
            method: 'post',
            headers: header,
            body: data
        })
        .catch(err => {
            console.log(err)
        })
        console.log(res)
        if (res.ok) {
            const json_ = await res.json()
            localStorage.setItem('auth-token', json_.token)
            console.log(localStorage.getItem('auth-token'))
            props.set_token(json_.token)
            setValidity(true)
            window.location.href = "/"
        } else {
            console.log("INVALID CREDENTIALS")
            setValidity(false)
        }
        setLoaderClass('hidden')
    }
    return (
        <div className="container flex items-center justify-center mt-24">
            <div className="text-black p-8 bg-cyan-600 rounded-lg shadow">
                <div className="mb-4 text-2xl font-bold text-center">Login Page</div>
                <form
                    onSubmit={submit}
                    className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={user_name}
                        onChange={(e) => { setUserName(e.target.value) }}
                        className="w-64 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className="w-64 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Password"
                    />
                    {isValid ? "" : <div className='text-red-500'>Username or Password is incorrect</div>}
                    <div className={loaderClass}>
                        <img className='h-5' src={logo} alt='loading'></img>
                        <div>please wait....</div>
                    </div>
                    <button
                        type='submit'
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-center mt-4">
                    <Link to='/SignUp'>
                        <button
                            className="bg-blue-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md"
                        >
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
