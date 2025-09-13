import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Heading from "../Heading/Heading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Customer1 from "../../assets/profile_img_1.jpg";
import Customer2 from "../../assets/profile_img_2.jpg";
import Customer3 from "../../assets/profile_img_3.jpg";
import Customer4 from "../../assets/profile_img_4.jpg";
import Customer5 from "../../assets/profile_img_5.jpg";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <section className="bg-black/90 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-white font-Lex">
        <Heading highlight="Players" nohighlight="Reviews" />

        {/* Navigation Buttons */}
        <div className="flex justify-end py-4 sm:py-5 gap-x-3 mt-6 sm:mt-7">
          <button className="custom-prev text-xl sm:text-2xl rounded-xl w-10 h-10 sm:w-11 sm:h-11 text-black bg-white flex justify-center items-center hover:bg-gradient-to-b hover:from-[#e11d48] hover:to-[#fc4e5b] hover:text-white cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
            <IoIosArrowBack />
          </button>
          <button className="custom-next text-xl sm:text-2xl rounded-xl w-10 h-10 sm:w-11 sm:h-11 text-black bg-white flex justify-center items-center hover:bg-gradient-to-b hover:from-[#e11d48] hover:to-[#fc4e5b] hover:text-white cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
            <IoIosArrowForward />
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 3, spaceBetween: 40 },
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          speed={800}
        >
          {review.map((item) => (
            <SwiperSlide
              key={item.id}
              className="pb-4"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-in-out border border-white/10 min-h-[280px] flex flex-col">
                <div className="flex gap-4 items-start sm:gap-5">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full outline-2 outline-[#e11d48] outline-offset-4 overflow-hidden transition-all duration-500 hover:scale-110">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-lg sm:text-xl font-bold text-white truncate transition-all duration-500 hover:text-[#e11d48]">
                      {item.name}
                    </h5>
                    <p className="text-white/80 font-medium text-sm sm:text-base">{item.profession}</p>
                    <span className="flex text-yellow-400 mt-2 text-lg sm:text-xl gap-1">
                      {Array.from({ length: item.rating }, (_, index) => (
                        <FaStar key={index} />
                      ))}
                    </span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex-1 min-h-[12vh] flex items-end">
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed transition-opacity duration-500 hover:opacity-100 line-clamp-4">
                    {item.para}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

// Data
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