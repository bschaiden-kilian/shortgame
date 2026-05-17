import { useEffect, useState } from "react"
import { type IServiceContext, ServiceContext } from "./common/context/ServiceContext"
import Play from "./screens/play"
import { GameService } from "./features/game/service/game_service";
import { GameSessionService } from "./features/game_session/service/game_session_service";
import { UserService } from "./features/user/service/user_service";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./common/components/Layout";
import GameSelection from "./screens/game_selection";
import PlayerSelection from "./screens/player_selection";
import Leaderboard from "./screens/leaderboard";
import GameLayout from "./common/components/GameLayout";
import History from "./screens/history";

function App() {
  const [serviceContext, setServiceContext] = useState<IServiceContext | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setServiceContext({
      gameService: new GameService(),
      gameSessionService: new GameSessionService(),
      userService: new UserService()
    })
  }, [])

  const validateLoad = (): boolean => {
    return serviceContext?.gameSessionService.getGameSessions() !== undefined
      && serviceContext?.gameService.getGames() !== undefined
      && serviceContext?.userService.getUsers() !== undefined;
  };

  useEffect(() => {
    const _ = () => {
      if (serviceContext && validateLoad()) {
        setLoaded(true);
      }
    }

    if (loaded == false)
      setTimeout(_, 500);

  }, [serviceContext]);

  if (loaded === false) {
    return <div>Loading</div>
  }

  return (
    <ServiceContext.Provider value={serviceContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GameSelection></GameSelection>}></Route>
            <Route path="/:gameId" element={<GameLayout></GameLayout>}>
              <Route path="player-selection" element={<PlayerSelection></PlayerSelection>}></Route>
              <Route path="play/:sessionId" element={<Play></Play>}></Route>
              <Route path="leaderboard/:sessionId" element={<Leaderboard />}></Route>
            </Route>
            <Route path="/history" element={<History></History>}></Route>
            <Route path="/history/:sessionId" element={<Leaderboard></Leaderboard>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ServiceContext.Provider>
  )
}

export default App