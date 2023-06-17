import React from 'react'
import Generate from './Generate.js'
import Token from './Token.js'

export default function Workspace(props) {

    return (
        <div className="container mx-auto flex-grow py-2 px-2">
            <Generate set_token={props.set_token} set_name={props.set_name} name={props.name} part_count={props.part_count} set_part_count={props.set_part_count} />
            {(props.token !== null) ? <Token token={props.token} part_count={props.part_count} /> : ""}
        </div>
    )
}
