import Navbar from "@/components/Layouts/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      {children}
    </div>
  );
}
