"use client"

import type React from "react"

import FullPageLoader from "@/components/custom/loading"
import { useRouter } from "next/navigation"

import Cookies from "js-cookie"
import { useApi } from "@/hooks/useApi"
import ApiService from "@/handler/ApiService"
import { toast } from "sonner"
import { User } from "@/types/users"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const accessToken = Cookies.get('accessToken')
  const router = useRouter()
  if (!accessToken){
    toast.error('Session is not valid.')
    router.replace('/login')
  }
  const { useFetchData } = useApi<User, User>(ApiService.USER_URL)
  const { data:user,isFetched,error } = useFetchData(1)
  if(!isFetched && !user?.results && !user?.results[0].role){
    return <FullPageLoader message="Loading ..." />
  }
  if(error){
    Cookies.remove('refreshToken')
    Cookies.remove('refreshToken')
    toast.error(error.message||'Session is not valid.')
  }

  return (
        <main className="flex-1 p-6">{children}</main>
  )
}

