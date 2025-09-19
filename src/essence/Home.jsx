import React from 'react';
import Patchouli from '../assets/patchouli-drawn.jpg';
import Citronella from '../assets/citronella-drawn.jpg';
import Lemongrass from '../assets/lemongrass-drawn.jpg';

const Home = () => {
    return (
        <div id='home' className='flex items-center justify-center w-full h-screen text-center'>
            <div className='py-7 text-[#2E7D32]'>
                <h1 className='mx-auto font-bold text-5xl'>Assam Essence</h1>
                <p className='max-w-1/2 py-3 px-2 text-left'>Our focus is growing our plants and herbs using natural responsible methods ensuring a reliable supply without sacrificing quality. We offer high quality essential oils meticulously sourced and crafted to ensure purity and effectivenss in every drop. Our  sole aim is to harness the healing and transformative power of nature.</p>
            </div>
        </div>
    )
};

export default Home;