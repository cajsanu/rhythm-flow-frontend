import { Workspace } from "@/types/workspace"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  name: z.string()
})

type Fields = z.infer<typeof schema>

export const CreateWorkspace = () => {
  const { register, handleSubmit } = useForm<Fields>({
    resolver: zodResolver(schema)
  })
  // use muatation to create a workspace

  return (
    <div className="flex justify-center pt-40">
      <div className="flex flex-col p-10 bg-rose-300 w-2/4 rounded shadow-2xl">
        <h1 className="text-2xl font-bold text-white pb-5">Create Workspace</h1>
      </div>
    </div>
  )
}
