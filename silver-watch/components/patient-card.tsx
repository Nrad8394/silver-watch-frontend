import { Card, CardContent } from "@/components/ui/card"
import { Heart, Thermometer } from "lucide-react"

interface PatientCardProps {
  name: string
  status: "Critical" | "Stable"
  lastChecked: string
  heartRate: number
  temperature: number
}

export function PatientCard({ name, status, lastChecked, heartRate, temperature }: PatientCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">Last checked: {lastChecked}</p>
          </div>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              status === "Critical"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{heartRate} BPM</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{temperature}°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

