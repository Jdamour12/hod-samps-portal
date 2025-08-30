"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Search, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export function HeaderContent({ children }: { children: React.ReactNode }) {
  const [selectedRole, setSelectedRole] = React.useState("HOD");
  const [selectedAcademicPeriod, setSelectedAcademicPeriod] =
    React.useState("2024 Semester 1");
  const [selectedAcademicYear, setSelectedAcademicYear] =
    React.useState("2024 - 2025");
  const roles = ["Lecturer", "HOD", "Dean", "DTLE"];

  return (
    <SidebarInset>
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl text-[#026892] tracking-tight">
            SAMPS UR
          </span>
        </div>
        {/* Notifications, Selectors, User */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-50 min-w-[150px]"
              >
                {selectedAcademicYear}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onSelect={() => setSelectedAcademicYear("2024 - 2025")}
              >
                2024 - 2025
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setSelectedAcademicYear("2023 - 2024")}
              >
                2023 - 2024
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-50 min-w-[150px]"
              >
                {selectedAcademicPeriod}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onSelect={() => setSelectedAcademicPeriod("2024 Semester 1")}
              >
                2024 Semester 1
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setSelectedAcademicPeriod("2023 Semester 2")}
              >
                2023 Semester 2
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-50 min-w-[120px]"
              >
                {selectedRole}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roles.map((role) => (
                <DropdownMenuItem
                  key={role}
                  onSelect={() => setSelectedRole(role)}
                >
                  {role}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-gray-100"
          >
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d32f2f] text-xs text-white font-bold">
              5
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-gray-300 h-9 w-9 hover:bg-gray-100"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="/placeholder-user.jpg?height=32&width=32&query=user%20avatar"
                    alt="User Avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
        {children}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t text-xs text-gray-500 bg-white">
        <p>&copy; {new Date().getFullYear()} SAMPS UR. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="hover:underline underline-offset-4">
            Version 2.1.0
          </Link>
          <Link href="#" className="hover:underline underline-offset-4">
            Support
          </Link>
          <Link href="#" className="hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="#" className="hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="#" className="hover:underline underline-offset-4">
            Feedback
          </Link>
          <Link href="#" className="hover:underline underline-offset-4">
            Last Updated: Aug 2025
          </Link>
        </nav>
      </footer>
    </SidebarInset>
  );
}
