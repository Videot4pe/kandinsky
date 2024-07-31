import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { useSettingsStore } from "@/entities/settings/use-settings-store";

export function NegativePrompt({}) {
  const negativePrompt = useSettingsStore((state) => state.negativePrompt);
  const setNegativePrompt = useSettingsStore(
    (state) => state.setNegativePrompt
  );

  return (
    <div id="negative-prompt" className="grid gap-3">
      <Label htmlFor="content">Negative prompt</Label>
      <Textarea
        value={negativePrompt}
        onInput={(event) => setNegativePrompt(event.currentTarget.value)}
        id="content"
        placeholder="Acid colors..."
        className="min-h-[9.5rem]"
      />
    </div>
  );
}
