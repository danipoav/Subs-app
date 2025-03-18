

export default function Navbar() {
    return (
        <>
            <nav className=" fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-50">
                <div className="">
                    <div>MyApp</div>
                    <div>
                        <a href="#">Services</a>
                        <a href="#">Subscriptions</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </nav>
        </>
    )
}
