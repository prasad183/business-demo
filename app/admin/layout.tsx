import { AdminLayout } from '@/components/ui/AdminLayout';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout role="Owner">{children}</AdminLayout>;
}

