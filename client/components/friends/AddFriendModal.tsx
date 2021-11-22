import { useLazyQuery } from "@apollo/client";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import {
  SearchForUserDocument,
  SearchForUserQuery,
  useAddFriendMutation,
} from "../../generated/graphql";
import { AddFriendDetail } from "./AddFriendDetail";

interface AddFriendModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const AddFriendModal: React.FC<AddFriendModalProps> = ({
  closeModal,
  isOpen,
}) => {
  const [searchForUser, { loading, error, data }] = useLazyQuery(
    SearchForUserDocument
  );
  const [addFriend] = useAddFriendMutation();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-back shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-white"
                >
                  Find a friend
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter a username"
                    className="appearance-none w-full shadow-sm rounded py-2 px-3 leading-tight focus:outline-none focus:ring bg-[#4a4a4a] border-[#1a1a1a] border"
                    onChange={(e) =>
                      searchForUser({ variables: { username: e.target.value } })
                    }
                  />
                </div>
                <div className="mt-2 bg-mid rounded">
                  {(data as SearchForUserQuery)?.searchForUser?.map((u) => {
                    return (
                      <AddFriendDetail
                        key={u.username}
                        displayName={u.displayName}
                        username={u.username}
                        addFriend={() =>
                          addFriend({ variables: { username: u.username } })
                        }
                      />
                    );
                  })}
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
