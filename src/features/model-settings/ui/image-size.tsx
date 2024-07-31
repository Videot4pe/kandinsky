import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { useSettingsStore } from "@/entities/settings/use-settings-store";

export function ImageSize({}) {
  const width = useSettingsStore((state) => state.width);
  const height = useSettingsStore((state) => state.height);
  const setWidth = useSettingsStore((state) => state.setWidth);
  const setHeight = useSettingsStore((state) => state.setHeight);

  return (
    <div id="image-size" className="grid grid-cols-2 gap-4">
      <div className="grid gap-3">
        <Label htmlFor="top-p">Width</Label>
        <Input
          value={width}
          onInput={(event) => setWidth(+event.currentTarget.value)}
          id="top-p"
          type="number"
          placeholder="1024"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="top-k">Height</Label>
        <Input
          value={height}
          onInput={(event) => setHeight(+event.currentTarget.value)}
          id="top-k"
          type="number"
          placeholder="1024"
        />
      </div>
    </div>
  );
}
