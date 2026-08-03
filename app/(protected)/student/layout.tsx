import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Student Portal – Alpha Classes",
  description: "Student dashboard to track homework, fees, and class updates",
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
