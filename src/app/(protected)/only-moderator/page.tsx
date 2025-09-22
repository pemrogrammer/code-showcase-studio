import { withRole } from "@/lib/with-role"

export function OnlyModeratorPage() {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-bold text-green-700">Selamat Datang, Moderator!</h1>
      <p className="text-gray-600">Anda memiliki akses penuh ke halaman ini.</p>
    </div>
  )
}

export default withRole(OnlyModeratorPage, ["MODERATOR"])