
import React from 'react';
import { motion } from 'framer-motion';
import { Bulletin, H3, Note } from "@/components/ui/typography";
import InfoSection from "@/components/InfoSection";
import { Card, CardContent } from "@/components/ui/card";

const FutureUpdatesStep: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-full w-full max-w-lg mx-auto">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="mb-6 text-center">
          <H3 className="text-2xl font-bold text-[#3f00ff] mb-4">What is to Come</H3>
          <p className="text-[#8E9196]">
            We're constantly working to improve your experience. Here are some exciting updates coming in the future weeks:
          </p>
        </div>
        
        <Card className="mb-6 shadow-md">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Bulletin>Images on all facilities</Bulletin>
              <Bulletin>Layout and usability updates</Bulletin>
              <Bulletin>More workplace facilities and settings</Bulletin>
              <Bulletin>Enhanced search functionality</Bulletin>
            </div>
          </CardContent>
        </Card>

        <Note className="my-6">
          We look at features and feedback daily. Reach out to us - maybe <span className="text-[#3f00ff]">your feature</span> will be added next!
        </Note>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
          <p className="text-sm text-[#8E9196]">
            Thank you for joining us on this journey to create better workspaces together.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FutureUpdatesStep;
