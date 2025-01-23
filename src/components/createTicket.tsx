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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CreateTicket, createTicketSchema } from "@/types/ticket"
import { useCreateTicket } from "@/hooks/ticketManagement"
import { useAppDispatch } from "@/hooks/alertManagement"
import { timedAlert } from "@/reducers/alertSlice"
import { Alerts } from "./alert"

export const CreateTicketForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { projectId, wsId } = useParams<{ projectId: string; wsId: string }>()
  const dispatch = useAppDispatch()

  const form = useForm<CreateTicket>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: 0,
      deadline: "",
      status: 0,
      projectId: projectId ?? "",
      type: 0
    }
  })

  const newTicketMutation = useCreateTicket()

  const onSubmit: SubmitHandler<CreateTicket> = async (data: CreateTicket) => {
    if (!projectId || !wsId) {
      throw new Error("Workspace ID or project ID is undefined")
    }

    const newTicket = { ...data, projectId: projectId }

    try {
      await newTicketMutation.mutateAsync({ workspaceId: wsId, newTicket })
      dispatch(
        timedAlert({
          message: `Ticket created successfully`,
          severity: "success"
        })
      )
      onSuccess()
    } catch (err: any) {
      if (err.response?.status === 403) {
        dispatch(
          timedAlert({
            message: "You are not authorized to create tickets in this project",
            severity: "error"
          })
        )
        return
      }
      dispatch(
        timedAlert({
          message: "An error occurred while creating the ticket",
          severity: "error"
        })
      )
    }
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full shadow-2xl">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ticket name" {...field} />
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
                      <Input placeholder="Enter ticket description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper" style={{ zIndex: 5000 }}>
                          <SelectItem value="0">Low</SelectItem>
                          <SelectItem value="1">Medium</SelectItem>
                          <SelectItem value="2">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="deadline"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Enter project start date" {...field} />
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
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper" style={{ zIndex: 5000 }}>
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
              <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper" style={{ zIndex: 5000 }}>
                          <SelectItem value="0">Personal</SelectItem>
                          <SelectItem value="1">Technical</SelectItem>
                          <SelectItem value="2">Other</SelectItem>
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
