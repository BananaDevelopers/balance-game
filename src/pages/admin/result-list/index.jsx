import React from "react";
import AdminLayout from "component/templates/admin-layout";
import ResultList from "components/admin/result-list/ResultList";

const ResultListPage = () => {
  return (
    <AdminLayout title="게임결과">
      <ResultList />
    </AdminLayout>
  );
};

export default ResultListPage;
