import type { Metadata, Viewport } from "next";

import { PROTO_FONT_CLASS, PROTO_FONT_VARIABLE, PROTO_NAV_LOGO_FONT_VARIABLE } from "@/lib/proto/proto-font";
import { protoPageBootstrapScript } from "@/lib/proto/proto-layout";

import "./globals.css";
import "./proto.css";

export const metadata: Metadata = {
  title: "Proto",
  description: "Proto — hiring platform for the intelligence era.",
  icons: {
    icon: "/images/Favicon.png",
    apple: "/images/Favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#121819",
};

const protoBootstrap = protoPageBootstrapScript();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: protoBootstrap }} />
      </head>
      <body className={`${PROTO_FONT_VARIABLE} ${PROTO_NAV_LOGO_FONT_VARIABLE} ${PROTO_FONT_CLASS} antialiased`}>
        {children}
      </body>
    </html>
  );
}
