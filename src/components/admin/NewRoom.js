import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postNewRoom } from "@/store/slices/adminRoomsSlice";
import Image from "next/image";

const NewRoom = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (values) => {
    const roomData = values;
    // console.log("roomData", roomData);
    roomData.images = images;

    if (images.length === 0) return toast.error("Please upload images");

    dispatch(postNewRoom({ roomData })).then((result) => {
      if (!result.error) {
        router.push("/admin/rooms");
      } else {
        console.log(result);
      }
    });
  };

  const initialValues = {
    name: "Anshu",
    price: 0,
    description: "Anshu",
    address: "Anshu",
    category: "King",
    guestCapacity: 1,
    numOfBeds: 1,
    internet: false,
    breakfast: false,
    airConditioned: false,
    petsAllowed: false,
    roomCleaning: false,
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
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col w-[30%] p-2 text-black">
              <div className="flex justify-between p-4">
                <div>Name</div>
                <Field type="text" name="name" />
              </div>
              <div className="flex justify-between p-4">
                <div>pricePerNight</div>
                <Field type="number" name="pricePerNight" />
              </div>
              <div className="flex justify-between p-4">
                <div>description</div>
                <Field type="text" name="description" />
              </div>
              <div className="flex justify-between p-4">
                <div>address</div>
                <Field type="text" name="address" />
              </div>
              <div className="flex justify-between p-4">
                <div>category</div>
                <Field type="text" name="category" />
              </div>
              <div className="flex justify-between p-4">
                <div>guestCapacity</div>
                <Field type="number" name="guestCapacity" />
              </div>
              <div className="flex justify-between p-4">
                <div>numOfBeds</div>
                <Field type="number" name="numOfBeds" />
              </div>
              <div className="flex justify-between p-4">
                <div>internet</div>
                <Field type="checkbox" name="internet" />
              </div>
              <div className="flex justify-between p-4">
                <div>breakfast</div>
                <Field type="checkbox" name="breakfast" />
              </div>
              <div className="flex justify-between p-4">
                <div>airConditioned</div>
                <Field type="checkbox" name="airConditioned" />
              </div>
              <div className="flex justify-between p-4">
                <div>petsAllowed</div>
                <Field type="checkbox" name="petsAllowed" />
              </div>
              <div className="flex justify-between p-4">
                <div>roomCleaning</div>
                <Field type="checkbox" name="roomCleaning" />
              </div>
              <div className="">
                <label>Images</label>
                <div className="">
                  <input
                    type="file"
                    name="images"
                    className=""
                    onChange={onChange}
                    multiple
                  />
                  <label className="">Choose Images</label>
                </div>

                {imagesPreview.map((img) => (
                  <Image
                    src={img}
                    key={img}
                    alt="Images Preview"
                    className="mt-3 mr-2"
                    width={50}
                    height={50}
                  />
                ))}
              </div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewRoom;
