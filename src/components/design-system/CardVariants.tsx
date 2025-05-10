
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { H2, H4 } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import { Star, Eye } from 'lucide-react';

const CardVariants = () => {
  return (
    <section>
      <H2 className="mb-4">Card Variants</H2>
      <p className="max-w-3xl mb-6">
        Different card styling variations used throughout the application to visually 
        differentiate content types and importance levels.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Default Card */}
        <div>
          <H4 className="mb-3">Default Card</H4>
          <Card>
            <CardHeader>
              <CardTitle>Standard Card</CardTitle>
              <CardDescription>The base card styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is our default card styling with standard padding and borders.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Action</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Elevated Card */}
        <div>
          <H4 className="mb-3">Elevated Card</H4>
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>With enhanced shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has increased elevation with a stronger shadow effect.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Action</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Bordered Card */}
        <div>
          <H4 className="mb-3">Bordered Card</H4>
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle>Bordered Card</CardTitle>
              <CardDescription>With colored border</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has a thicker, colored border to draw attention.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Action</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Accent Card */}
        <div>
          <H4 className="mb-3">Accent Card</H4>
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--primary-color)]"></div>
            <CardHeader className="pl-6">
              <CardTitle>Accent Card</CardTitle>
              <CardDescription>With left border accent</CardDescription>
            </CardHeader>
            <CardContent className="pl-6">
              <p>This card has a colored accent strip on the left side.</p>
            </CardContent>
            <CardFooter className="pl-6">
              <Button variant="outline" className="w-full">Action</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Interactive Card */}
        <div>
          <H4 className="mb-3">Interactive Card</H4>
          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>With hover effects</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has interactive hover effects to indicate it's clickable.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Action</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Image Card */}
        <div>
          <H4 className="mb-3">Image Card</H4>
          <Card className="overflow-hidden">
            <div className="h-40 bg-slate-200">
              <img 
                src="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png" 
                alt="Card image" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Image Card</CardTitle>
              <CardDescription>With top image</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card includes an image at the top of the content.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Action</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Featured Card */}
        <div>
          <H4 className="mb-3">Featured Card</H4>
          <Card className="bg-[#F1F0FB] border-0">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Featured Card</CardTitle>
                <Badge>Featured</Badge>
              </div>
              <CardDescription>With highlighted background</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has a colored background to highlight important content.</p>
            </CardContent>
            <CardFooter>
              <Button variant="main" className="w-full">Primary Action</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Metric Card */}
        <div>
          <H4 className="mb-3">Metric Card</H4>
          <Card>
            <CardHeader>
              <CardDescription>Total Views</CardDescription>
              <CardTitle className="text-3xl">2,451</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">+12.4% from last month</p>
              <Eye className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
        
        {/* Rating Card */}
        <div>
          <H4 className="mb-3">Rating Card</H4>
          <Card>
            <CardHeader>
              <CardTitle>Rating Card</CardTitle>
              <CardDescription>With star rating</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Shows content with an associated rating.</p>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= 4 ? "fill-[#ff8600] text-[#ff8600]" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">4.0</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CardVariants;
