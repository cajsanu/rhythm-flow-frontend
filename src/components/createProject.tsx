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
import { useCreateProject } from "@/hooks/projectManagement"
import { CreateProject, createProjectSchema } from "@/types/project"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useAppDispatch } from "@/hooks/alertManagement"
import { timedAlert } from "@/reducers/alertSlice"

export const CreateProjectForm = ({ closeForm }: { closeForm: () => void }) => {
  const { wsId = "" } = useParams<{ wsId: string }>()
  const dispatch = useAppDispatch()

  const form = useForm<CreateProject>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: 0,
      workspaceId: wsId ?? ""
    }
  })

  const newProjectMutation = useCreateProject()

  if (!wsId) {
    dispatch(
      timedAlert({
        message: "Workspace ID is undefined",
        severity: "error"
      })
    )
    return null
  }

  const onSubmit: SubmitHandler<CreateProject> = async (data: CreateProject) => {
    try {
      await newProjectMutation.mutateAsync({ ...data, workspaceId: wsId })
      dispatch(
        timedAlert({
          message: `Project created successfully`,
          severity: "success"
        })
      )
      closeForm()
    } catch (err) {
      dispatch(
        timedAlert({
          message: "An error occurred while creating the project",
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Enter project start date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="endDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Enter project end date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent position="popper" style={{ zIndex: 1300 }}>
                          <SelectItem value="0">To do</SelectItem>
                          <SelectItem value="1">In progress</SelectItem>
                          <SelectItem value="2">Done</SelectItem>
                        </SelectContent>
                      </Select>
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
