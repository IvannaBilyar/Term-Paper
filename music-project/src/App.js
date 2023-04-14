import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/home";
import Layout from "./components/layout";
import ProtectedRoute from "./components/protected-route";
import BottomAudio from "./components/bottom-audio";
import Singer from "./pages/singer";
import Auth from "./pages/auth";

import Library from "./pages/library";
import LibraryDetail from "./pages/library-detail";
import { useSong } from "./utils/song-context";
import AddToPlaylist from "./pages/add-to-playlist";
import SearchOverlay from "./pages/search-overlay/";
import NewPlaylist from "./pages/new-playlist";

function App() {
  const { selectedSong } = useSong();

  return (
    <>
      <ToastContainer />
      <div style={{ paddingBottom: selectedSong ? 160 : 0 }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="singer/:singerId" element={<Singer />} />

            <Route
              path="library"
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              }
            />
            <Route
              path="library/:id"
              element={
                <ProtectedRoute>
                  <LibraryDetail />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to={"/"} />} />
          </Route>
        </Routes>
      </div>
      <BottomAudio />
      <Auth />
      <AddToPlaylist />
      <SearchOverlay />
      <NewPlaylist />
    </>
  );
}

export default App;
