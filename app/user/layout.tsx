import Nav from "@/components/Nav"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
          <main className="min-h-screen flex flex-col  min-w-full">
          <Nav/>
            {children}
          </main>
    )
  }