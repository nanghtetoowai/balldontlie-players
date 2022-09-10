import React, { useEffect } from "react";
import { message, Modal } from "antd";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import _ from "lodash";
import TeamForm from "./TeamForm";
import { createTeam } from "../../../services/teamSlice";
import { getPlayers } from "../../../services/playerSlice";
import { useLocation } from "react-router-dom";
import qs from "qs";

const initialValues = {
  name: "",
  city: "",
  region: "",
  players: [],
};

function TeamCreateModal({ title, visible, onClose }) {
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

  const onFormSubmit = (data, { resetForm, setSubmitting }) => {
    dispatch(createTeam({ data })).then((response) => {
      if (_.endsWith(response.type, "fulfilled")) {
        message.success("Team is created");
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
          setFieldValue,
          values,
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
}

export default TeamCreateModal;
