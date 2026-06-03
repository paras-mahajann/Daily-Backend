import { useContext } from "react";
import { SongContext } from "../song.context";

const useSong = () => {
  const context = useContext(SongContext);

  if (!context) {
    throw new Error("useSong must be used within a SongContextProvider");
  }

  return context;
};

export default useSong;