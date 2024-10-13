import React from "react"

export const  Heading=React.memo(({ headingTitle })=> {
    return <div className="m-2 p-2">
        <div className="flex justify-center text-5xl">
            {headingTitle}
        </div>
    </div>
})