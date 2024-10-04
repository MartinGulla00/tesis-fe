import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as paths from "./paths";
import ProtectedRouteAuth from "./ProtectedRoutes/ProtectedRouteAuth";
import ProtectedRouteUserType from "./ProtectedRoutes/ProtectedRouteUserType";
import NotAuthorized from "../pages/NotAuthorized";
import NotFound from "../pages/NotFound";
import Login from "../pages/Auth";
import Home from "../pages/Home";
import ManageUsersPage from "@/pages/Admin/ManageUsers";
import ManageRolesPage from "@/pages/Admin/ManageRoles";
import UserInfoPage from "@/pages/Admin/ManageUsers/UserInfoPage";
import ConditionalNavBar from "@/components/navbar/ConditionalNavBar";

function Router() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-screen h-screen">
        <ConditionalNavBar />
        <div className="flex-1 overflow-y-auto px-2 pb-2 md:px-6 md:pb-6">
          <Routes>
            <Route path="/" element={<ProtectedRouteAuth />}>
              <Route index element={<Home />} />
              {renderProtectedRoute(paths.DEF_USERS, ManageUsersPage, [
                "verUsuarios",
              ])}
              {renderProtectedRoute(paths.DEF_USER_INFO, UserInfoPage, [
                "verDetalleUsuario",
              ])}
              {renderProtectedRoute(paths.DEF_ROLES, ManageRolesPage, [
                "verRoles",
              ])}
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path={paths.NOT_AUTHORIZED} element={<NotAuthorized />} />
            <Route path={paths.LOGIN} element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const renderProtectedRoute = (
  path: string,
  Component: React.FC,
  permissions: string[]
) => (
  <Route element={<ProtectedRouteUserType permissions={permissions} />}>
    <Route path={path} element={<Component />} />
  </Route>
);

export default Router;
