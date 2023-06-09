import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useRouter } from "next/router";
import { deleteUser, getAllAdminUsers } from "@/store/slices/adminUsersSlice";

const AllUsers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getAllAdminUsers());
    if (error) {
      toast.error(error);
      // dispatch(clearErrors)
    }
  }, [dispatch]);
  const { isLoading, error, users } = useSelector((state) => state.adminUsers);
  console.log(users, "hel");

  return (
    <div className="bg-[#fff7f3] w-full p-8">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr>
                <th>{item?._id}</th>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.role}</td>
                <td>
                  <div className="flex flex-row items-center ">
                    <div className="px-1">
                      <FaFileInvoiceDollar
                        onClick={() => {
                          //   downloadInvoice(item);
                        }}
                        color="green"
                        size={20}
                      />
                    </div>
                    <div className="mx-3 p-2 flex flex-row items-center bg-red-700 rounded-lg">
                      <div className="text-white">
                        <Link href={`/admin/users/${item._id}`}>
                          Edit Details & Roles{" "}
                        </Link>
                      </div>
                      <AiOutlineDoubleRight color="white" size={20} />
                    </div>
                    <div className="mx-3 p-2 flex flex-row items-center bg-red-700 rounded-lg">
                      <div className="text-white">
                        <button
                          onClick={() => {
                            // console.log(item._id);
                            dispatch(deleteUser({ id: item?._id })).then(
                              (result) => {
                                if (!result.error) {
                                  router.push("/admin/users");
                                } else {
                                  console.log(result);
                                }
                              }
                            );
                          }}
                        >
                          Delete User{" "}
                        </button>
                      </div>
                      <AiOutlineDoubleRight color="white" size={20} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
