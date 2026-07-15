import { WorldShell } from "@/components/shared/WorldShell";
import { PosterWorld } from "@/components/worlds/poster/PosterWorld";

export default function Page() {
  return (
    <WorldShell world="poster">
      <PosterWorld />
    </WorldShell>
  );
}
