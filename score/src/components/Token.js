import React from 'react'

export default function Token(props) {
  return (
    <>
      <div className="mt-4 flex items-center justify-center">
        <div className="w-4/5 lg:w-4/5 xl:w-4/5 max-w-screen-sm rounded-lg shadow px-6 py-3 rounded-md flex justify-between items-center">
          <p className="text-center">{"Participant Token:\t " + (props.token !== null ? props.token[0] : "Not Yet Generated")}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={() => { navigator.clipboard.writeText(props.token[0]) }}>
            copy
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <div className="w-4/5 lg:w-4/5 xl:w-4/5 max-w-screen-sm  rounded-lg shadow px-6 py-3 rounded-md flex justify-between items-center">
          <p className="text-center">{"Judge Token:\t " + (props.token !== null ? props.token[1] : "Not Yet Generated")}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={() => { navigator.clipboard.writeText(props.token[1]) }}>
            copy
          </button>
        </div>
      </div>
    </>
  )
}
