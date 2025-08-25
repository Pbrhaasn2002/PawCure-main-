import React from 'react'
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from "../../assets/images/about-card.png"
import {Link} from 'react-router-dom';
const About = () => {
    return <section>
        <div className='container'>
            <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                {/* =======about img======= */}
                <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                    <img src={aboutImg} alt='' />
                    <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]'>
                        <img src={aboutCardImg}/>

                    </div>
                </div>
                 {/* =======about content======= */}
                 <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 '>
                    <h2 className='heading'>Proud to be one of the nations best </h2>
                    <p className='text__para'>
                    Our unwavering commitment to excellence, combined with a team of highly skilled and passionate professionals, ensures that your pets receive top-tier healthcare and attention. Whether it's routine check-ups, emergency care, or specialized treatments, we stand at the forefront of pet wellness, providing the best solutions for the health and happiness of your beloved furry friends. Trust us for the ultimate in pet care excellence.
                    </p>
                    <p className='text__para mt-[30px]'>
                    Our unwavering commitment to excellence, combined with a team of highly skilled and passionate professionals, ensures that your pets receive top-tier healthcare and attention. Whether it's routine check-ups, emergency care, or specialized treatments, we stand at the forefront of pet wellness, providing the best solutions for the health and happiness of your beloved furry friends. Trust us for the ultimate in pet care excellence.
                    </p>
                    <Link to="/"><button className='btn'>Learn More</button></Link>
                 </div>
            </div>
        </div>

    </section>
};

export default About;