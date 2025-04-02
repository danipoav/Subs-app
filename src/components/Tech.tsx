
export default function Tech() {

    const techIcons = [
        "devicon-java-plain",
        "devicon-typescript-plain",
        "devicon-spring-original",
        "devicon-react-original",
        "devicon-vitejs-plain",
        "devicon-mysql-original",
        "devicon-amazonwebservices-plain-wordmark",
        "devicon-nodejs-plain"
    ];

    return (
        <>
            <section className=' w-full items-center flex flex-col py-20 '>
                <div className="w-full overflow-hidden relative">
                    <div className="flex animate-marquee space-x-20">
                        {techIcons.concat(techIcons).map((icon, index) => (
                            <i key={index} className={`${icon} text-white text-7xl`}></i>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
