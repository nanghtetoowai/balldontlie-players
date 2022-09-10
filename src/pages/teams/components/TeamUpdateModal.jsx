import React, { useEffect } from "react";
import { Formik } from "formik";
import { message, Modal } from "antd";
import { updateTeam } from "../../../services/teamSlice";
import { useDispatch } from "react-redux";
import _ from "lodash";
import TeamForm from "./TeamForm";
import { getPlayers } from "../../../services/playerSlice";
import { useLocation } from "react-router-dom";
import qs from "qs";

const TeamUpdateModal = ({ title, visible, onClose, initData }) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  console.log("initData", initData);

  const {
    filter,
    page = 0,
    size = 10,
  } = qs.parse(search, {
    ignoreQueryPrefix: true,
    skipNulls: true,
  });

  let initialValues;
  if (initData) {
    initialValues = {
      id: initData.key || "",
      name: initData.name || "",
      players: _.map(initData?.players, (p) => p) || [],
      city: initData.city || "",
      division: initData?.division || "",
    };
  }
  const onFormSubmit = (data, { resetForm, setSubmitting }) => {
    dispatch(updateTeam({ id: data?.id, data })).then((response) => {
      if (_.endsWith(response.type, "fulfilled")) {
        message.success("Team is updated");
        resetForm();
        onClose();
      } else if (_.endsWith(response.type, "rejected")) {
        message.error(response?.error?.message);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    });
  };

  useEffect(() => {
    dispatch(getPlayers({ filter, page, size }));
  }, [dispatch, filter, page, size]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validateOnMount
      >
        {({
          handleSubmit,
          resetForm,
          isSubmitting,
          isValid,
          setTouched,
          values,
          setFieldValue,
        }) => (
          <TeamForm
            name="teamCreateForm"
            handleSubmit={handleSubmit}
            resetForm={() => {
              resetForm();
              setTouched(false);
            }}
            values={values}
            setFieldValue={setFieldValue}
            onClose={onClose}
            isReady={!isSubmitting && isValid}
          />
        )}
      </Formik>
    </Modal>
  );
};

export default TeamUpdateModal;
