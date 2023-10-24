import { apiSlice } from "./apiSlice";
import { TYPES_TAGS } from "./providesTags";

export const apiSliceTags = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listTags: builder.query({
      query: () => ({
        url: `/listTags`,
      }),
      providesTags: (result) => {
        const list = result.response || [];

        return result && Array.isArray(list)
          ? [
              ...list.map(({ id }) => ({
                type: TYPES_TAGS.TYPE_LIST_TAGS,
                id: id,
              })),
              { type: TYPES_TAGS.TYPE_LIST_TAGS, id: "ALL" },
            ]
          : [{ type: TYPES_TAGS.TYPE_LIST_TAGS, id: "ALL" }];
      },
      transformResponse: (result) => {
        return [...result.response];
      },
    }),
    createTag: builder.mutation({
      query: (body) => ({
        url: `/createTag`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [
        { type: TYPES_TAGS.TYPE_LIST_TAGS, id: "ALL" },
      ],
    }),

    updateTag: builder.mutation({
      query: ({ body, tagId }) => ({
        url: `/updateTag/${tagId}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({tagId}, {dispatch, queryFulfilled}){
        try {
          const {data:updateTag} = await queryFulfilled
          if(updateTag.code === 200){
            const {response} = updateTag
            dispatch(
              apiSlice.util.updateQueryData('listTags', tagId, (draftTag) => {

                return draftTag.map(tag=>{

                  if(tag.id === tagId){
                    tag.tag = response.tag
                    tag.color = response.color
                  }

                  return tag

                })
              })
            )
          }
        }catch{
          console.log("error")
        }
      }
      // invalidatesTags:() => [{type:TYPES_TAGS.TYPE_LIST_TAGS, id:'ALL'}]
    }),
  }),
})

export const {
  useListTagsQuery,
  useCreateTagMutation
} = apiSliceTags
