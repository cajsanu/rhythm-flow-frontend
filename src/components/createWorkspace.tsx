import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
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
import { CreateWorkspace, createWorkspaceSchema } from "@/types/workspace"

type CreateWorkspaceProps = {
  onSuccess: () => void
}

export const CreateWorkspaceForm = ({ onSuccess }: CreateWorkspaceProps) => {
  const { id = "" } = useParams<{ id: string }>()

  const form = useForm<CreateWorkspace>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      ownerId: id ?? ""
    }
  })

  const newWorkspaceMutation = useCreateWorkspace()

  const onSubmit: SubmitHandler<CreateWorkspace> = async (data) => {
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
