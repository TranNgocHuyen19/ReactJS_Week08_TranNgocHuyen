export function Header() {
    return (
        <header class="bg-white shadow-md p-4 flex justify-between items-center">
            <div class="text-xl font-bold text-pink-600">
                Dashboard
            </div>

            <div class="flex items-center space-x-4">
                <input type="text" placeholder="Search..." class="w-full p-2 bg-gray-100 outline-none rounded-lg" />
                <button class="text-gray-600">
                    <img src={'images/Search.png'} className="w-5 h-5" />
                </button>
                <button class="w-10 h-10 rounded-full overflow-hidden">
                    <img src={'images/Avatar 313.png'} alt="" />
                </button>
            </div>
        </header>
    )
}