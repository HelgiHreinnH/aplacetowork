
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { H1, H2, H3, H4 } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';

export function FontDemo() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <section>
        <H1>Noto Sans Font System</H1>
        <p className="text-muted-foreground mt-2">
          A showcase of our application's typography using the Noto Sans family
        </p>
      </section>
      
      <Card>
        <CardHeader>
          <CardTitle>Noto Sans Display - For Headings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <H1>Heading 1 - Noto Sans Display</H1>
            <H2>Heading 2 - Noto Sans Display</H2>
            <H3>Heading 3 - Noto Sans Display</H3>
            <H4>Heading 4 - Noto Sans Display</H4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 border rounded-lg">
              <h3 className="font-display font-bold mb-2">Bold (700)</h3>
              <p className="font-display font-bold">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-display font-semibold mb-2">Semibold (600)</h3>
              <p className="font-display font-semibold">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-display font-medium mb-2">Medium (500)</h3>
              <p className="font-display font-medium">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Noto Sans - For Body Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-sans text-body-lg">
            Body Large - Noto Sans Regular. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc.
          </p>
          <p className="font-sans text-body">
            Body Regular - Noto Sans Regular. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc.
          </p>
          <p className="font-sans text-small">
            Small text - Noto Sans Small. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="font-sans text-xs">
            Extra small text - Noto Sans Extra Small. Lorem ipsum dolor sit amet.
          </p>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-sans font-bold mb-2">Bold (700)</h3>
              <p className="font-sans font-bold">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-sans font-semibold mb-2">Semibold (600)</h3>
              <p className="font-sans font-semibold">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-sans font-normal mb-2">Regular (400)</h3>
              <p className="font-sans font-normal">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Noto Sans Mono - For Code</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="font-mono text-sm">
              {`function example() {
  console.log("This is Noto Sans Mono");
  return {
    result: "Perfect for code blocks and technical content"
  };
}`}
            </code>
          </pre>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-mono font-bold mb-2">Bold (700)</h3>
              <p className="font-mono font-bold">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-mono font-normal mb-2">Regular (400)</h3>
              <p className="font-mono font-normal">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
