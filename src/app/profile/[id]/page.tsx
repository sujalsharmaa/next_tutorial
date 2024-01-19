export default function UserProfile({params}:any){

    return (
        <div className="bg-black border-4 border-red-500 flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl text-white" 
            >dsf
            <span className=" ml-2 p-2 rounded bg-orange-500 text-black
            ">hello {params.id}</span>
            </p>
        </div>
    )
}