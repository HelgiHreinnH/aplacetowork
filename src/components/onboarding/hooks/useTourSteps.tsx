
import { useMemo } from 'react';
import { TourStep } from '../types';

export const useTourSteps = () => {
  const tourSteps = useMemo<TourStep[]>(() => [
    {
      title: "Understand Space Parameters",
      customComponent: "SpaceParametersDemo",
      description: "", // Empty as the component contains its own description
    },
    {
      title: "Easy Navigation",
      description: "Use the menu bar at the bottom of the screen to navigate between different sections of the app.",
      images: [
        "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/userguide/Menubar.png",
        "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/userguide//Menu_Open.png"
      ]
    },
    {
      title: "Be Part of Our Evolution",
      description: "Your feedback influences future updates and workplace setting recommendations.",
      images: [
        "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/userguide//Feedback.png",
        "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/userguide/Notify.png"
      ],
      footer: "Your feedback is crucial to help us make 'A Place to Work' even better. We're committed to providing the most useful resource for workplace design, and your insights are essential."
    },
    {
      title: "What is to Come",
      customComponent: "FutureUpdates",
      description: "", // Empty as the component contains its own description
    }
  ], []);
  
  return tourSteps;
};
