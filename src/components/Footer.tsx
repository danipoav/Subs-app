
export default function Footer() {
    return (
        <footer className=" text-gray-300 py-10 pb-4 mt-16 w-full">

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm"/>

            <div className="max-w-6xl mx-auto px-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">About Us</h2>
                        <p className="text-sm">
                            We provide an advanced platform for managing all your subscriptions efficiently. Stay organized and never miss a renewal.
                        </p>
                    </div>


                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">Services</a></li>
                            <li><a href="#" className="hover:text-white">Pricing</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white text-2xl"><i className="devicon-facebook-plain"></i></a>
                            <a href="#" className="hover:text-white text-2xl"><i className="devicon-twitter-plain"></i></a>
                            <a href="#" className="hover:text-white text-2xl"><i className="devicon-linkedin-plain"></i></a>
                            <a href="#" className="hover:text-white text-2xl"><i className="devicon-github-original"></i></a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
                        <p className="text-sm">📍 1234 Subscription St, Tech City</p>
                        <p className="text-sm">📧 support@subscriptions.com</p>
                        <p className="text-sm">📞 +1 (234) 567-890</p>
                    </div>
                </div>


            </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                    © {new Date().getFullYear()} Subscription Manager. All rights reserved.
                </div>
        </footer>
    );
}
