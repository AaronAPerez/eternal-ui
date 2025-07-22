import { ClientFeatureFlagWrapper } from "@/components/ClientFeatureFlagWrapper";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientFeatureFlagWrapper>
          {children}
        </ClientFeatureFlagWrapper>
      </body>
    </html>
  );
}