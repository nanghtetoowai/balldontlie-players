import { UserOutlined } from "@ant-design/icons";
import { Button, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../variables/constants";

const PlayerList = () => {
  const [list, setList] = useState([]);
  const [size, setSize] = useState(10);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/players?per_page=${size}`)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res.data);
      });
  }, [size]);

  const loadMore = (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
        position: "fixed",
        bottom: "10px",
        left: "45%",
      }}
    >
      <Button
        type="primary"
        onClick={() => {
          setSize(size + 10);
          setInitLoading(true);
        }}
      >
        loading more
      </Button>
    </div>
  );

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      style={{ height: window.innerHeight - 150, overflowY: "scroll" }}
      renderItem={(item) => (
        <List.Item
        // actions={[
        //   <>
        //     <Button type="text" className="text-blue">
        //       Update
        //     </Button>
        //     <Button
        //       type="text"
        //       danger
        //       onClick={() => {
        //         // setIsOpenDeleteModal(true);
        //         // setSelectedData(record);
        //       }}
        //     >
        //       Delete
        //     </Button>
        //   </>,
        // ]}
        >
          <Skeleton avatar title={false} active loading={false}>
            <List.Item.Meta
              avatar={<UserOutlined />}
              title={`${item?.first_name} ${item?.last_name}`}
              description={`Player of ${item?.team?.name} (${
                item?.team?.full_name
              }) ${item.position ? `, Position${item.position}` : ""}`}
            />
            <div style={{ marginRight: 20 }}>{` ${
              item?.height_feet
                ? `${item?.height_feet}' ${item?.height_inches}" tall &`
                : "-"
            }  ${
              item?.weight_pounds ? `weight ${item.weight_pounds} lb` : " "
            }`}</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default PlayerList;
