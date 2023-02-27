import Image from "next/image";
import React from "react";
import mainImage from "../../Images/h1_hero1.png.jpeg";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="bg-[#391f14] lg:h-[700px] md:h-[500px] h-[300px]">
      <div className="flex flex-row justify-end w-full h-full overflow-hidden">
        <div className="absolute z-22 top-[15rem] left-72">
          <h1 className="text-white text-[4rem] ">World Class</h1>
          <h1 className="text-white text-[4rem] ">Accomodation</h1>
          <div className="p-4">
            <div className="text-white text-lg cormorant">
              Discover a hotel that defines
            </div>
            <div className="text-white text-lg cormorant">
              a new dimension of luxury
            </div>
            <div className="py-4">
              <Link href="/rooms">
                <button className="btn glass bg-[#a15233] text-white bg-none">
                  View More
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Image
            className="lg:w-[60rem] h-full md:w-[40rem] w-[20rem]"
            src={mainImage}
            alt="main image"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
