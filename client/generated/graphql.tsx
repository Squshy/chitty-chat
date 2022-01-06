import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FriendResponse = {
  __typename?: 'FriendResponse';
  error?: Maybe<Scalars['String']>;
  friend?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: FriendResponse;
  addFriend: FriendResponse;
  changePassword: UserResponse;
  declineFriendRequest: FriendResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  revokeFriendRequest: FriendResponse;
};


export type MutationAcceptFriendRequestArgs = {
  username: Scalars['String'];
};


export type MutationAddFriendArgs = {
  username: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDeclineFriendRequestArgs = {
  username: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationRevokeFriendRequestArgs = {
  username: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  visibility: Visibility;
};

export type Query = {
  __typename?: 'Query';
  friendRequests: Array<User>;
  friends: Array<User>;
  me?: Maybe<User>;
  pendingFriends: Array<User>;
  searchForUser?: Maybe<Array<User>>;
};


export type QuerySearchForUserArgs = {
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  profile: Profile;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Visibility = {
  __typename?: 'Visibility';
  type: Scalars['String'];
};

export type FriendFragment = { __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } };

export type FriendResponseFragment = { __typename?: 'FriendResponse', error?: string | null | undefined, friend?: { __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined };

export type SelfFragment = { __typename?: 'User', username: string, email: string, id: string, createdAt: any, profile: { __typename?: 'Profile', displayName: string, avatar: string, visibility: { __typename?: 'Visibility', type: string } } };

export type UserFragment = { __typename?: 'User', username: string, email: string, id: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } };

export type UserErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', username: string, email: string, id: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined };

export type AcceptFriendRequestMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'FriendResponse', error?: string | null | undefined, friend?: { __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined } };

export type AddFriendMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'FriendResponse', error?: string | null | undefined, friend?: { __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined } };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', username: string, email: string, id: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined } };

export type DeclineFriendRequestMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type DeclineFriendRequestMutation = { __typename?: 'Mutation', declineFriendRequest: { __typename?: 'FriendResponse', error?: string | null | undefined, friend?: { __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', username: string, email: string, id: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', username: string, email: string, id: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined } };

export type RevokeFriendRequestMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type RevokeFriendRequestMutation = { __typename?: 'Mutation', revokeFriendRequest: { __typename?: 'FriendResponse', error?: string | null | undefined, friend?: { __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined } };

export type FriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendRequestsQuery = { __typename?: 'Query', friendRequests: Array<{ __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } }> };

export type FriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string, email: string, id: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } } | null | undefined };

export type PendingFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingFriendsQuery = { __typename?: 'Query', pendingFriends: Array<{ __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } }> };

export type SearchForUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SearchForUserQuery = { __typename?: 'Query', searchForUser?: Array<{ __typename?: 'User', username: string, profile: { __typename?: 'Profile', displayName: string, avatar: string } }> | null | undefined };

export const FriendFragmentDoc = gql`
    fragment Friend on User {
  username
  profile {
    displayName
    avatar
  }
}
    `;
export const FriendResponseFragmentDoc = gql`
    fragment FriendResponse on FriendResponse {
  error
  friend {
    ...Friend
  }
}
    ${FriendFragmentDoc}`;
export const SelfFragmentDoc = gql`
    fragment Self on User {
  username
  email
  profile {
    displayName
    visibility {
      type
    }
    avatar
  }
  id
  createdAt
}
    `;
export const UserErrorFragmentDoc = gql`
    fragment UserError on FieldError {
  field
  message
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  username
  email
  profile {
    displayName
    avatar
  }
  id
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on UserResponse {
  errors {
    ...UserError
  }
  user {
    ...User
  }
}
    ${UserErrorFragmentDoc}
${UserFragmentDoc}`;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($username: String!) {
  acceptFriendRequest(username: $username) {
    ...FriendResponse
  }
}
    ${FriendResponseFragmentDoc}`;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const AddFriendDocument = gql`
    mutation AddFriend($username: String!) {
  addFriend(username: $username) {
    ...FriendResponse
  }
}
    ${FriendResponseFragmentDoc}`;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, options);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeclineFriendRequestDocument = gql`
    mutation DeclineFriendRequest($username: String!) {
  declineFriendRequest(username: $username) {
    ...FriendResponse
  }
}
    ${FriendResponseFragmentDoc}`;
export type DeclineFriendRequestMutationFn = Apollo.MutationFunction<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;

/**
 * __useDeclineFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeclineFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendRequestMutation, { data, loading, error }] = useDeclineFriendRequestMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useDeclineFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>(DeclineFriendRequestDocument, options);
      }
export type DeclineFriendRequestMutationHookResult = ReturnType<typeof useDeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationResult = Apollo.MutationResult<DeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $usernameOrEmail: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RevokeFriendRequestDocument = gql`
    mutation RevokeFriendRequest($username: String!) {
  revokeFriendRequest(username: $username) {
    ...FriendResponse
  }
}
    ${FriendResponseFragmentDoc}`;
export type RevokeFriendRequestMutationFn = Apollo.MutationFunction<RevokeFriendRequestMutation, RevokeFriendRequestMutationVariables>;

/**
 * __useRevokeFriendRequestMutation__
 *
 * To run a mutation, you first call `useRevokeFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeFriendRequestMutation, { data, loading, error }] = useRevokeFriendRequestMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRevokeFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<RevokeFriendRequestMutation, RevokeFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeFriendRequestMutation, RevokeFriendRequestMutationVariables>(RevokeFriendRequestDocument, options);
      }
