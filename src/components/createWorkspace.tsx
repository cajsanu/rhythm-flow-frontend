import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
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
import { useAppDispatch } from "@/hooks/alertManagement"
import { timedAlert } from "@/reducers/alertSlice"

export const CreateWorkspaceForm = ({ closeForm }: { closeForm: () => void }) => {
  const { userId = "" } = useParams<{ userId: string }>()
  const dispatch = useAppDispatch()

  const form = useForm<CreateWorkspace>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      ownerId: userId ?? ""
    }
  })

  const newWorkspaceMutation = useCreateWorkspace()

  if (!userId) {
    dispatch(
      timedAlert({
        message: "User ID is undefined",
        severity: "error"
      })
    )
    return null
  }

  const onSubmit: SubmitHandler<CreateWorkspace> = async (data) => {
    try {
      await newWorkspaceMutation.mutateAsync({ name: data.name, ownerId: userId })
      dispatch(
        timedAlert({
          message: `Workspace created successfully`,
          severity: "success"
        })
      )
      closeForm()
    } catch (err) {
      dispatch(
        timedAlert({
          message: "An error occurred while creating the workspace",
          severity: "error"
        })
      )
    }
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardContent className="p-8">
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
