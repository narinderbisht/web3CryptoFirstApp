import { BsSearchHeartFill } from "react-icons/bs";
import { BsShieldFillCheck } from "react-icons/bs";
const Services = () => {
    const ServiceIcon = ({title, description, icon, bgcolor}) => {
        return (
            <div className="flex flex-row items-center justify-start p-2 m-2 cursor-pointer hover:shadow-xl white-glassmorphism">
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgcolor}`}>{icon}</div>
                
                <div className="flex flex-col ml-5 flex-1">
                    <h2 className="text-white mt-2 text-lg">{ title }</h2>
                    <p className="text-white mt-1 text-base">{ description }</p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p20 py-12 px-4">
                <div className="flex flex-1 flex-col items-start justify-start">
                    <h1 className="font-bold text-3xl sm:text-5xl text-white py-2 text-gradient">Service that we <br />
                    continue to improve.
                    </h1>
                </div>
                <div className="flex flex-1 flex-col items-center justify-start">
                    <ServiceIcon
                        title="Security Granteed"
                        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                        icon={<BsShieldFillCheck fontSize={20} className="text-white"/>}
                        bgcolor="bg-[#2952E3]"
                    />
                    <ServiceIcon
                        title="Security Granteed"
                        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                        icon={<BsSearchHeartFill fontSize={20} className="text-white"/>}
                        bgcolor="bg-[#8945F8]"
                    />
                    <ServiceIcon
                        title="Security Granteed"
                        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                        icon={<BsSearchHeartFill fontSize={20} className="text-white"/>}
                        bgcolor="bg-[#F84550]"
                    />
                </div>
            </div>

        </div>
    )
}

export default Services