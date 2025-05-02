
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { useTheme } from '@/providers/ThemeProvider';
import { designTokens } from '@/styles/design-tokens';

export function ColorSettings() {
  const { colorMode, setColorMode, colors, updateColors } = useTheme();
  const [localColors, setLocalColors] = useState(colors);

  const standardColors = {
    primary: designTokens.colors.text.dark,    // Dark Gray
    secondary: designTokens.colors.neutral[600],  // Neutral Gray
    background: designTokens.colors.neutral[100], // White
    text: designTokens.colors.neutral[900],      // Black
  };

  const dynamicColors = {
    primary: designTokens.colors.primary.DEFAULT,
    secondary: designTokens.colors.secondary.DEFAULT,
    background: designTokens.colors.background.DEFAULT,
    text: designTokens.colors.text.DEFAULT,
  };

  const handleColorModeChange = (value: 'standard' | 'dynamic') => {
    setColorMode(value);
    setLocalColors(value === 'standard' ? standardColors : dynamicColors);
    toast.success(`Switched to ${value} color mode`);
  };

  const handleReset = () => {
    const defaultColors = colorMode === 'standard' ? standardColors : dynamicColors;
    setLocalColors(defaultColors);
    updateColors(defaultColors);
    toast.success("Colors reset to default");
  };

  const handleColorChange = (colorKey: keyof typeof localColors, value: string) => {
    const newColors = { ...localColors, [colorKey]: value };
    setLocalColors(newColors);
  };

  const handleSaveSettings = () => {
    updateColors(localColors);
    toast.success("Color settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Color Mode</Label>
        <RadioGroup
          defaultValue="standard"
          value={colorMode}
          onValueChange={(v) => handleColorModeChange(v as 'standard' | 'dynamic')}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard">Standard</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dynamic" id="dynamic" />
            <Label htmlFor="dynamic">Dynamic</Label>
          </div>
        </RadioGroup>
      </div>

      {colorMode === 'dynamic' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="primary">Primary Color</Label>
            <div className="flex gap-2 items-center mt-1">
              <Input
                type="color"
                id="primary"
                value={localColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer rounded-lg"
              />
              <Input
                type="text"
                value={localColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="flex-1 rounded-lg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="secondary">Secondary Color</Label>
            <div className="flex gap-2 items-center mt-1">
              <Input
                type="color"
                id="secondary"
                value={localColors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer rounded-lg"
              />
              <Input
                type="text"
                value={localColors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="flex-1 rounded-lg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="background">Background Color</Label>
            <div className="flex gap-2 items-center mt-1">
              <Input
                type="color"
                id="background"
                value={localColors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer rounded-lg"
              />
              <Input
                type="text"
                value={localColors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="flex-1 rounded-lg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="text">Text Color</Label>
            <div className="flex gap-2 items-center mt-1">
              <Input
                type="color"
                id="text"
                value={localColors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer rounded-lg"
              />
              <Input
                type="text"
                value={localColors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className="flex-1 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={handleReset} className="rounded-lg">
              Reset to Default Colors
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings} 
          variant="main"
          className="rounded-xl flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Color Settings
        </Button>
      </div>
    </div>
  );
}
