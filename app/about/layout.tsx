import type { Metadata, Viewport } from "next";

import "../proto.css";
import "./about.css";

export const metadata: Metadata = {
  title: "Proto — For Investors",
  description: "Proto investor mission, market, and founding team.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#121819",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
