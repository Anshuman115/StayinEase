import React from "react";
import mainImage from "../../Images/h1_hero1.png.jpeg";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="bg-[#391f14] lg:h-[700px] md:h-[500px] h-[300px]">
      <div className="flex flex-row justify-end w-full h-full overflow-hidden">
        <div className="absolute z-22 top-[6rem] left-8 md:top-[12rem] md:left-40 lg:top-[15rem] lg:left-72">
          <h1 className=" text-[#d1d8f3] text-[1.5rem] md:text-[3rem] lg:text-[4rem] font-bold drop-shadow-[0_2.5px_2.5px_rgba(57,31,20,1)]">
            World Class
          </h1>
          <h1 className=" text-[#d1d8f3] text-[1.5rem] md:text-[3rem] lg:text-[4rem] font-bold drop-shadow-[0_2.5px_2.5px_rgba(57,31,20,1)]">
            Accomodation
          </h1>
          <div className="md:p-4 p-2">
            <div className=" text-[#d1d8f3] text-lg cormorant font-bold drop-shadow-[0_2.5px_2.5px_rgba(57,31,20,1)]">
              Discover a hotel that defines
            </div>
            <div className=" text-[#d1d8f3] text-lg cormorant font-bold drop-shadow-[0_2.5px_2.5px_rgba(57,31,20,1)]">
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
            src={mainImage}
            className="lg:w-[60rem] h-full md:w-[40rem] w-[25rem]"
            alt="main image"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
