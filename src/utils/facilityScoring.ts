import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

export const calculateFacilityScore = (
  facility: Facility,
  squareMeters: number,
  users: number,
  taskValue: number
) => {
  let score = 0;
  
  // Square meters score (weighted 30%)
  if (facility["Sq M Min"] !== null && facility["Sq M Max"] !== null) {
    const facilityMidPoint = (facility["Sq M Min"] + facility["Sq M Max"]) / 2;
    const sqmDiff = Math.abs(squareMeters - facilityMidPoint);
    score += (1 - sqmDiff / 200) * 30; // Normalize by max possible difference
  }
  
  // Users score (weighted 30%)
  if (facility["Users Min"] !== null && facility["Users Max"] !== null) {
    const facilityMidPoint = (facility["Users Min"] + facility["Users Max"]) / 2;
    const usersDiff = Math.abs(users - facilityMidPoint);
    score += (1 - usersDiff / 50) * 30; // Normalize by max possible difference
  }
  
  // Task category score (weighted 40%)
  const facilityTaskValue = getTaskValue(facility["Task Category"]);
  if (facilityTaskValue !== null) {
    const taskDiff = Math.abs(taskValue - facilityTaskValue);
    score += (1 - taskDiff / 255) * 40; // Normalize by max possible difference
  }
  
  return score;
};

export const getTaskValue = (taskCategory: string | null): number | null => {
  const TaskCategoryMapping = {
    'Highly Concentrated Private Task': -128,
    'Concentrated Private Task': -85,
    'Focus Work Task': -42,
    'Learning/Development Task': 0,
    'Collaborative Task': 42,
    'Interactive Task': 85,
    'Social Task': 127,
  } as const;

  return taskCategory ? TaskCategoryMapping[taskCategory as keyof typeof TaskCategoryMapping] : null;
};

export const ValueToTaskCategory: { [key: number]: string } = {
  [-128]: 'Highly Concentrated Private Task',
  [-85]: 'Concentrated Private Task',
  [-42]: 'Focus Work Task',
  [0]: 'Learning/Development Task',
  [42]: 'Collaborative Task',
  [85]: 'Interactive Task',
  [127]: 'Social Task',
};