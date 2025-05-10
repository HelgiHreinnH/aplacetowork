
import React from 'react';
import { designTokens } from '@/styles/design-tokens';
import { H4 } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';

const ColorPalette = () => {
  const colorGroups = {
    primary: designTokens.colors.primary,
    secondary: designTokens.colors.secondary,
    alert: designTokens.colors.alert,
    background: designTokens.colors.background,
    neutral: designTokens.colors.neutral,
  };

  const renderColorSwatch = (color: string, name: string) => (
    <div key={name} className="flex flex-col items-center">
      <div 
        className="h-14 w-14 rounded-md shadow-sm border border-gray-200" 
        style={{ backgroundColor: color }}
      />
      <span className="text-xs mt-1 font-medium">{name}</span>
      <span className="text-xs text-muted-foreground">{color}</span>
    </div>
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {Object.entries(colorGroups).map(([groupName, colors]) => (
            <div key={groupName}>
              <H4 className="mb-3 capitalize">{groupName}</H4>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                {Object.entries(colors).map(([name, color]) => (
                  renderColorSwatch(color as string, name === 'DEFAULT' ? groupName : `${groupName}-${name}`)
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPalette;
