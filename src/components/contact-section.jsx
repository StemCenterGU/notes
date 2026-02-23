"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  return (
    <section id="contact" className="py-16 px-5 bg-[rgba(168,21,21,0.809)] text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-10">
          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg shadow-lg text-center">
            <Phone className="w-8 h-8 text-[#f7d354] mb-3" />
            <span className="font-semibold text-lg">Phone No.</span>
            <span className="text-base opacity-90">(814) 871-7557</span>
          </div>

          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg shadow-lg text-center">
            <Mail className="w-8 h-8 text-[#f7d354] mb-3" />
            <span className="font-semibold text-lg">E-mail</span>
            <span className="text-base opacity-90">info@gannon.edu</span>
          </div>

          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg shadow-lg text-center">
            <MapPin className="w-8 h-8 text-[#f7d354] mb-3" />
            <span className="font-semibold text-lg">Address</span>
            <span className="text-base opacity-90">109 University Square, Erie PA 16541 United States</span>
          </div>

          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg shadow-lg text-center">
            <Clock className="w-8 h-8 text-[#f7d354] mb-3" />
            <span className="font-semibold text-lg">Opening Hours</span>
            <span className="text-base opacity-90">Monday - Friday (9:00 AM to 5:00 PM)</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/10 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            {submitted && (
              <div className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-400/40 bg-emerald-500/20 px-4 py-3 text-sm font-medium text-white shadow-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                <span>Your message has been sent successfully. We will get back to you soon!</span>
              </div>
            )}

            <div className="space-y-5">
              {/* First + Last Name row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40 focus-visible:border-white/50 transition-colors duration-150"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40 focus-visible:border-white/50 transition-colors duration-150"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-white">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40 focus-visible:border-white/50 transition-colors duration-150"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-white">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(000) 000-0000"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40 focus-visible:border-white/50 transition-colors duration-150"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-white">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="How can we help you?"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40 focus-visible:border-white/50 transition-colors duration-150 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#f7d354] to-[#f7971e] border-none text-white text-base font-semibold h-11 hover:opacity-90 hover:scale-[1.01] transition-all duration-200"
              >
                Send Message
              </Button>
            </div>
          </form>

          <div className="grid place-items-center mt-6 p-4 bg-gradient-to-r from-[#a81515] to-[#e63946] rounded-lg shadow-md overflow-hidden">
            <Image
              src="/images/contact.png"
              alt="Contact Us"
              width={300}
              height={200}
              className="w-full max-w-[300px] h-auto rounded object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
