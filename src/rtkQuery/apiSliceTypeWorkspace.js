import { apiSlice } from "./apiSlice";
import { TYPES_TYPE_WORKSPACE } from "./providesTags";

const defaultOption = {label: "Todos", value: "TODOS"}

export const apiSliceTypeWorkspace = apiSlice.injectEndpoints(
  {
    endpoints: (builder) => (
      {
        listTypeWorkspace: builder.query(
          {
            query: () => (
              {
                url: `/workpaces_types`
              }
            ),
            transformResponse: (result) => {
              let list = []
              try {
                const data = [...result.response]
                list = data.map (
                  (item) => {
                    return {
                      ...item,
                        label: item.name,
                        value: item.id,
                    }
                  }
                )
                list = [defaultOption, ...list]

              } catch (error) {
                console.log(error)
              }
              return list
            },
            providesTags: [{type: TYPES_TYPE_WORKSPACE.TYPE_LIST_TYPE_WORKSPACE, id: "ALL"}]
          }
        )
      }
    )
  }
)

export const {
  useListTypeWorkspaceQuery
} = apiSliceTypeWorkspace
