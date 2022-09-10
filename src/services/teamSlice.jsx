import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialiseSelector, slice } from "../utils/Utils";
import { API_URL } from "../variables/constants";

const initialState = {
  isPending: false,
  hasError: false,
  data: {},
};

export const getTeams = createAsyncThunk("team/getAll", async (params) => {
  console.log("parasms", params);

  const { data, headers } = await axios.get(`${API_URL}/teams`, {
    params: {
      page: params?.page,
      per_page: params?.size,
    },
  });
  return { data, headers };
});

export const getOneTeam = createAsyncThunk("teams/getOne", async (params) => {
  const response = await axios.get(`${API_URL}/players/${params.id}`);
  return response.data;
});

export const createTeam = createAsyncThunk("team/create", async (value) => {
  const response = await axios.post(`${API_URL}/teams`, value?.data);
  return response.data;
});

export const updateTeam = createAsyncThunk("teams/update", async (value) => {
  const response = await axios.put(
    `${API_URL}/teams/${value?.id}`,
    value?.data
  );
  return response.data;
});

export const deleteTeam = createAsyncThunk("team/delete", async (slug) => {
  const response = await axios.delete(`${API_URL}/teams/${slug}`);

  return response.data;
});

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: {
    ...slice(getTeams, "id"),
    ...slice(getOneTeam, "slug"),
    ...slice(createTeam, "slug"),
    ...slice(updateTeam, "slug"),
  },
});

const teamReducer = teamSlice.reducer;

export const teamSelector = ({ teams }) => initialiseSelector(teams);

export default teamReducer;
