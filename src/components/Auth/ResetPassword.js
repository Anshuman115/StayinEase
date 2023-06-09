import { resetPassword } from "@/store/slices/resetPasswordSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const NewPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { error, isLoading, success } = useSelector(
    (state) => state.resetPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      // dispatch(clearErrors())
    }
    if (success) {
      router.push("/login");
    }
  }, [dispatch, success, error, router]);

  const submitHandler = (e) => {
    e.preventDefault();

    const passwords = {
      password,
      confirmPassword,
    };

    // console.log("email", userData);
    // console.log("router token", router.query.token);
    const token = router.query.token;
    dispatch(resetPassword({ token, passwords }));
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <div className="bg-[#fff7f3]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label className="sr-only">Password</label>
              <div className="relative">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <label className="sr-only">Confirm Password</label>
              <div className="relative">
                <input
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                onClick={submitHandler}
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
