'use client'
import { useState, useEffect } from "react"
import { isAxiosError } from "axios"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, Plus, Heart, Thermometer, Activity, Droplets, RefreshCw, 
  // Clock, AlertTriangle,  ArrowDownUp 
} from "lucide-react"
import { api } from "@/utils/api";
import { useApi } from "@/hooks/useApi"
import ApiService from "@/handler/ApiService"
import { handleApiError } from "@/utils/api"
import type { User } from "@/types/users"


interface Alert {
  id: string;
  type: string;
  category: string;
  priority: string;
  status: string;
  timestamp: string;
  source_type: string;
  source_id: string;
  source_name: string;
  target_type: string;
  target_id: string;
  target_name: string;
  message: string;
  details: Record<string, unknown>;
  acknowledgement_at: string | null;
  acknowledgement_notes: string;
  resolution_at: string | null;
  resolution_action: string;
  resolution_notes: string;
  acknowledgement_by: string | null;
  resolution_by: string | null;
}

interface DisplayAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  time: string;
  status: string;
}

interface ProcessedPatient {
  id: string;
  name: string;
  heartRate: string;
  temperature: string;
  bloodPressure: string;
  bloodOxygen: string;
  lastCheck: string;
  status: "Stable" | "Warning" | "Critical";
  vitalStatus: {
    heartRate: "normal" | "warning" | "critical";
    bloodPressure: "normal" | "warning" | "critical";
    bloodOxygen: "normal" | "warning" | "critical";
    temperature: "normal" | "warning" | "critical";
  };
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<ProcessedPatient[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<DisplayAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const { useFetchData } = useApi<User, User>(ApiService.USER_URL);
  const { useFetchData: useFetchAlerts } = useApi<Alert, Alert>(ApiService.ALERTS_URL);
  
  const { data: patientsData, isLoading: isPatientsLoading, refetch: refetchPatients } = 
    useFetchData(1, { role: 'patient', is_active: true });
    
  const { data: alertsData, isLoading: isAlertsLoading, refetch: refetchAlerts } = 
  useFetchAlerts(1);

  // Fetch and process patient data including vitals
  useEffect(() => {
    async function loadPatientData() {
      if (!patientsData?.results || isPatientsLoading) return;
      try {
        const patientPromises = patientsData.results.map(async (patient) => {
          try {
            const response = await api.get(`${ApiService.VITAL_SIGNS_URL}?patient_id=${patient.id}&ordering=-timestamp&page_size=1`);
            if (!response.data) throw new Error('Failed to fetch vital signs');
            
            if (!response?.data?.results?.length) throw new Error('No vital signs found');
            
            const latestVitals = response?.data?.results[0] || {};
            
            const heartRateStatus = getVitalStatus(latestVitals.heart_rate || 0, 60, 100);
            const tempStatus = getVitalStatus(latestVitals.temperature || 0, 36.1, 37.5);
            const bpStatus = getVitalStatus(latestVitals.blood_pressure_systolic || 0, 90, 140);
            const oxygenStatus = getVitalStatus(latestVitals.blood_oxygen || 0, 95, 100);
            
            let overallStatus: "Stable" | "Warning" | "Critical" = "Stable";
            if ([heartRateStatus, tempStatus, bpStatus, oxygenStatus].includes("critical")) {
              overallStatus = "Critical";
            } else if ([heartRateStatus, tempStatus, bpStatus, oxygenStatus].includes("warning")) {
              overallStatus = "Warning";
            }
            
            return {
              id: patient.id,
              name: `${patient.first_name} ${patient.last_name}`,
              heartRate: `${latestVitals.heart_rate || 0} bpm`,
              temperature: `${latestVitals.temperature || 0}`,
              bloodPressure: `${latestVitals.blood_pressure_systolic || 0}/${latestVitals.blood_pressure_diastolic || 0}`,
              bloodOxygen: `${latestVitals.blood_oxygen || 0}%`,
              lastCheck: formatTimeSince(latestVitals.timestamp),
              status: overallStatus,
              vitalStatus: {
                heartRate: heartRateStatus,
                temperature: tempStatus,
                bloodPressure: bpStatus,
                bloodOxygen: oxygenStatus
              }
            };
          } catch (error) {
                console.error(`Error fetching vitals for patient ${patient.id}:`, error);
                return {
                  id: patient.id,
                  name: `${patient.first_name} ${patient.last_name}`,
                  heartRate: "N/A",
                  temperature: "N/A",
                  bloodPressure: "N/A",
                  bloodOxygen: "N/A",
                  lastCheck: "N/A",
                  status: "Warning" as const,
                  vitalStatus: {
                    heartRate: "warning" as const,
                    temperature: "warning" as const,
                    bloodPressure: "warning" as const,
                    bloodOxygen: "warning" as const
                  }
                };
          }
        });
        
        const resolvedPatients = await Promise.all(patientPromises);
        setPatients(resolvedPatients);
      } catch (error: unknown) {
        console.error("Error processing patient data:", error);
        if (isAxiosError(error)) {
          handleApiError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPatientData();
  }, [patientsData, isPatientsLoading]);
  
  useEffect(() => {
    if (!alertsData?.results || isAlertsLoading) return;
    
    const formattedAlerts = alertsData.results.map(alert => ({
      id: alert.id,
      patientId: alert.target_id,
      patientName: alert.target_name || "Unknown Patient",
      type: alert.type || "Health Alert",
      time: formatTimeSince(alert.timestamp),
      status: alert.priority === "high" ? "Urgent" : "Warning"
    }));
    
    setActiveAlerts(formattedAlerts);
  }, [alertsData, isAlertsLoading]);
  
  useEffect(() => {
    refetchPatients();
    refetchAlerts();
    
    const intervalId = setInterval(() => {
      refetchPatients();
      refetchAlerts();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [refetchPatients, refetchAlerts]);
  
  function getVitalStatus(value: number, min: number, max: number): "normal" | "warning" | "critical" {
    if (value === 0) return "warning";
    if (value >= min && value <= max) return "normal";
    if (value < min - 10 || value > max + 10) return "critical";
    return "warning";
  }
  
  function formatTimeSince(timestamp: string): string {
    if (!timestamp) return "Unknown";
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return `${Math.floor(diffHours / 24)} days ago`;
  }
  
  function getVitalIconColor(status: "normal" | "warning" | "critical"): string {
    switch (status) {
      case "normal": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "critical": return "text-red-500";
      default: return "text-muted-foreground";
    }
  }
  
  const filteredPatients = patients
    .filter(patient => 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(patient => 
      statusFilter === "all" ? true : patient.status.toLowerCase() === statusFilter.toLowerCase()
    );

  return (
    <DashboardLayout userRole="caregiver">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Patients</h2>
            <p className="text-muted-foreground">Manage and monitor your assigned patients</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search patients..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Patient
            </Button>
          </div>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Patient List</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-6">
            {activeAlerts.length > 0 && (
              <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-red-600 dark:text-red-400">Active Alerts</CardTitle>
                    <CardDescription>Patients requiring immediate attention</CardDescription>
                  </div>
                  <Badge variant="destructive">{activeAlerts.length} Active</Badge>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Alert Type</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{alert.patientName}</TableCell>
                          <TableCell>{alert.type}</TableCell>
                          <TableCell>{alert.time}</TableCell>
                          <TableCell>
                            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30">
                              {alert.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="destructive" size="sm">
                              Respond
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Patients</CardTitle>
                  <CardDescription>A list of all patients under your care</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  disabled={isLoading} 
                  onClick={() => {
                    refetchPatients();
                    refetchAlerts();
                  }}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  {isLoading ? "Loading..." : "Refresh"}
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Vital Signs</TableHead>
                        <TableHead>Last Check</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No patients match your search criteria
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPatients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Heart className={`h-4 w-4 ${getVitalIconColor(patient.vitalStatus.heartRate)}`} />
                                  <span>{patient.heartRate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Thermometer className={`h-4 w-4 ${getVitalIconColor(patient.vitalStatus.temperature)}`} />
                                  <span>{patient.temperature}°C</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Activity className={`h-4 w-4 ${getVitalIconColor(patient.vitalStatus.bloodPressure)}`} />
                                  <span>{patient.bloodPressure}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Droplets className={`h-4 w-4 ${getVitalIconColor(patient.vitalStatus.bloodOxygen)}`} />
                                  <span>{patient.bloodOxygen}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{patient.lastCheck}</TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  patient.status === "Stable"
                                    ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                                    : patient.status === "Warning"
                                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                                      : "bg-red-100 text-red-600 dark:bg-red-900/30"
                                }`}
                              >
                                {patient.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/dashboard/caregiver/patients/${patient.id}`}>View Details</a>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vitals">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : filteredPatients.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No patients match your search criteria
                </div>
              ) : (
                filteredPatients.map(patient => (
                  <Card 
                    key={patient.id} 
                    className={
                      patient.status === "Critical" 
                        ? "border-red-200 bg-red-50/50 dark:bg-red-950/10" 
                        : patient.status === "Warning"
                          ? "border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/10"
                          : ""
                    }
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{patient.name}</CardTitle>
                        <Badge 
                          variant={
                            patient.status === "Stable" ? "outline" : 
                            patient.status === "Warning" ? "secondary" : "destructive"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Heart className={`h-4 w-4 ${getVitalIconColor(patient.vitalStatus.heartRate)}`} />
                              Heart Rate
                            </span>
                            <span>{patient.heartRate}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Thermometer className={`h-4 w-4 ${getVitalIconColor(patient.vitalStatus.temperature)}`} />
                              Temperature
                            </span>
                            <span>{patient.temperature}°C</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Activity className={`h-4 w-4 ${getVitalIconColor(patient.vitalStatus.bloodPressure)}`} />
                              BP
                            </span>
                            <span>{patient.bloodPressure}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Droplets className={`h-4 w-4 ${getVitalIconColor(patient.vitalStatus.bloodOxygen)}`} />
                              SpO₂
                            </span>
                            <span>{patient.bloodOxygen}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="mt-4 w-full" size="sm" asChild>
                        <a href={`/dashboard/caregiver/patients/${patient.id}`}>Patient Details</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

