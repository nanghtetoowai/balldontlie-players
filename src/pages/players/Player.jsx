import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import { getPlayers } from "../../services/playerSlice";
import qs from "qs";
import PlayerList from "./components/PalyerList";

const Player = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  const {
    filter,
    page = 0,
    size = 10,
  } = qs.parse(search, {
    ignoreQueryPrefix: true,
    skipNulls: true,
  });

  useEffect(() => {
    dispatch(getPlayers({ filter, page, size }));
  }, [dispatch, filter, page, size]);

  return (
    <AppLayout>
      {/* <PlayerTable /> */}
      <PlayerList />
    </AppLayout>
  );
};

export default Player;
