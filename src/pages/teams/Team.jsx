import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import qs from "qs";
import TeamTable from "./components/TeamTable";
import { getTeams } from "../../services/teamSlice";
import AddButton from "../../components/button/AddButton";
import TeamCreateModal from "./components/TeamCreateModal";

const Team = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const {
    filter,
    page = 0,
    size = 10,
  } = qs.parse(search, {
    ignoreQueryPrefix: true,
    skipNulls: true,
  });

  useEffect(() => {
    dispatch(getTeams({ filter, page, size }));
  }, [dispatch, filter, page, size]);

  return (
    <AppLayout>
      <div className="d-flex justify-content-end mb-3">
        <AddButton type="primary" onClick={() => setIsOpenCreateModal(true)} />
      </div>
      <TeamTable />
      <TeamCreateModal
        title="Team Create"
        visible={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
      />
    </AppLayout>
  );
};

export default Team;
