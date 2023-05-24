import React, { useEffect, useState } from "react";
import { query, where, getDocs, collection } from "firebase/firestore";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { db } from "../../firebase";

const Home = () => {
    useEffect(()=>{
        getWatchHistory()
    },[])

    const getWatchHistory = async () => {
        try {
          const auth = getAuth(app)
          const user = auth.currentUser
          const {uid} = user
          const userId = uid
          const historyRef = collection(db, "watchHistory");

          const userHistoryQuery = query(historyRef, where("userId", "==", userId));
          const querySnapshot = await getDocs(userHistoryQuery);
      
          const watchHistory = [];
          querySnapshot.forEach((doc) => {
            const historyData = doc.data();
            watchHistory.push(historyData);
          });
          console.log(watchHistory)
        
        } catch (error) {
          console.error("Error retrieving watch history:", error);
        }
      };

    return (
        <div className="homePage">
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
};

export default Home;
