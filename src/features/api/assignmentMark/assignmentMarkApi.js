import swal from "sweetalert";
import apiSlice from "../apiSlice"


export const assignmentMarkApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getAssignmentMarks : builder.query({
            query: () => ({
                url: "/assignmentMark",
                method: "GET",
            }),
        }),
        getAssignmentMark : builder.query({
            query: ({student_id, assignment_id}) => ({
                url: `/assignmentMark?student_id_like=${student_id}&assignment_id_like=${assignment_id}`,
                method: "GET",
            }),
            providesTags : (result, error, {student_id, assignment_id}) => [{ type: 'AssignmentMark', id : assignment_id,stu_Id: student_id }],
        }),

        addAssignmentMark : builder.mutation({
            query: (data) => ({
                url: `/assignmentMark`,
                method: "POST",
                body: data
            }),
        }) ,
        updateAssignmentMark :  builder.mutation({
            query: ({id,data}) => ({
                url: `/assignmentMark/${id}`,
                method: "PATCH",
                body: {
                    mark: data.mark,
                    status : "published"
                }
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                // // optimistic cache update start
                const allAssTarget = dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignmentMarks",
                        undefined,
                        (draft) => {
                            console.log(JSON.parse(JSON.stringify(draft)));
                            const updateIndex = draft.findIndex(item => item.id == arg.id);
                            console.log(arg);
                            draft[updateIndex] = {
                                ...arg.data,
                                status : "published"
                            }
                        }
                    )
                );
                
                try {
                    const assignmentMark = await queryFulfilled;
                    if (assignmentMark?.data?.id) {

                        // update assignment cache pessimistically start

                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getAssignmentMark",
                                arg.id.toString(),
                                (draft) => {
                                //    return draft = assignment.data
                                //    return assignment.data
                                    Object.assign(draft, assignmentMark.data)
                                }
                                
                            )
                        );
                        // update assignment cache pessimistically end
                    }
                } catch (err) {
                    swal("Update flild!", 'error')
                    allAssTarget.undo()
                }
            },

        }) ,
    })
})


export const {
    useGetAssignmentMarksQuery, 
    useGetAssignmentMarkQuery,
    useAddAssignmentMarkMutation, 
    useUpdateAssignmentMarkMutation,
} = assignmentMarkApi;