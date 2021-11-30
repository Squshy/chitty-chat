import { useLazyQuery } from "@apollo/client";
import { Transition, Dialog } from "@headlessui/react";
import { TruckIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
import {
  PendingFriendsDocument,
  PendingFriendsQuery,
  SearchForUserDocument,
  SearchForUserQuery,
  useAddFriendMutation,
} from "../../generated/graphql";
import { AddFriendDetail } from "./AddFriendDetail";
import { debounce } from "lodash";

interface AddFriendModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const AddFriendModal: React.FC<AddFriendModalProps> = ({
  closeModal,
  isOpen,
}) => {
  const [
    searchForUser,
    { loading: searchLoading, error, data: searchData, refetch },
  ] = useLazyQuery<SearchForUserQuery>(SearchForUserDocument, {
    fetchPolicy: "no-cache",
  });
  const [addFriend, { loading: addFriendLoading }] = useAddFriendMutation({
    update(cache, { data }) {
      if (data?.addFriend.friend) {
        cache.writeQuery<PendingFriendsQuery>({
          query: PendingFriendsDocument,
          data: {
            __typename: "Query",
            pendingFriends: [
              ...(cache.readQuery<PendingFriendsQuery>({
                query: PendingFriendsDocument,
              })?.pendingFriends || []),
              data.addFriend.friend,
            ],
          },
        });
      }
    },
  });

  const DisplaySearchData = () => {
    if (searchLoading)
      return (
        <div className="text-viat-666 mt-4 flex justify-center space-x-2">
          <p className="text-center italic">Beep beep, loading...</p>
          <TruckIcon className="w-4" />
        </div>
      );
    if (!searchData)
      return (
        <p className="italic text-viat-666 text-center mt-4">Type something</p>
      );
    if (searchData.searchForUser && searchData.searchForUser.length <= 0)
      return (
        <p className="italic text-viat-666 text-center mt-4">
          No users match that search
        </p>
      );
    return (
      <>
        {searchData?.searchForUser?.map((user) => {
          return (
            <AddFriendDetail
              key={user.username}
              displayName={user.displayName}
              username={user.username}
              disabled={addFriendLoading}
              addFriend={async () => {
                await addFriend({
                  variables: { username: user.username },
                });
                refetch && (await refetch());
              }}
            />
          );
        })}
      </>
    );
  };

  const validateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length <= 2 || text.length > 14) return;
    debounce(
      () =>
        searchForUser({
          variables: { username: text },
        }),
      250
    )();
  };

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
                    className="appearance-none w-full shadow-md rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus-visible:ring-purple-500 bg-[#4a4a4a] border-[#1a1a1a] border"
                    onChange={(e) => validateSearch(e)}
                  />
                </div>
                <div className="mt-2 rounded overflow-y-auto h-64 scrollbar scrollbar-thin scrollbar-thumb-viat-666 scrollbar-track-viat-medium scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
                  <DisplaySearchData />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
