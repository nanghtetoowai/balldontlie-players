import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialiseSelector, slice } from "../utils/Utils";
import { API_URL } from "../variables/constants";

const initialState = {
  isPending: false,
  hasError: false,
  data: {},
};

export const getPlayers = createAsyncThunk("player/getAll", async (params) => {
  const {
    data,
    headers,
  } = await axios.get(`${API_URL}/players`, {
    params: {
      page: params?.page,
      size: params?.size,
      filter: params?.filter,
    },
  });
  return { data, headers };
});

export const getOnePlayer = createAsyncThunk(
  "player/getOne",
  async (params) => {
    const response = await axios.get(`/api/players/${params.id}`);
    return response.data;
  }
);

export const createPlayer = createAsyncThunk("player/create", async (value) => {
  const response = await axios.post("/api/players", value?.data);

  return response.data;
});

export const updatePlayer = createAsyncThunk("player/update", async (value) => {
  const response = await axios.put(`/api/players/${value?.slug}`, value?.data);

  return response.data;
});

export const deletePlayer = createAsyncThunk("player/delete", async (slug) => {
  const response = await axios.delete(`/api/palyers/${slug}`);

  return response.data;
});

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: {
    ...slice(getPlayers, "id"),
    ...slice(getOnePlayer, "slug"),
    ...slice(createPlayer, "slug"),
    ...slice(updatePlayer, "slug"),
  },
});

const playerReducer = playerSlice.reducer;

export const playerSelector = ({ players }) => initialiseSelector(players);

export default playerReducer;
