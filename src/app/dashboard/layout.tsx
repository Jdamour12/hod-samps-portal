"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function LecturerDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRoles={["HOD"]}>{children}</ProtectedRoute>
  );
}
