import { Button, message, Space, Table } from "antd";
import React, { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlayer, playerSelector } from "../../../services/playerSlice";
import _ from "lodash";
import Pagination from "../../../components/pagination/Pagination";
import DeleteModal from "../../../components/modal/DeleteModal";

const PlayerTable = () => {
  const { data: players, paginations } = useSelector(playerSelector);
  const dispatch = useDispatch();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const columns = [
    {
      title: "Full Name",
      dataIndex: "firstName",
      key: "id",
      render: (text, record) => (
        <p>{`${record?.firstName} ${record?.lastName}`}</p>
      ),
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "id",
      render: (text, record) => <p>{record?.team?.full_name}</p>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "id",
    },
    {
      title: "Height",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <p>
          {record?.heightFeet ? `${record?.heightFeet}'` : "-"} &nbsp;
          <span>{record?.heightInches && `${record?.heightInches}"`}</span>
        </p>
      ),
    },
    {
      title: "Weight",
      dataIndex: "weightPounds",
      key: "id",
      render: (text, record) => (
        <p>{record?.weightPounds ? `${record?.weightPounds}lb` : "-"}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" className="text-blue">
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
      _.map(players, (data) => ({
        key: data?.id,
        id: data?.id,
        firstName: data?.first_name,
        lastName: data?.last_name,
        position: data?.position,
        weightPounds: data?.weight_pounds,
        heightFeet: data?.height_feet,
        heightInches: data?.height_inches,
        team: data?.team,
      })),
    [players]
  );
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: window.innerHeight - 270 }}
        pagination={false}
      />
      {!_.isEmpty(paginations) && paginations?.totalElements !== 0 && (
        <Pagination total={paginations.totalElements} />
      )}
      <DeleteModal
        visible={isOpenDeleteModal}
        onOk={() => {
          dispatch(deletePlayer(selectedData.id))
            .then((res) => {
              if (_.endsWith(res.type, "fulfilled")) {
                message.success("Player is deleted");
              }
            })
            .then(() => setIsOpenDeleteModal(false));
        }}
        onCancel={() => setIsOpenDeleteModal(false)}
      />
    </>
  );
};

export default PlayerTable;
