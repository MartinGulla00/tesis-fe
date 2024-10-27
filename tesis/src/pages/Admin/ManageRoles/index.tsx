import Heading1 from "@/components/headings/Heading1";
import CreateRoleCard from "./CreateRoleCard";
import RoleListTable from "./RoleListTable";
import Loading from "@/components/Loading";
import { useRoles } from "@/hooks/admin/useRoles";

type Props = {};

function ManageRolesPage({}: Props) {
  const { roles, isLoading, error, refetch } = useRoles();

  return (
    <div className="flex flex-col pb-6 h-full">
      <div className="flex justify-between mt-4 mb-6">
        <div className="flex items-center space-x-8">
          <Heading1 text="Roles y permisos" />
        </div>
        <div className="flex space-x-2"></div>
      </div>
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
        <CreateRoleCard refetch={refetch} />
        <div className="flex flex-col space-y-4 lg:space-y-6 lg:w-3/4">
          {isLoading && <Loading />}
          {error && <p>Error: {(error as Error).message}</p>}
          {roles && <RoleListTable refetch={refetch} roles={roles} />}
        </div>
      </div>
    </div>
  );
}

export default ManageRolesPage;
