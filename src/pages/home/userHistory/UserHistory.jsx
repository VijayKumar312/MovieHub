import React, { useEffect, useState } from "react";

import axios from "axios";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MovieCarousel from "./MovieCarousel";

const getApiData= async (url, params)=>{
    const BASE_URL = "https://api.themoviedb.org/3";
    const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

    const headers = {
        Authorization: "bearer " + TMDB_TOKEN,
    };

    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const UserHistory = ({videos}) => {
   const [data, setData] = useState(null);
    useEffect(()=>{
        const fetchData=()=>{
            
          const videoData = [];
        
            const promises = videos.map((id) => {
            return getApiData(`/movie/${id}`);
            });

            Promise.all(promises)
            .then((results) => {
                results.forEach((video) => {
                videoData.push(video);
                });
            })
            .catch((error) => {
                console.log(error)
            });
            setData(videoData)
        }
        fetchData()
    },[])

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">History</span>
            </ContentWrapper>
            <MovieCarousel data={data} />
        </div>
    );
};

export default UserHistory;
