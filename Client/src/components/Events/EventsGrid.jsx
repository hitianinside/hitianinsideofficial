import React from 'react'
// image list 
import abhinito23 from '../../assets/eventimage/abhinito23.jpeg'
import carrercounteling01 from '../../assets/eventimage/carrercounteling01.jpeg'
import creativeart from '../../assets/eventimage/creativeart.jpeg'
import deepdarpan23 from '../../assets/eventimage/deepdarpan23.jpeg'
import glory23 from '../../assets/eventimage/glory23.jpeg'
import navroopam3 from '../../assets/eventimage/navroopam3.0.jpeg'
import websitedevelopment02 from '../../assets/eventimage/websitedevelopment02.jpeg'
import battleground from '../../assets/eventimage/battleground.jpeg'
import navroopam5 from '../../assets/eventimage/navroopam5.0.png';
import navroopam6 from '../../assets/eventimage/navroopam6.0.png';
import swarajehind2 from '../../assets/eventimage/swaraj-e-hind.png';
import thinkTank from '../../assets/eventimage/think_tank.png';
import nextgen from '../../assets/eventimage/nextgen.png';

const EventsGrid = () => {
  return (
    <section className="box grid grid-cols-4 gap-2 mb-5">
      <div className="box1 overflow-hidden bg-red-50 w-full">
        <img className=" hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={navroopam3} alt="event_img" />
      </div>
      <div className="box3 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={carrercounteling01} alt="event_img" />
      </div>
      <div className="box2 overflow-hidden bg-red-50 w-full">
        <img className=" hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={creativeart} alt="event_img" />
      </div>
      <div className="box4 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={deepdarpan23} alt="event_img" />
      </div>
      <div className="box5 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={thinkTank} alt="event_img" />
      </div>
      <div className="box6 bg-red-50 col-start-2 col-end-4 row-start-2 row-end-4 w-full overflow-hidden">
        {/* center  */}
        <img className="hover:scale-125 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={navroopam6} alt="event_img" />
      </div>
      <div className="box8 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={navroopam5} alt="event_img" />
      </div>
      <div className="box9 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={swarajehind2} alt="event_img" />
      </div>
      {/* <div className="box7  bg-red-50 col-start-2 col-end-4 h-28">2</div> */}
      <div className="box10 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={nextgen} alt="event_img" />
      </div>
      <div className="box11 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={battleground} alt="event_img" />
      </div>
      <div className="box12 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={glory23} alt="event_img" />
      </div>
      <div className="box13 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={abhinito23} alt="event_img" />
      </div>
      <div className="box14 overflow-hidden bg-red-50 w-full">
        <img className="hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75 object-cover" src={websitedevelopment02} alt="event_img" />
      </div>
    </section>
  )
}

export default EventsGrid;