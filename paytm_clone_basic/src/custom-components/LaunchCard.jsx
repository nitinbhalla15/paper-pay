export default function LaunchCard({ children }) {
    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div className=" w-1/2 max-w-md p-10 bg-white max-h-svh text-center rounded-md">
                {children}
            </div>
        </div>
    </div>
}