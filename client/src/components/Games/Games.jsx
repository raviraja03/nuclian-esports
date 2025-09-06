import React from 'react';
import Heading from '../Heading/Heading';
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/ff_game_poster_2.jpg";
import F1 from "../../assets/f1_game_poster.jpg";
import Fortnite from "../../assets/fortnite_game_poster.jpg";

const Games = () => {
    return (
        <section>
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-10 text-white">
                <Heading highlight="Featured" nohighlight="Games" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {/* F1 - spans 2 columns on large screens */}
                    <div className="lg:col-span-2 hover:scale-105 transition-transform duration-300 ease-linear cursor-pointer aspect-[16/9]">
                        <img src={F1} alt="F1" className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>

                    {/* Bgmi */}
                    <div className="hover:scale-105 transition-transform duration-300 ease-linear cursor-pointer aspect-[16/9]">
                        <img src={Bgmi} alt="BGMI" className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>

                    {/* Cod */}
                    <div className="hover:scale-105 transition-transform duration-300 ease-linear cursor-pointer aspect-[16/9]">
                        <img src={Cod} alt="COD" className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>

                    {/* Valo */}
                    <div className="hover:scale-105 transition-transform duration-300 ease-linear cursor-pointer aspect-[16/9]">
                        <img src={Valo} alt="Valorant" className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>

                    {/* Freefire */}
                    <div className="hover:scale-105 transition-transform duration-300 ease-linear cursor-pointer aspect-[16/9]">
                        <img src={Freefire} alt="Freefire" className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>

                    {/* Fortnite - spans 2 columns on large screens */}
                    <div className="lg:col-span-2 hover:scale-105 transition-transform duration-300 ease-linear cursor-pointer aspect-[16/9]">
                        <img src={Fortnite} alt="Fortnite" className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Games;
