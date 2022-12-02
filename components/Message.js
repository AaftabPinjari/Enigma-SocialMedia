


export default function Message({ children, avatar, description, username }) {
    return (
        <div className="bg-gray-200 p-8 m-8 rounded-2xl shadow-lg border-b-2">
            <div className="bg-gradient-to-br text-purple-500 from-blue-300 to-blue-100 flex p-2 text-center rounded-lg mb-4 shadow-lg">
                <p>{description}</p>
            </div>
            <div className="flex items-center justify-between my-auto ">
                <img src={avatar} className="w-10 h-10 rounded-full" />
                <h2 className="text-blue-500">{username}</h2>
            </div>
            {children}
        </div>
    )
}