
interface Navbar2Props {
    ref: React.RefObject<HTMLDivElement | null>;
}

export default function Hero2({ ref }: Navbar2Props) {
    return (
        <section ref={ref} className=" scroll-mt-16 w-full max-w-6xl mx-auto text-left py-20 pb-2 flex gap-10">
            <div className=" ">
                <h1 className="text-4xl md:text-4xl font-bold text-center">Subscription Management </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl text-justify" style={{ color: "#8a8f98" }}>
                    Managing subscriptions can be overwhelming. From entertainment services to cloud storage, software licenses, and professional tools, keeping track of multiple recurring payments can become a hassle. That’s where our platform comes in.

                    Our subscription management system is designed to simplify your digital life by providing a seamless way to track, manage, and optimize all your subscriptions in one place. Whether you’re an individual user trying to stay on top of personal expenses or a business handling multiple service subscriptions, our solution ensures efficiency, organization, and cost control.
                </p>
            </div>
            <div>
                <h1 className="text-4xl md:text-4xl font-bold  text-center">Why This Project?</h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl text-justify" style={{ color: "#8a8f98" }}>
                    This platform is more than just a tool it's an initiative to showcase the power of modern web development. By combining industry-leading technologies, we are demonstrating how a real-world SaaS (Software-as-a-Service) product can be built from scratch.

                    This project is also a way to share our skills with the tech community, potential clients, and employers, showing expertise in full-stack development, API integration, UI/UX design, and cloud deployment.
                </p>
            </div>



        </section>
    )
}
