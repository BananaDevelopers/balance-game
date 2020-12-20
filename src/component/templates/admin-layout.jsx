import React from "react";
import { useHistory } from "react-router-dom";

import { authService } from "fbase";
import AdminMenu from "components/admin/AdminMenu";

const AdminLayout = ({ title, children, mainStyle }) => {
  const history = useHistory();

  const handlingLogout = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <h1>밸런스게임: 관리자 페이지</h1>
      <p onClick={handlingLogout}>로그아웃</p>
      <div>
        <AdminMenu />
        <br />
        <h2>== {title} ==</h2>
        <div>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
