import React from "react";
export const InputBox = React.memo(({title,boxtype,inpValue,dis,minimum,onChangeInput,placeholder})=>{
    return <div className="mt-4">
        <div className="text-left font-bold">
            {title}
        </div>
        <div className="text-black">
            <input onChange={onChangeInput}
            className="rounded-md mt-2 w-full p-2 border-2" type={`${boxtype}`} value={inpValue} disabled={dis} placeholder={(placeholder!=undefined)?placeholder:`Enter your ${title}`} min={minimum}></input>
        </div>
    </div>
})