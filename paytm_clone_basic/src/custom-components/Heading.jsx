import React from "react"

export const  Heading=React.memo(({ headingTitle })=> {
    return <div className="text-3xl">
            {headingTitle}
        </div>
})