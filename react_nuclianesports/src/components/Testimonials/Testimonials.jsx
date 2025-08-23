import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Heading from "../Heading/Heading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Customer1 from "../../assets/profile_img_1.jpg";
import Customer2 from "../../assets/profile_img_2.jpg";
import Customer3 from "../../assets/profile_img_3.jpg";
import Customer4 from "../../assets/profile_img_4.jpg";
import Customer5 from "../../assets/profile_img_5.jpg";
import 'swiper/css';
import 'swiper/css/navigation';
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <section>
      <div className="max-w-full mx-auto px-15 py-10 text-white font-Lex">
        <Heading highlight="Players" nohighlight="Reviews" />

        <div className=" flex justify-end py-5 gap-x-3 mt-7">
          <button className="custom-prev text-2xl rounded-lg w-11 h-11 text-black bg-zinc-100 flex justify-center items-center hover:bg-gradient-to-b hover:from-[#e11d48] hover:to-[#fc4e5b] hover:text-white cursor-pointer">
            <IoIosArrowBack />
          </button>
          <button className="custom-next text-2xl rounded-lg w-11 h-11 text-black bg-zinc-100 flex justify-center items-center hover:bg-gradient-to-b hover:from-[#e11d48] hover:to-[#fc4e5b] hover:text-white cursor-pointer">
            <IoIosArrowForward />
          </button>
        </div>

        <Swiper 
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev"
        }} 
        loop={true}
        breakpoints={{
          640: {slidesPerView: 1, spaceBetween: 20},
          768: {slidesPerView: 2, spaceBetween: 20},
          1024: {slidesPerView: 3, spaceBetween: 20}
        }}
        modules={[Navigation]} className="mySwiper">
          {review.map((item) => {
            return (
              <SwiperSlide className="bg-white/90 rounded-lg p-5">
                <div className="flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full outline-2 outline-[#e11d48] outline-offset-4 overflow-hidden">
                    <img src={item.image} className="w-full h-full object-center"/>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-black">{item.name}</h5>
                    <p className="text-black">{item.profession}</p>
                    <span className="flex text-yellow-400 mt-2 text-xl gap-1">
                      {Array.from({length: item.rating}, (_, index)=>(
                        <FaStar />
                      ))}
                    </span>
                  </div>
                </div>

                <div className="mt-7 min-h-[15vh]">
                  <p className="text-black">
                    {item.para}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

const review = [
  {
    id: 1,
    name: "Emily Johnson",
    profession: "BGMI Player",
    rating: 5,
    para: "This tournament was incredibly well-organized! The matches ran smoothly with no lag, and the competition was fierce but fair. Can't wait for the next one!",
    image: Customer1,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    profession: "Valorant Esports Athlete",
    rating: 4,
    para: "Great experience overall. The prize pool was substantial and the admins were responsive. Would love to see more diverse map selections in future tournaments.",
    image: Customer3,
  },
  {
    id: 3,
    name: "Sarah Miller",
    profession: "Professional Streamer",
    rating: 5,
    para: "As a content creator, I really appreciated the spectator features and the production quality. My viewers loved watching me compete in this well-run tournament!",
    image: Customer2,
  },
  {
    id: 4,
    name: "David Chen",
    profession: "CS:GO Team Captain",
    rating: 4,
    para: "Solid tournament with good anti-cheat measures in place. The scheduling was convenient for international players. Minor hiccups with the bracket system, but overall very professional.",
    image: Customer4,
  },
  {
    id: 5,
    name: 'Alex "Frost" Rodriguez',
    profession: "Call of Duty: Warzone Pro",
    rating: 5,
    para: "One of the smoothest tournaments I’ve played in! The servers were stable, and the admins handled disputes quickly. The prize distribution was lightning-fast too. 10/10!",
    image: Customer3,
  },
  {
    id: 6,
    name: 'Priya "Viper" Kapoor',
    profession: "Apex Legends Competitor",
    rating: 4,
    para: "Amazing production value and casting. The only downside was a slight delay in round transitions, but the competition was top-tier. Will definitely compete again!",
    image: Customer5,
  },
  {
    id: 7,
    name: 'Marcus "Titan" Wright',
    profession: "Rocket League Champion",
    rating: 5,
    para: "Flawless organization—zero lag, fair matchmaking, and hype commentary. The community was great, and the rewards were worth the grind. Absolute blast!",
    image: Customer4,
  },
  {
    id: 8,
    name: 'Lena "Nova" Petrov',
    profession: "Fortnite Content Creator",
    rating: 4,
    para: "Loved the format and how well it was streamed. My followers enjoyed the watch party! Only suggestion: maybe add more regional qualifiers next time.",
    image: Customer1,
  },
  {
    id: 9,
    name: 'Jin "Storm" Wei',
    profession: "Dota 2 Team Coach",
    rating: 5,
    para: "The best grassroots Dota 2 event I’ve seen! Drafting tools were pro-level, and the admins understood competitive nuances. No delays, no drama—just pure skill battles.",
    image: Customer2,
  },
];
