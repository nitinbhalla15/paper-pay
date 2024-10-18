export default function SearchBox({children}){
    return <div className={`overflow-y-auto max-h-96 my-10 p-4 ${children[1]==false?``:`border border-2 border-black`}`}>
        {children}
    </div>
} 