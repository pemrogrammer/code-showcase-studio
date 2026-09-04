'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import authClient from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type LogoutAlertProps = {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function LogoutAlert({ isOpen: controlledIsOpen, onOpenChange }: LogoutAlertProps = {}) {
  const router = useRouter()
  const [internalIsOpen, setInternalIsOpen] = useState(true)
  const isOpen = controlledIsOpen ?? internalIsOpen
  const handleOpenChange = onOpenChange ?? setInternalIsOpen

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth/login')
        },
      },
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be securely logged out of your account. You can always log back in later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleOpenChange(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
