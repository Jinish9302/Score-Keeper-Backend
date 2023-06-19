import React from 'react'

export default function UserInfo() {
    return (
        <div className="container flex items-center justify-center mt-24">
            <div className="bg-cyan-600 text-white p-8 rounded-lg">
                <div className="mb-4 text-2xl font-bold text-center">User Info</div>
                <div className="flex flex-col space-y-4">
                    <div className="text-center">
                        <span className="font-bold">Username:</span> JohnDoe
                    </div>
                    <div className="text-center">
                        <span className="font-bold">Email:</span> johndoe@example.com
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}
