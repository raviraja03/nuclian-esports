import React from "react";
import Heading from "../Heading/Heading";
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/ff_game_poster.jpg";
import Button from "../Button/Button";
import Button_2 from "../Button/Button_2";
import { Link } from "react-router-dom";

const Category = () => {

    const renderCards = category.map(card => {
        return(
            // Card [#0a141d]/76
            <div className=" bg-white/30 p-2 rounded-lg" key={card.id}>

                {/* Card Image */}
                <div>
                    <img src={card.image} alt="" className="rounded-lg"/>
                </div>

                {/* Card Content */}
                <div className="p-2 text-black font-Lex">
                    <h3 className="text-3xl font-bold">{card.title}</h3>
                    <div className="flex justify-between font-semibold mt-4">
                        <h4>Entry Amount: </h4> 
                        <h4>{card.entry_amount}</h4>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <h4>Price Pool: </h4>
                        <h4>{card.price_pool}</h4>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <h4>Room ID: </h4>
                        <h4>{card.room_id}</h4>
                    </div>
                    <div className="flex justify-between font-semibold mb-4">
                        <h4>Participants:</h4>
                        <h4>{card.participants}</h4>
                    </div>
                    <Button_2 content="JOIN NOW"/>
                </div>
            </div>
        )
    })
  return (
    <section>
      <div className="max-w-full mx-auto px-15 py-10 text-white bg-[linear-gradient(176deg,rgba(0,0,0,1)_16%,rgba(252,78,91,1)_40%,rgba(225,29,72,1)_62%,rgba(0,0,0,1)_80%)]">
        <Heading highlight="Featured" nohighlight="Tournaments" />

        {/* Category Card */}
        <div className="flex gap-7 mt-10 px-8">
            {renderCards}
        </div>
        <div className="mt-5 w-fit m-auto">
            <Link to='/tournaments'>
              <Button content="View All"/>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;

const category = [
  {
    id: 1,
    title: "Valorant 5 GWB3",
    entry_amount: 200,
    price_pool: 7000,
    room_id: "valoi_2025_1",
    participants: "88 / 100",
    image: Valo,
  },
  {
    id: 2,
    title: "BGMI Championship",
    entry_amount: 150,
    price_pool: 7500,
    room_id: "bgmit_2025_2",
    participants: "68 / 100",
    image: Bgmi,
  },
  {
    id: 3,
    title: "COD: Mobile Summer Cup",
    entry_amount: 250,
    price_pool: 1500,
    room_id: "codt_2025_3",
    participants: "28 / 100",
    image: Cod,
  },
];
