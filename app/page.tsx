import { WorldShell } from "@/components/shared/WorldShell";
import { DossierWorld } from "@/components/worlds/dossier/DossierWorld";

export default function Page() {
  return (
    <WorldShell world="dossier">
      <DossierWorld />
    </WorldShell>
  );
}
