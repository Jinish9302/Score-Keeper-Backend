import React from 'react'
import { useState } from 'react';

export default function Generate(props) {
    const [comp_name, setName] = useState("")
    const [part_size, setPartSize] = useState(null)
    const randomToken = (cnt) => {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
        let ret = '';
        for (let i = 0; i < cnt; i++) {
            ret += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return ret;
    }
    const submit = (e) => {
        e.preventDefault();
        if (comp_name === "" || part_size == null) {
            alert("Enter The Compition Name and Number of participants")
        } else {
            props.set_name(comp_name)
            props.set_part_count(part_size)
            props.set_token([randomToken(8), randomToken(8)]);
        }
    }
    const reset = () => {
        setName("")
        setPartSize(null)
        props.set_name("Score-Keeper");
        props.set_part_count(null)
        props.set_token(null)
    }
    return (
            <form onSubmit={submit} className="flex item-center justify-center">
                <table className='mt-20 w-4/5 max-w-screen-sm item-center'>
                    <tr>
                        <td className = "w-full flex item-center justify-center ">
                            <input
                                type="text"
                                value={comp_name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 my-2 px-6 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                placeholder="Name of the competition"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className = "w-full flex item-center justify-center ">
                            <input
                                type="number"
                                value={part_size}
                                onChange={(e) => setPartSize(parseInt(e.target.value))}
                                className="w-full border border-gray-300 my-2 px-6 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                placeholder="Number of Participants"
                                min={3}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className = "flex item-center justify-center ">
                            <button
                                type="submit"
                                className="w-2/5 min-w-fit bg-blue-500 my-2 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
                            >Generate</button>

                        </td>
                    </tr>

                    <tr>
                        <td className='flex item-center justify-center '>
                            <button 
                                type="reset" 
                                onClick={reset} 
                                className="w-2/5 min-w-fit flex item-center justify-center bg-blue-500 my-2 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
                                >Reset
                            </button>
                        </td>
                    </tr>

                </table>
            </form>
    )
}
