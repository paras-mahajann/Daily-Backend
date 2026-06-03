import { createContext, useState } from "react";
import { getSong as fetchSong } from "./service/song.api";

export const SongContext = createContext();
export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState({
        url: "https://ik.imagekit.io/2oxiybuer/cohort-2/moodify/songs/Dolby_Walya-320kbps_zapZvU60W.mp3",
        title: "Dolby Walya-320kbps",
        mood: "happy",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleGetSong({ mood }) {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchSong({ mood });
            setSong(data.song);
            return data.song;
        } catch (err) {
            setError(err?.response?.data?.message || "Unable to fetch song");
            return null;
        } finally {
            setLoading(false);
        }
    }

    return (
        <SongContext.Provider value={{ loading, song, error, handleGetSong }}>
            {children}
        </SongContext.Provider>
    );
};