
import React from 'react';
import { designTokens, componentTokens } from '@/styles/design-tokens';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { H1, H2, H3, H4, H5 } from '@/components/ui/typography';

export function DesignSystem() {
  // Helper function to convert color hex to a readable name
  const getColorName = (colorPath: string, colorValue: string) => {
    const path = colorPath.split('.');
    return path[path.length - 1] === 'DEFAULT' ? 
      path[path.length - 2] : 
      `${path[path.length - 2]}-${path[path.length - 1]}`;
  };

  // Recursively render color swatches
  const renderColorSwatches = (obj: any, path: string = '') => {
    return Object.entries(obj).map(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string') {
        return (
          <div key={currentPath} className="flex items-center space-x-2">
            <div 
              className="w-10 h-10 rounded-md border"
              style={{ backgroundColor: value as string }} 
            />
            <div>
              <p className="text-sm font-medium">{getColorName(currentPath, value as string)}</p>
              <p className="text-xs text-muted-foreground">{value as string}</p>
            </div>
          </div>
        );
      } else {
        return (
          <div key={currentPath} className="space-y-3">
            <h4 className="text-sm font-medium capitalize">{key}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {renderColorSwatches(value, currentPath)}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      <section>
        <H1>Design System</H1>
        <p className="text-muted-foreground mt-2">
          A showcase of our application's design tokens, styles, and components
        </p>
      </section>
      
      <section className="space-y-6">
        <H2>Colors</H2>
        {renderColorSwatches(designTokens.colors)}
      </section>

      <Separator />
      
      <section className="space-y-6">
        <H2>Typography</H2>
        <div className="space-y-4">
          <H1>Heading 1 - Noto Sans Display</H1>
          <H2>Heading 2 - Noto Sans Display</H2>
          <H3>Heading 3 - Noto Sans Display</H3>
          <H4>Heading 4 - Noto Sans Display</H4>
          <H5>Heading 5 - Noto Sans Display</H5>
          <p className="font-sans text-base">
            Body text - Noto Sans Regular. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc.
          </p>
          <p className="font-sans text-sm">
            Small text - Noto Sans Small. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="font-sans text-xs">
            Extra small text - Noto Sans Extra Small. Lorem ipsum dolor sit amet.
          </p>
        </div>
      </section>

      <Separator />
      
      <section className="space-y-6">
        <H2>Buttons</H2>
        <div className="flex flex-wrap gap-4">
          <Button variant="main">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="alert">Alert Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Rounded Button Styles:</p>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="main">Default Size</Button>
            <Button variant="secondary" size="sm">Small Size</Button>
            <Button variant="alert" size="lg">Large Size</Button>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Button Font Styles:</p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="space-y-1 text-center">
              <Button variant="main">XS Bold Text</Button>
              <p className="text-xs text-muted-foreground">text-xs font-bold</p>
            </div>
          </div>
        </div>
      </section>

      <Separator />
      
      <section className="space-y-6">
        <H2>Cards</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card content with medium radius styling. This demonstrates our card component with standard padding and typography.</p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle>Styled Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card with medium border radius and custom styling applied, showing how our base components can be extended.</p>
              <div className="mt-4">
                <Button variant="main" className="rounded-full">Rounded Button</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />
      
      <section className="space-y-6">
        <H2>Spacing</H2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(designTokens.spacing).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <div 
                className="bg-primary/20 border border-primary/30"
                style={{ width: value, height: value }} 
              />
              <span className="text-xs mt-1">{key}: {value}</span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <H2>Border Radius</H2>
        <div className="flex flex-wrap gap-6">
          {Object.entries(designTokens.borderRadius).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <div 
                className="bg-primary/20 border border-primary/30 w-16 h-16"
                style={{ borderRadius: value }} 
              />
              <span className="text-xs mt-1">{key}: {value}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="border p-4 rounded-md bg-neutral-50">
            <p className="font-medium mb-2">Card Border Radius (md)</p>
            <div className="w-full h-24 bg-primary/10 rounded-md border border-primary/30"></div>
          </div>
          <div className="border p-4 rounded-md bg-neutral-50">
            <p className="font-medium mb-2">Button Border Radius (full)</p>
            <Button variant="main" className="w-full">Rounded Button</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
