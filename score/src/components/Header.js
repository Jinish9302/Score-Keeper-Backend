import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
export default function Header(props) {
    const [title, setTitle] = useState("Score-Keeper");
    // setInterval(()=>{
    //     if(title === props.contest_name) {
    //         setTitle("Dig-Deeper")
    //     } else {
    //         setTitle(props.contest_name)
    //     }
    // }, 1000)
    useEffect(()=> {
        setTitle(props.contest_name);
    }, [props.contest_name])
    return (
        <div className="bg-gray-800 text-white fixed top-0 left-0 right-0">
            <div className="mx-auto py-4 px-6 flex items-center justify-between">
                <div className="text-xl font-bold">{title}</div>
                <div className="space-x-4">
                    {(props.token!==null && props.token!=='null')?<Link to="/" className="text-white hover:text-gray-200">Home</Link>:""}
                    <Link to="/Judge" className="text-white hover:text-gray-200">Judge</Link>
                    <Link to="/Participant" className="text-white hover:text-gray-200">Leaderboard</Link>
                    {(props.token!==null && props.token!=='null')?<Link to="/UserInfo" className="text-white hover:text-gray-200">{props.user_name}</Link>:<Link to="/" className="text-white hover:text-gray-200">{props.user_name}</Link>}
                </div>
            </div>
        </div>
    )
}
