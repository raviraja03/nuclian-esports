import React from 'react'
import Heading from '../Heading/Heading'
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/ff_game_poster_2.jpg";
import F1 from "../../assets/f1_game_poster.jpg"
import Fortnite from "../../assets/fortnite_game_poster.jpg"

const Games = () => {
    return (
        <section>
            <div className="max-w-full mx-auto px-15 py-10 text-white">
                <Heading highlight="Featured" nohighlight="Games"/>
            

                <div className="grid grid-cols-4 grid-rows-2 gap-8 mt-10 px-8">
                    {/* F1 - spans 2 columns */}
                    <div className="col-span-2 h-56 hover:scale-105 transition-all duration-300 ease-linear  cursor-pointer"> 
                        <img src={F1} alt="F1" className="w-full h-full object-cover object-top/0.5 rounded-lg shadow-[0px_4px_100px_0px_rgba(158,95,186,0.72)]" />
                    </div>
                
                    {/* Bgmi */}
                    <div className="col-start-3 h-56 hover:scale-105 transition-all duration-300 ease-linear cursor-pointer "> 
                        <img src={Bgmi} alt="bgmi" className="w-full h-full object-cover rounded-lg shadow-[0px_4px_100px_0px_rgba(183,141,102,0.72)]" />
                    </div>
                
                    {/* Cod */}
                    <div className="col-start-4 h-56 hover:scale-105 transition-all duration-300 ease-linear cursor-pointer">
                        <img src={Cod} alt="cod" className="w-full h-full object-cover rounded-lg shadow-[0px_4px_100px_0px_#7873B5]" />
                    </div>
                
                    {/* Valo */}
                    <div className="row-start-2 h-56 hover:scale-105 transition-all duration-300 ease-linear cursor-pointer"> 
                        <img src={Valo} alt="Valorant" className="w-full h-full object-cover rounded-lg shadow-[0px_4px_100px_0px_rgba(254,64,89,0.62)]" />
                    </div>
                
                    {/* Freefire */}
                    <div className="row-start-2 h-56 hover:scale-105 transition-all duration-300 ease-linear cursor-pointer"> 
                        <img src={Freefire} alt="freefire" className="w-full h-full object-cover rounded-lg object-left shadow-[0px_4px_100px_0px_rgba(178,223,243,0.72)]" />
                    </div>
                
                    {/* Fortnite - spans 2 columns */}
                    <div className="col-span-2 row-start-2 h-56 hover:scale-105 transition-all duration-300 ease-linear cursor-pointer"> 
                        <img src={Fortnite} alt="fortnite" className="w-full h-full object-cover rounded-lg object-top shadow-[0px_4px_100px_0px_rgba(114,123,71,0.92)]" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Games