export type RevokeFriendRequestMutationHookResult = ReturnType<typeof useRevokeFriendRequestMutation>;
export type RevokeFriendRequestMutationResult = Apollo.MutationResult<RevokeFriendRequestMutation>;
export type RevokeFriendRequestMutationOptions = Apollo.BaseMutationOptions<RevokeFriendRequestMutation, RevokeFriendRequestMutationVariables>;
export const FriendRequestsDocument = gql`
    query FriendRequests {
  friendRequests {
    ...Friend
  }
}
    ${FriendFragmentDoc}`;

/**
 * __useFriendRequestsQuery__
 *
 * To run a query within a React component, call `useFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<FriendRequestsQuery, FriendRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(FriendRequestsDocument, options);
      }
export function useFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendRequestsQuery, FriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(FriendRequestsDocument, options);
        }
export type FriendRequestsQueryHookResult = ReturnType<typeof useFriendRequestsQuery>;
export type FriendRequestsLazyQueryHookResult = ReturnType<typeof useFriendRequestsLazyQuery>;
export type FriendRequestsQueryResult = Apollo.QueryResult<FriendRequestsQuery, FriendRequestsQueryVariables>;
export const FriendsDocument = gql`
    query Friends {
  friends {
    ...Friend
  }
}
    ${FriendFragmentDoc}`;

/**
 * __useFriendsQuery__
 *
 * To run a query within a React component, call `useFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsQuery(baseOptions?: Apollo.QueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, options);
      }
export function useFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, options);
        }
export type FriendsQueryHookResult = ReturnType<typeof useFriendsQuery>;
export type FriendsLazyQueryHookResult = ReturnType<typeof useFriendsLazyQuery>;
export type FriendsQueryResult = Apollo.QueryResult<FriendsQuery, FriendsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PendingFriendsDocument = gql`
    query PendingFriends {
  pendingFriends {
    ...Friend
  }
}
    ${FriendFragmentDoc}`;

/**
 * __usePendingFriendsQuery__
 *
 * To run a query within a React component, call `usePendingFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePendingFriendsQuery(baseOptions?: Apollo.QueryHookOptions<PendingFriendsQuery, PendingFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingFriendsQuery, PendingFriendsQueryVariables>(PendingFriendsDocument, options);
      }
export function usePendingFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingFriendsQuery, PendingFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingFriendsQuery, PendingFriendsQueryVariables>(PendingFriendsDocument, options);
        }
export type PendingFriendsQueryHookResult = ReturnType<typeof usePendingFriendsQuery>;
export type PendingFriendsLazyQueryHookResult = ReturnType<typeof usePendingFriendsLazyQuery>;
export type PendingFriendsQueryResult = Apollo.QueryResult<PendingFriendsQuery, PendingFriendsQueryVariables>;
export const SearchForUserDocument = gql`
    query SearchForUser($username: String!) {
  searchForUser(username: $username) {
    ...Friend
  }
}
    ${FriendFragmentDoc}`;

/**
 * __useSearchForUserQuery__
 *
 * To run a query within a React component, call `useSearchForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSearchForUserQuery(baseOptions: Apollo.QueryHookOptions<SearchForUserQuery, SearchForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchForUserQuery, SearchForUserQueryVariables>(SearchForUserDocument, options);
      }
export function useSearchForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchForUserQuery, SearchForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchForUserQuery, SearchForUserQueryVariables>(SearchForUserDocument, options);
        }
export type SearchForUserQueryHookResult = ReturnType<typeof useSearchForUserQuery>;
export type SearchForUserLazyQueryHookResult = ReturnType<typeof useSearchForUserLazyQuery>;
export type SearchForUserQueryResult = Apollo.QueryResult<SearchForUserQuery, SearchForUserQueryVariables>;