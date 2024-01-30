import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/globalStyles";
import { AlertProvider } from "@/lib/contexts";
import AlertPopup from "@/components/ui/alert";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brave test",
  description: "Brave test oplata mobilki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <AlertProvider>
            <AlertPopup />
            {children}
          </AlertProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
