import { getWorld, type WorldId } from "@/lib/worlds";
import { WorldPicker } from "./WorldPicker";

/** Wraps a world's page: stamps its palette/fonts via `data-theme` (SSR-static,
 *  no flash) and mounts the shared world picker. */
export function WorldShell({
  world,
  children,
}: {
  world: WorldId;
  children: React.ReactNode;
}) {
  const w = getWorld(world);
  return (
    <div data-theme={w.theme} className="relative min-h-screen bg-ground text-ink">
      <WorldPicker current={world} />
      {children}
    </div>
  );
}
