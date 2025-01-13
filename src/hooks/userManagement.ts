import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { login } from "@/api/login"
import { User } from "@/types/user"
import userRequests from "@/api/users"

export const useLogin = () => {
  const newLoginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      data && window.localStorage.setItem("token", data)
    }
  })

  return newLoginMutation
}

export const useGetUsers = (id: string) => {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => userRequests.getUsers()
  })
  return { data, isLoading, error }
}

export const useGetUserById = (id: string) => {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => userRequests.getUserById(id)
  })
  return { data, isLoading, error }
}

export const useGetUserByEmail = (email: string) => {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["user", email],
    queryFn: () => userRequests.getUserByEmail(email)
  })
  return { data, isLoading, error }
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  const newUserMutation = useMutation({
    mutationFn: userRequests.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })

  return newUserMutation
}

export const deleteUser = () => {
  const queryClient = useQueryClient()

  const deleteUserMuation = useMutation({
    mutationFn: userRequests.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })

  return deleteUserMuation
}
