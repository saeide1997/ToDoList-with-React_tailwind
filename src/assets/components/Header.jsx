function Header() {
    return (
        <header className="bg-blue-300 w-full left-0 right-0 fixed top-0 text-cyan-800 py-4 mb-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <p className="text-lg opacity-80 ">مدیریت کارهای روزانه</p>
                <h1 className="text-2xl font-bold">ToDo List</h1>
            </div>
        </header>
    );
}

export default Header;
