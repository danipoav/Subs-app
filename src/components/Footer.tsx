
export default function Footer() {
    return (
        <footer className=" text-gray-300 py-10 pb-4 w-full">

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm" />

            <div className="max-w-6xl mx-auto px-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">About Me</h2>
                        <p className="text-sm pr-30 text-justify">
                            I'm a passionate web developer focused on building clean, user-friendly applications. This project is a demonstration of my skills in full-stack development, using modern technologies like React, Redux, TypeScript, and Spring Boot. I’m always learning and open to new challenges.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">Follow Me</h2>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/danipoav" target="_blank" className="hover:text-white text-2xl"><i className="devicon-linkedin-plain"></i></a>
                            <a href="https://github.com/danipoav" target="_blank" className="hover:text-white text-2xl"><i className="devicon-github-original"></i></a>
                            <a href="https://www.instagram.com/danipoav/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388a5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947s.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388a5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123a5.9 5.9 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895a3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008" /></svg></a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
                        <p className="text-sm">📍 70 Subscription DP</p>
                        <p className="text-sm">📧 dapoav2002@gmail.com</p>
                        <p className="text-sm">📞 +34 634 914 322</p>
                    </div>
                </div>


            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                © {new Date().getFullYear()} Subscription Manager. All rights reserved.
            </div>
        </footer>
    );
}
