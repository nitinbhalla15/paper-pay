export default function SearchBox({children}){
    return <div className={`p-10 overflow-y-auto max-h-96 my-10 mx-6 ${children[1]==false?``:`border border-dashed border-white`}`}>
        {children}
    </div>
} 