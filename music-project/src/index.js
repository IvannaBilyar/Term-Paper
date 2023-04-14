import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { SongProvider } from "./utils/song-context";
import { AuthProvider } from "./utils/auth-context";
import { SearchProvider } from "./utils/search-context";
import { AddToPlaylistProvider } from "./utils/add-to-playlist-context";
import { CreatePlaylistProvider } from "./utils/create-playlist-context";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <SongProvider>
        <AddToPlaylistProvider>
          <CreatePlaylistProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CreatePlaylistProvider>
        </AddToPlaylistProvider>
      </SongProvider>
    </SearchProvider>
  </AuthProvider>
);

reportWebVitals();
