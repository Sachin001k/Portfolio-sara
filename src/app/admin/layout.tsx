import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Sara Hulyalkar",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
