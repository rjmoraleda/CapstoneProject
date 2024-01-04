import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Main from "./container/Main";

const HomePage = () => {
   return (
      <MainLayout>
         <Hero />
         <Main />
      </MainLayout>
   );
};

export default HomePage;
