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
import { loadUser } from "@/store/slices/usersSlice";

const UpdateRoom = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      // console.log(router.query);
      return;
    }
    const { query } = router;
    dispatch(fetchRoom({ query }));
  }, [router, dispatch]);
  const { room, isLoading, error } = useSelector((state) => state.singleRoom);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (room.images) {
      setImages(room.images);
      setImagesPreview(room.images);
    }
  }, [room]);

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

    console.log("imagesPreview :", roomData);

    dispatch(updateRoom({ roomData, id })).then((result) => {
      if (!result.error) {
        router.push("/admin/rooms");
      } else {
        console.log(result);
      }
    });
  };

  const initialValues = {
    name: room.name,
    pricePerNight: room.pricePerNight,
    description: room.description,
    address: room.address,
    category: room.category,
    guestCapacity: room.guestCapacity,
    numOfBeds: room.numOfBeds,
    internet: room.internet,
    breakfast: room.breakfast,
    airConditioned: room.airConditioned,
    petsAllowed: room.petsAllowed,
    roomCleaning: room.roomCleaning,
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

                {imagesPreview?.map((img) => (
                  <Image
                    src={img.url || img}
                    key={img.public_id || img}
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

export default UpdateRoom;
