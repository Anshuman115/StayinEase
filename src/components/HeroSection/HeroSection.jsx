import Image from "next/image";
import React from "react";
import mainImage from "../../Images/h1_hero1.png.jpeg";

const HeroSection = () => {
  return (
    <div className="bg-[#391f14] h-[800px]">
      <div className="flex flex-row justify-end w-full h-full overflow-hidden">
        <div className="absolute z-22 top-[16rem] left-56">
          <h1 className="text-white text-[5rem] ">World class</h1>
          <h1 className="text-white text-[5rem] ">Accomodation</h1>
        </div>
        <div>
          <Image className="" src={mainImage} alt="main image" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
