"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    console.log("Form submitted", formData);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
      <p className="text-muted-foreground mb-6">
        Fill in the form below to request account registration. Our team will get back to you shortly.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="h-32"
              />
            </div>
            <Button type="submit" className="w-full">Submit Request</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-muted-foreground">
            <p className="flex items-center"><Mail className="mr-2" /> support@silverwatch.com</p>
            <p className="flex items-center"><Phone className="mr-2" /> +254 700 123 456</p>
            <p className="flex items-center"><MapPin className="mr-2" /> Nairobi, Kenya</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
