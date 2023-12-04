import dayjs from "dayjs";
import { apiSlice } from "./apiSlice";
import { TYPES_MY_PROFILE } from "./providesTags";
dayjs.locale("es");

export const apiSliceMyProfile = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		updateProfile: builder.mutation({
			query: ({ userId, body }) => ({
				url: `users/update-profile/${userId}`,
				method: "POST",
				body: body
			}),
			invalidatesTags: ({ userId }) => [{ type: TYPES_MY_PROFILE, id: userId }]
		})
	})
});

export const { useUpdateProfileMutation } = apiSliceMyProfile;
