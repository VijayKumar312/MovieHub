import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import SignIn from "./pages/Login/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {

            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    return (
<BrowserRouter>
  <Routes>
    <Route path="/login" element={<SignIn />} />
    <Route
      path="/"
      element={
        <>
          <Header />
          <Home />
          <Footer />
        </>
      }
    />
    <Route
      path="/:mediaType/:id"
      element={
        <>
          <Header />
          <Details />
          <Footer />
        </>
      }
    />
    <Route
      path="/search/:query"
      element={
        <>
          <Header />
          <SearchResult />
          <Footer />
        </>
      }
    />
    <Route
      path="/explore/:mediaType"
      element={
        <>
          <Header />
          <Explore />
          <Footer />
        </>
      }
    />
    <Route
      path="*"
      element={
        <>
          <Header />
          <PageNotFound />
          <Footer />
        </>
      }
    />
  </Routes>
</BrowserRouter>

    );
}

export default App;
