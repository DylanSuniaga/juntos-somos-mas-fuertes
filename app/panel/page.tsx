import { WorldShell } from "@/components/shared/WorldShell";
import { DashboardWorld } from "@/components/worlds/dashboard/DashboardWorld";

export default function Page() {
  return (
    <WorldShell world="dashboard">
      <DashboardWorld />
    </WorldShell>
  );
}
