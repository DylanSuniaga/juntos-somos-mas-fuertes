import { WorldShell } from "@/components/shared/WorldShell";
import { EditorialWorld } from "@/components/worlds/editorial/EditorialWorld";

export default function Page() {
  return (
    <WorldShell world="editorial">
      <EditorialWorld />
    </WorldShell>
  );
}
