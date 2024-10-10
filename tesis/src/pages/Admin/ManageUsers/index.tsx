import React from "react";
import Heading1 from "@/components/headings/Heading1";
import UserListTable from "./UserListTable";
import CreateUserCard from "./CreateUserCard";
import { useUsers } from "@/hooks/admin/useUsers";
import Loading from "@/components/Loading";

type Props = {};

const ManageUsersPage: React.FC = ({}: Props) => {
  const { users, isLoading, refetch } = useUsers();

  return (
    <div className="flex flex-col pb-6 h-full">
      <div className="flex justify-between mt-4 mb-6">
        <div className="flex items-center space-x-8">
          <Heading1 text="Usuarios del sistema" />
        </div>
        <div className="flex space-x-2"></div>
      </div>
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
        <CreateUserCard onStatusUpdate={refetch} />
        {isLoading && <Loading />}
        {users && (
          <>
            <div className="flex flex-col space-y-4 lg:space-y-6 lg:w-3/4">
              <UserListTable users={users} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUsersPage;
