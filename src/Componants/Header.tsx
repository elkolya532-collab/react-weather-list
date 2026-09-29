function Header(){
    return (
        <header className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="text-2xl bg-gray-100 rounded p-2">🌧️</div>
                <div></div>
                <div>
        <h1 className="text-2xl font-bold ">Weather App Dashboard</h1>
        <h3 className="text-2xl text-gray-500 font-bold">Real-time Weather update 15 scounds for you fav citis</h3>
        </div>
        </div>
        <div className="bg-gray-100 rounded-full p-2">🔴Live</div>
        </header>



    )
}
export default Header