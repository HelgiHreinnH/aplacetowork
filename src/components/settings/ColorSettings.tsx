
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save } from "lucide-react";

type ColorMode = 'standard' | 'dynamic';

const standardColors = {
  primary: '#222222',    // Dark Gray
  secondary: '#8E9196',  // Neutral Gray
  background: '#FFFFFF', // White
  text: '#000000',      // Black
};

const dynamicColors = {
  primary: '#9b87f5',
  secondary: '#7E69AB',
  background: '#FFFFFF',
  text: '#1A1F2C',
};

export function ColorSettings() {
  const [colorMode, setColorMode] = useState<ColorMode>('standard');
  const [colors, setColors] = useState(standardColors);

  const updateColors = (newColors: typeof colors) => {
    document.documentElement.style.setProperty('--primary-color', newColors.primary);
    document.documentElement.style.setProperty('--secondary-color', newColors.secondary);
    document.documentElement.style.setProperty('--background-color', newColors.background);
    document.documentElement.style.setProperty('--text-color', newColors.text);
    setColors(newColors);
  };

  const handleColorModeChange = (value: ColorMode) => {
    setColorMode(value);
    updateColors(value === 'standard' ? standardColors : dynamicColors);
    toast.success(`Switched to ${value} color mode`);
  };

  const handleReset = () => {
    updateColors(colorMode === 'standard' ? standardColors : dynamicColors);
    toast.success("Colors reset to default");
  };

  const handleColorChange = (colorKey: keyof typeof colors, value: string) => {
    const newColors = { ...colors, [colorKey]: value };
    updateColors(newColors);
  };

  const handleSaveSettings = () => {
    // Save to localStorage for persistence
    localStorage.setItem('colorMode', colorMode);
    localStorage.setItem('colorSettings', JSON.stringify(colors));
    toast.success("Color settings saved successfully");
  };

  // Load saved settings on component mount
  useState(() => {
    const savedMode = localStorage.getItem('colorMode') as ColorMode | null;
    const savedColors = localStorage.getItem('colorSettings');
    
    if (savedMode) {
      setColorMode(savedMode);
      if (savedColors) {
        updateColors(JSON.parse(savedColors));
      } else {
        updateColors(savedMode === 'standard' ? standardColors : dynamicColors);
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Color Mode</Label>
        <RadioGroup
          defaultValue="standard"
          value={colorMode}
          onValueChange={handleColorModeChange}
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
                value={colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="secondary">Secondary Color</Label>
            <div className="flex gap-2 items-center mt-1">
              <Input
                type="color"
                id="secondary"
                value={colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="background">Background Color</Label>
            <div className="flex gap-2 items-center mt-1">
              <Input
                type="color"
                id="background"
                value={colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="text">Text Color</Label>
            <div className="flex gap-2 items-center mt-1">
              <Input
                type="color"
                id="text"
                value={colors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <Button variant="outline" onClick={handleReset} className="w-full">
            Reset to Default Colors
          </Button>
        </div>
      )}

      <Button 
        onClick={handleSaveSettings} 
        className="w-full flex items-center justify-center gap-2"
      >
        <Save className="h-4 w-4" />
        Save Color Settings
      </Button>
    </div>
  );
}
