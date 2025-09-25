import { io } from "socket.io-client";
// import { addRoomId, updateTournament } from "./tournamentSlice";
import { tournamentApi } from "../api/tournamentApi";
let socket = null;

export const socketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case "socket/connect": {
      if (!socket) {
        socket = io(import.meta.env.VITE_SOCKET_URL, {
          transports: ["websocket"],
          withCredentials: true,
        });

        socket.on("connect", () => {
          // console.log("✅ Connected:", socket.id);
        });
        socket.on("tournamentUpdated", (data) => {
          if (data.tournamentId) {
            console.log("Tournament updated, refreshing data..." + data.tournamentId);
            store.dispatch(
              tournamentApi.util.invalidateTags([
                { type: "TournamentId", id: data.tournamentId },
              ])
            );
          }
        });

        socket.on("disconnect", () => {
          console.log("❌ Disconnected");
        });
      }
      break;
    }

    default:
      break;
  }

  return next(action);
};
