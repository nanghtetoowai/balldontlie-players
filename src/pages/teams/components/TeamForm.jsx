import React, { useMemo } from "react";
import { Form, Input, Select } from "antd";
import SubmitButton from "../../../components/button/SubmitButton";
import CancelButton from "../../../components/button/CancelButton";
import { useSelector } from "react-redux";
import { playerSelector } from "../../../services/playerSlice";
import _ from "lodash";

const TeamForm = ({
  name,
  handleSubmit,
  isReady,
  resetForm,
  onClose,
  setFieldValue,
  values,
}) => {
  const { data: players } = useSelector(playerSelector);

  const playerOptions = useMemo(
    () =>
      _.map(players, (p) => ({
        label: `${p?.first_name} ${p?.last_name}`,
        value: p?.id,
      })),
    [players]
  );
  const initialPlayers = _.map(
    _.filter(players, (v) => _.isEqual(values?.id, v?.team?.id)),
    (v) => ({
      label: `${v?.first_name} ${v?.last_name}`,
      value: v?.id,
    })
  );
  const cityOptions = [
    { label: "Atlanta", value: "Atlanta" },
    { label: "Boston", value: "Boston" },
    { label: "Brooklyn", value: "Brooklyn" },
    { label: "Charlotte", value: "Charlotte" },
    { label: "Chicago", value: "Chicago" },
    { label: "Cleveland", value: "Cleveland" },
    { label: "Dallas", value: "Dallas" },
    { label: "Denver", value: "Denver" },
  ];

  const divisionOptions = [
    { label: "Atlantic", value: "Atlantic" },
    { label: "Southeast", value: "Southeast" },
    { label: "Central", value: "Central" },
    { label: "Southwest", value: "Southwest" },
    { label: "Northwest", value: "Northwest" },
    { label: "Pacific", value: "Pacific" },
  ];
  return (
    <Form name={name} onFinish={handleSubmit}>
      <label>Name</label>
      <Input
        name="name"
        id="name"
        placeholder="Enter Name"
        type="text"
        defaultValue={values.name}
        className="mb-3"
        onChange={(e) => setFieldValue("name", e.target.value)}
      />
      <label>Choose Players</label>
      <Select
        name="players"
        showSearch
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select players"
        maxTagCount={3}
        options={playerOptions}
        onSearch
        defaultValue={initialPlayers || []}
        onChange={(e) => {
          setFieldValue("players", [...values.players, e.target.value]);
        }}
        className="mb-3"
      />

      <label>Choose City</label>
      <Select
        name="city"
        allowClear
        showSearch
        style={{ width: "100%" }}
        placeholder="Please select city"
        options={cityOptions}
        onSearch
        defaultValue={values.city}
        onChange={(e) => {
          setFieldValue("city", e);
        }}
        className="mb-3"
      />

      <label>Choose Division</label>
      <Select
        name="division"
        showSearch
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select division"
        options={divisionOptions}
        onSearch
        defaultValue={values.division}
        onChange={(e) => {
          setFieldValue("division", e);
        }}
        className="mb-3"
      />

      <div className="d-flex justify-content-end mt-2">
        <CancelButton
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="mr-2"
        />
        <SubmitButton color="teal" disabled={!isReady} />
      </div>
    </Form>
  );
};

export default TeamForm;
