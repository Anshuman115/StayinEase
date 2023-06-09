import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postNewRoom, updateRoom } from "@/store/slices/adminRoomsSlice";
import Image from "next/image";
import { fetchRoom } from "@/store/slices/singleRoomsSlice";
import {
  getUserDetails,
  updateUserDetails,
} from "@/store/slices/adminUsersSlice";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      // console.log(router.query);
      return;
    }
    const { query } = router;
    dispatch(getUserDetails(query));
  }, []);
  const { userDetails, isLoading, error } = useSelector(
    (state) => state.adminUsers
  );

  const submitHandler = (values) => {
    const newUserDetails = values;

    console.log("new user data :", newUserDetails);

    dispatch(updateUserDetails({ id, newUserDetails })).then((result) => {
      if (!result.error) {
        router.push("/admin/users");
      } else {
        console.log(result);
      }
    });
  };

  const initialValues = {
    name: userDetails?.name,
    email: userDetails?.email,
    role: userDetails?.role,
  };

  return (
    <div className="bg-[#fff7f3] w-full p-8">
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={submitHandler}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col w-[30%] p-2 text-black">
              <div className="flex justify-between p-4">
                <div>Name</div>
                <Field type="text" name="name" />
              </div>
              <div className="flex justify-between p-4">
                <div>Email</div>
                <Field type="text" name="email" />
              </div>
              <div className="flex justify-between p-4">
                <div>role</div>
                <Field type="text" name="role" />
              </div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateUser;
