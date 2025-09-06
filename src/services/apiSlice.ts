import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../app/store';

type User = {
  phone: number,
  phoneVerified: boolean,
  phoneOTP: string,
  name: string
}

type Product = {
  _id: string;
  name: string;
  price: number;
  imageId: string;
};

type CartItem = {
  productId: Product;
  selectedQuantity: number;
  selectedSize: string;
  _id: string;
}

type CartResponse = {
  products: Array<CartItem>
}

interface MenuItem {
  name: string;
  description: string;
  price: number;
  rating: number;
  time: string;
  id: number;
  imageId: string;
	category: string;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/products` }),
  endpoints: (builder) => ({
    getProducts: builder.query<Array<MenuItem>, void>({
      query: () => '/',
    }),
    getProduct: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
})

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.signup?.idToken || localStorage.getItem('idToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (formattedPhone) => ({
        url: '/signup',
        method: 'POST',
        body: formattedPhone,
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Auth']
    }),
    verifyOtp: build.mutation({
      query: (body) => ({
        url: '/verify-signup',
        method: 'POST',
        body
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Auth']
    }),
    login: build.mutation({
      query: (formattedPhone) => ({
        url: '/login',
        method: 'POST',
        body: formattedPhone
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Auth']
    }),
    verifyLogin: build.mutation({
      query: (body) => ({
        url: '/verify-login',
        method: 'POST',
        body
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Auth']
    }),
    getUser: build.query<User, void>({
      query: () => '/user',
    }),
    userLogout: build.mutation<User, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    })
  }),
})

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/cart`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.signup?.idToken || localStorage.getItem('idToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => '/',
      providesTags: ['Cart']
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: '/add',
        method: 'POST',
        body
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Cart']
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: '/remove',
        method: 'POST',
        body: {id}
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Cart']
    }),
    increaseItemQuantity: builder.mutation({
      query: (id) => ({
        url: '/increment',
        method: 'POST',
        body: {itemId: { id }}
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Cart'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            const item = draft.products.find((p) => p._id === id);
            if(item){
              item.selectedQuantity += 1;
            }
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    decreaseItemQuantity: builder.mutation({
      query: (id) => ({
        url: '/decrement',
        method: 'POST',
        body: {itemId: { id }}
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Cart'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            const item = draft.products.find((p) => p._id === id);
            if(item){
              item.selectedQuantity -= 1;
            }
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    })
  }),
})

export const { useGetProductsQuery, useGetProductQuery } = productApi
export const { useCreateUserMutation, useVerifyOtpMutation, useGetUserQuery, useLoginMutation, useVerifyLoginMutation, useUserLogoutMutation } = authApi
export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useIncreaseItemQuantityMutation, useDecreaseItemQuantityMutation } = cartApi