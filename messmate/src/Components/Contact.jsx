import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [emailDone, setEmailDone] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_id",
        "template_id",
        form.current,
        "public_key"
      )
      .then(
        (result) => {
          console.log(result.text);
          setEmailDone(true);
          setName("");
          setEmail("");
          setQuery("");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <section className="text-black m-auto bg-slate-200 body-font relative">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className=" text-5xl font-medium title-font mb-4 text-blue-800 ">
              Contact Us
            </h1>
            <span>{emailDone ? "Your email has been sent" : ""}</span>
            <h2></h2>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <form ref={form}>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      for="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="min-w-[50vw] bg-gray-200 bg-opacity-50 rounded border-[0.2px] border-black focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      for="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="from_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="min-w-[50vw] bg-gray-200 bg-opacity-50 rounded border-[0.2px] border-black focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      for="message"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full h-32 bg-gray-200 bg-opacity-50 rounded border-[0.2px] border-black focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <center>
                      <button
                        type="button"
                        class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none  font-medium rounded-lg text-lg mt-4 px-5 py-2.5 text-center "
                        onClick={sendEmail}
                      >
                        Submit
                      </button>
                    </center>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
