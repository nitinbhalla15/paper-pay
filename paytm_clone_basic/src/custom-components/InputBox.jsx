import { useRecoilValue, useSetRecoilState } from "recoil"
import React from "react";
export const InputBox = React.memo(({title,boxtype,inpValue,dis,minimum,onChangeInput})=>{
    console.log("Input box renders")
    return <div className="m-2 p-4 flex flex-col">
        <div className="mt-4 text-xl font-bold">
            {title}
        </div>
        <div className="mt-4 text-black">
            <input onChange={onChangeInput}
            className="rounded-xl w-full p-4" type={`${boxtype}`} value={inpValue} disabled={dis} placeholder={`Enter your ${title}`} min={minimum}></input>
        </div>
    </div>
})