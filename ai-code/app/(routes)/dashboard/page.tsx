import React from "react";
import ImageUpload from "./_components/ImageUpload";

function Dashboard() {
  return (
    <div className="md:px-20 lg:px-20 xl:px-40">
      <h2 className="font-bold text-3xl text-blue-800">
        THANX FOR THE UX DESIGNER
      </h2>
      <ImageUpload />
    </div>
  );
}

export default Dashboard;
