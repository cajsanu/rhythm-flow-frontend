import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useCreateWorkspace } from "@/hooks/workspaceManagement"

const schema = z.object({
  name: z.string().min(1, { message: "Workspace name is required" })
})

type WSName = z.infer<typeof schema>

type CreateWorkspaceProps = {
  onSuccess: () => void
}

export const CreateWorkspace = ({ onSuccess }: CreateWorkspaceProps) => {
  const form = useForm<WSName>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ""
    }
  })

  const { id } = useParams()

  const newWorkspaceMutation = useCreateWorkspace()

  const onSubmit: SubmitHandler<WSName> = async (data) => {
    if (!id) {
      throw new Error("User ID is undefined")
    }

    try {
      await newWorkspaceMutation.mutateAsync({ name: data.name, ownerId: id })
      onSuccess()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center pt-40">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle>Create Workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workspace name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
