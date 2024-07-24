import { useStylesQuery } from "@/entities/styles/queries";
import { groupedPresets, presets } from "@/shared/constants/presets";
import { Preset, PresetGroup, PresetGroupName } from "@/shared/model/presets";

export type Style = {
  name: string;
  title: string;
};

const formatItems = (item: Preset): Preset => ({
  ...item,
  value: item.name,
  label: item.titleEn ?? item.name,
});

export function useStyles() {
  const stylesQuery = useStylesQuery();

  const items = stylesQuery.data ?? [];

  const formattedItems = items.map(formatItems);
  const formattedPresets = presets.map(formatItems);
  const formattedGroupedPresets = Object.keys(groupedPresets).reduce(
    (acc: PresetGroup, group: string): PresetGroup =>
      <PresetGroup>{
        ...acc,
        [group as PresetGroupName]:
          groupedPresets[group as PresetGroupName]?.map(formatItems) ?? [],
      },
    {}
  );

  const comboboxItems = [...formattedItems, ...formattedPresets];
  const comboboxGroupItems = {
    defaultItems: formattedItems,
    ...formattedGroupedPresets,
  };

  return { comboboxItems, comboboxGroupItems };
}
