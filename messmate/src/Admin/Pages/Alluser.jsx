import React from "react";

function Alluser() {
  return (
    <div className="w-full mt-16 max-w-full min-h-screen">
      <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="table-responsive">
          <table
            className="table table-flush text-slate-500"
            id="all-user-datatable"
          >
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Office</th>
                <th>Age</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-normal leading-normal text-sm">
                  Tiger Nixon
                </td>
                <td className="font-normal leading-normal text-sm">
                  System Architect
                </td>
                <td className="font-normal leading-normal text-sm">
                  Edinburgh
                </td>
                <td className="font-normal leading-normal text-sm">61</td>
                <td className="font-normal leading-normal text-sm">$320,800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Alluser;
