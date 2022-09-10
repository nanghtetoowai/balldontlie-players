import { Button, message, Space, Table } from "antd";
import React, { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Pagination from "../../../components/pagination/Pagination";
import DeleteModal from "../../../components/modal/DeleteModal";
import { deleteTeam, teamSelector } from "../../../services/teamSlice";
import TeamUpdateModal from "./TeamUpdateModal";

const TeamTable = () => {
  const { data: teams, paginations } = useSelector(teamSelector);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState();

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "id",
      render: (text, record) => <p>{record?.fullName}</p>,
    },
    {
      title: "Short Name",
      dataIndex: "name",
      key: "id",
      render: (text, record) => <p>{record?.name}</p>,
    },
    {
      title: "Division",
      dataIndex: "division",
      key: "id",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "id",
    },
    {
      title: "Conference",
      dataIndex: "conference",
      key: "id",
    },
    {
      title: "Abbreviation",
      dataIndex: "abbreviation",
      key: "id",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            className="text-blue"
            onClick={() => {
              setSelectedData(record);
              setIsOpenUpdateModal(true);
            }}
          >
            Update
          </Button>
          <Button
            type="text"
            danger
            onClick={() => {
              setIsOpenDeleteModal(true);
              setSelectedData(record);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = useMemo(
    () =>
      _.map(teams, (data) => ({
        key: data?.id,
        id: data?.id,
        abbreviation: data?.abbreviation,
        city: data?.city,
        conference: data?.conference,
        division: data?.division,
        fullName: data?.full_name,
        name: data?.name,
      })),
    [teams]
  );
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: window.innerHeight - 290 }}
        pagination={false}
      />
      {!_.isEmpty(paginations) && paginations?.totalElements !== 0 && (
        <Pagination total={paginations.totalElements} />
      )}
      <TeamUpdateModal
        title="Update Team"
        visible={isOpenUpdateModal}
        initData={selectedData}
        onClose={() => setIsOpenUpdateModal(false)}
      />
      <DeleteModal
        visible={isOpenDeleteModal}
        onOk={() => {
          dispatch(deleteTeam(selectedData.id))
            .then((res) => {
              if (_.endsWith(res.type, "fulfilled")) {
                message.success("Team is deleted");
              }
            })
            .then(() => setIsOpenDeleteModal(false));
        }}
        onCancel={() => setIsOpenDeleteModal(false)}
      />
    </>
  );
};

export default TeamTable;
