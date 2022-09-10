import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Skeleton } from "antd";
import Login from "./login/Login";
import Player from "./players/Player";
import Team from "./teams/Team";

function App() {
  return (
    <Router>
      <Suspense fallback={<Skeleton active />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/players" element={<Player />} />
          <Route path="/teams" element={<Team />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
