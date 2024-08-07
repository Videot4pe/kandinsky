export type Preset = {
  name: string;
  prompt?: string;
  negative_prompt?: string;
  value?: string;
  label?: string;
  titleEn?: string;
};

export type PresetGroup = {
  mre?: Preset[];
  marc?: Preset[];
  sai?: Preset[];
  twri?: Preset[];
  fooocus?: Preset[];
  diva?: Preset[];
  defaultItems?: Preset[];
};

export type PresetGroupName = keyof PresetGroup;
