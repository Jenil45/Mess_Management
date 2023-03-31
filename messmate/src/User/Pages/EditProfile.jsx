import React from "react";
import useAuth from "../../Auth/useAuth";
import hackerPic from "../../Svg/hacker.png";

const EditProfile = () => {
  const { auth } = useAuth();
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                     Left part : information                                    */
          /* ---------------------------------------------------------------------------------------------- */}
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center ">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {auth.userId}
              <br className="hidden lg:inline-block" />
              {auth.name}
            </h1>
            <span className="mb-4 leading-relaxed">
              User can see menu and subscription plan added by admin . Also user
              can give their attendance by using QR code generated on your
              dashboard. User can track their attendance record in Attendance
              section date by date.
            </span>
            <span className="my-2 bg-blue-300 p-2 w-[15rem] rounded shadow-xl leading-relaxed">
              Email : {auth.email}
            </span>
            <span className="my-2 leading-relaxed w-[15rem] bg-green-300 p-2 rounded shadow-xl ">
              Mobile No : {auth.mobileno}
            </span>
          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                       Right part : Image                                       */
          /* ---------------------------------------------------------------------------------------------- */}
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
            <img
              className="object-cover object-center rounded max-h-[60vh]"
              alt="hero"
              src={hackerPic}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
