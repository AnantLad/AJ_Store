import React from "react";
import MainBanner from "../components/MainBannar";
import { BottomBanner } from "../components/BottomBanner";
import Categories from "../components/Categories";
import { NewsLetter } from "../components/NewsLetter";
import Bestseller from "../components/Bestseller";


const Home = () => {
    return(
        <div className="mt-10">
           <MainBanner /> 
           <Categories/>
           <Bestseller/>
           <BottomBanner />
           <div className="w-fit mx-auto mt-10">
           <NewsLetter/>
           </div>
          
        </div>
    )
}

export default Home 