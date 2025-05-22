"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import AccountLayout from "@/components/account-layout"

export default function SettingsPage() {
  const { user, updatePassword, logout } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notifications, setNotifications] = useState({
    email_order: true,
    email_marketing: false,
    sms_order: true,
    sms_marketing: false,
  })

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handleNotificationChange = (name, checked) => {
    setNotifications({
      ...notifications,
      [name]: checked,
    })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password tidak cocok",
        description: "Password baru dan konfirmasi password tidak cocok.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword)
      toast({
        title: "Password diperbarui",
        description: "Password Anda telah berhasil diperbarui.",
      })
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Gagal memperbarui password",
        description: "Password saat ini tidak valid atau terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Pengaturan notifikasi disimpan",
      description: "Preferensi notifikasi Anda telah berhasil diperbarui.",
    })
  }

  const handleDeleteAccount = () => {
    if (confirm("Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan.")) {
      // In a real app, this would make an API call to delete the account
      toast({
        title: "Akun dihapus",
        description: "Akun Anda telah berhasil dihapus.",
      })
      logout()
      window.location.href = "/"
    }
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pengaturan Akun</h1>
          <p className="text-muted-foreground">Kelola pengaturan akun dan preferensi Anda</p>
        </div>

        <Separator />

        {/* Change Password */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ubah Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Password Saat Ini</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Password Baru</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Ubah Password"}
            </Button>
          </form>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pengaturan Notifikasi</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email_order">Notifikasi Pesanan via Email</Label>
                <p className="text-sm text-muted-foreground">Dapatkan pembaruan status pesanan melalui email</p>
              </div>
              <Switch
                id="email_order"
                checked={notifications.email_order}
                onCheckedChange={(checked) => handleNotificationChange("email_order", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email_marketing">Email Marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Dapatkan informasi promosi dan produk terbaru melalui email
                </p>
              </div>
              <Switch
                id="email_marketing"
                checked={notifications.email_marketing}
                onCheckedChange={(checked) => handleNotificationChange("email_marketing", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms_order">Notifikasi Pesanan via SMS</Label>
                <p className="text-sm text-muted-foreground">Dapatkan pembaruan status pesanan melalui SMS</p>
              </div>
              <Switch
                id="sms_order"
                checked={notifications.sms_order}
                onCheckedChange={(checked) => handleNotificationChange("sms_order", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms_marketing">SMS Marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Dapatkan informasi promosi dan produk terbaru melalui SMS
                </p>
              </div>
              <Switch
                id="sms_marketing"
                checked={notifications.sms_marketing}
                onCheckedChange={(checked) => handleNotificationChange("sms_marketing", checked)}
              />
            </div>

            <Button onClick={handleSaveNotifications}>Simpan Preferensi</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-destructive">Hapus Akun</h2>
          <p className="text-muted-foreground">
            Setelah Anda menghapus akun, semua data Anda akan dihapus secara permanen. Tindakan ini tidak dapat
            dibatalkan.
          </p>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Hapus Akun
          </Button>
        </div>
      </div>
    </AccountLayout>
  )
}
