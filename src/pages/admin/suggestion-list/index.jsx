import { render } from "@testing-library/react";
import AdminLayout from "component/templates/admin-layout";
import SuggestionList from "components/admin/suggestion-list/SuggestionList";
import React from "react";

const SuggestionListPage = () => {
  return (
    <AdminLayout title="제안 목록">
      <SuggestionList />
    </AdminLayout>
  );
};

export default SuggestionListPage;
