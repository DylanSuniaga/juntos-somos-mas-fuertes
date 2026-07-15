import { WorldShell } from "@/components/shared/WorldShell";
import { OrganicWorld } from "@/components/worlds/organic/OrganicWorld";

export default function Page() {
  return (
    <WorldShell world="organic">
      <OrganicWorld />
    </WorldShell>
  );
}
