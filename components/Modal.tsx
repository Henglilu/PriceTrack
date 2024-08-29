"use client";

import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/actions";

interface Props {
    productId: string
}

const Modal = ({productId}: Props) => {
  let [isOpen, setIsOpen] = useState(true);
  const [isSubbmiting, setIsSubbmiting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubbmiting(true);

    await addUserEmailToProduct(productId, email)

    setIsSubbmiting(false);
    setEmail("");
    closeModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Fragment>
      <button type="button" className="btn" onClick={openModal}>
        Track
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="dialog-content">
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <div className="p-3 border border-gray-200 rounded-10">
                        <Image
                          src="/assets/icons/logo.svg"
                          alt="logo"
                          width={28}
                          height={28}
                        />
                      </div>
                      <Image
                        src="/assets/icons/x-close.svg"
                        alt="close"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        onClick={closeModal}
                      />
                    </div>
                    <h4 className="dialog-head_text">
                      Stay updated with product pricing alerts right in your
                      inbox!
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Never miss a bargain again with our timely alerts!
                    </p>
                    <form
                      className="flex flex-col mt-5"
                      onSubmit={handleSubmit}
                    >
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="dialog-input_container">
                        <Image
                          src="/assets/icons/mail.svg"
                          alt="mail"
                          width={18}
                          height={18}
                        />
                        <input
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          id="email"
                          placeholder="Enter your email address"
                          className="dialog-input"
                        />
                      </div>
                      <button type="submit" className="dialog-btn">
                        {isSubbmiting ? "Submitting..." : "Track"}
                      </button>
                    </form>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default Modal;
