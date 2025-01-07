import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import workspaceRequests from "../api/workspaces"
import { useParams } from "react-router-dom"
import { on } from "events"

const schema = z.object({
  name: z.string()
})

type WSName = z.infer<typeof schema>

type CreateWorkspaceProps = {
  onSuccess: () => void
}

export const CreateWorkspace = ({ onSuccess }: CreateWorkspaceProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<WSName>({
    resolver: zodResolver(schema)
  })
  const queryClient = useQueryClient()
  const { id } = useParams()

  const newWorkspaceMutation = useMutation({
    mutationFn: workspaceRequests.createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    }
  })

  const onSubmit: SubmitHandler<WSName> = async (data: WSName) => {
    if (!id) {
      throw new Error("User ID is undefined")
    }

    try {
      await newWorkspaceMutation.mutateAsync({ name: data.name, ownerId: id })
      onSuccess()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center pt-40">
      <div className="flex flex-col p-10 bg-rose-300 w-2/4 rounded shadow-2xl">
        <h1 className="text-2xl font-bold text-white pb-5">Create Workspace</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-white flex justify-right pt-2">
                Name for workspace:
              </label>
              <input
                type="text"
                {...register("name")}
                className="block w-full rounded-md py-1.5 text-black outline outline-transparent focus:outline-pink-800"
              />
              {errors.name && (
                <div className="p-2">
                  <p className="text-black">{errors.name.message}</p>
                </div>
              )}
            </div>
            <div className="py-3">
              <button
                className="transition delay-150 flex w-full justify-center rounded-md bg-rose-300 px-3 py-1.5 text-sm font-semibold leading-6 text-rose-800 hover:bg-rose-200"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
