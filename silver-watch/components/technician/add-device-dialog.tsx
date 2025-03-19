"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus } from "lucide-react"

import { Device } from "@/types/devices"
import ApiService from "@/handler/ApiService"
import { useApi } from "@/hooks/useApi"
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler"
const deviceSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required"),
  deviceType: z.string().min(1, "Device type is required"),
  location: z.string().min(1, "Location is required"),
})

type DeviceFormValues = z.infer<typeof deviceSchema>

export function AddDeviceDialog() {
  const [open, setOpen] = useState(false)
  const { useAddItem } = useApi<Device,Device>(ApiService.DEVICES_URL)
  const handleApiError = useApiErrorHandler()
  const { mutate:addDevice } = useAddItem

  
  const form = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      deviceId: "",
      deviceType: "",
      location: "",
    },
  })

  async function onSubmit(values: DeviceFormValues) {
    // Here you would typically call an API to add the device
    // console.log(values)
    try {
      // Map deviceType values to the expected Device type format
      const deviceTypeMap: { [key: string]: Device['type'] } = {
        'heart-monitor': 'Heart Monitor',
        'temperature-sensor': 'Temperature Sensor',
        'motion-sensor': 'Motion Sensor',
        'blood-pressure-monitor': 'Blood Pressure Monitor',
        'wearable-device': 'Wearable Device'
      };
      addDevice({ 
        ...values, 
        type: deviceTypeMap[values.deviceType] ,
        id: values.deviceId,
        location: values.location
      },{
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
        onError: (error) => {
          console.error(error?.response?.data || error.message);
          handleApiError.handleError(error?.response?.data || error.message);
        }
      });
    } catch (error) {
      console.error(error);
      handleApiError.handleError(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Device
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>
            Enter the details of the new monitoring device to add to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="deviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., HM-2024-XXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="heart-monitor">Heart Monitor</SelectItem>
                      <SelectItem value="temperature-sensor">Temperature Sensor</SelectItem>
                      <SelectItem value="motion-sensor">Motion Sensor</SelectItem>
                      <SelectItem value="blood-pressure-monitor">Blood Pressure Monitor</SelectItem>
                      <SelectItem value="wearable-device">Wearable Device</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Room 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} type="button">
                Cancel
              </Button>
              <Button type="submit">Add Device</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
