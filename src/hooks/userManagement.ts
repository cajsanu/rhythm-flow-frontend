import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { login } from "@/api/login"
import { User } from "@/types/user"
import userRequests from "@/api/users"
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const newLoginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      if (data) {
        window.localStorage.setItem("token", data)
        // Decode token to store userId in localStorage
        const decoded = jwtDecode<{ nameid: string }>(data)
        window.localStorage.setItem("userId", decoded.nameid)
      }
    }
  })

  return newLoginMutation
}

export const useGetUsers = () => {
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
