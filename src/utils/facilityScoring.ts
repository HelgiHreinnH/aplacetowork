import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

export const calculateFacilityScore = (
  facility: Facility,
  squareMeters: number,
  users: number,
  taskValue: number
): number => {
  let score = 0;
  const weights = {
    squareMeters: 0.3, // 30%
    users: 0.3,        // 30%
    taskCategory: 0.4  // 40%
  };
  
  // Square meters score
  if (facility["Sq M Min"] !== null && facility["Sq M Max"] !== null) {
    const facilityMidPoint = (facility["Sq M Min"] + facility["Sq M Max"]) / 2;
    const sqmDiff = Math.abs(squareMeters - facilityMidPoint);
    const maxPossibleDiff = 200; // Maximum difference in square meters
    const sqmScore = Math.max(0, 1 - (sqmDiff / maxPossibleDiff));
    score += sqmScore * weights.squareMeters * 100;
    console.log(`Square meters score for ${facility.Facility}:`, sqmScore * weights.squareMeters * 100);
  }
  
  // Users score
  if (facility["Users Min"] !== null && facility["Users Max"] !== null) {
    const facilityMidPoint = (facility["Users Min"] + facility["Users Max"]) / 2;
    const usersDiff = Math.abs(users - facilityMidPoint);
    const maxPossibleDiff = 50; // Maximum difference in users
    const usersScore = Math.max(0, 1 - (usersDiff / maxPossibleDiff));
    score += usersScore * weights.users * 100;
    console.log(`Users score for ${facility.Facility}:`, usersScore * weights.users * 100);
  }
  
  // Task category score
  const facilityTaskValue = getTaskValue(facility["Task Category"]);
  if (facilityTaskValue !== null) {
    const taskDiff = Math.abs(taskValue - facilityTaskValue);
    const maxPossibleDiff = 255; // Maximum difference in task values
    const taskScore = Math.max(0, 1 - (taskDiff / maxPossibleDiff));
    score += taskScore * weights.taskCategory * 100;
    console.log(`Task score for ${facility.Facility}:`, taskScore * weights.taskCategory * 100);
  }
  
  console.log(`Total score for ${facility.Facility}:`, score);
  return score;
};

export const getTaskValue = (taskCategory: string | null): number | null => {
  if (!taskCategory) return null;
  
  // Handle multiple task categories
  if (taskCategory.includes(',')) {
    const categories = taskCategory.split(',').map(cat => cat.trim());
    // Return the average value of all categories
    const values = categories
      .map(cat => TaskCategoryMapping[cat as keyof typeof TaskCategoryMapping])
      .filter((val): val is number => val !== undefined);
    
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : null;
  }
  
  return TaskCategoryMapping[taskCategory as keyof typeof TaskCategoryMapping] ?? null;
};

const TaskCategoryMapping = {
  'Highly Concentrated Private Task': -128,
  'Concentrated Private Task': -85,
  'Focus Work Task': -42,
  'Learning/Development Task': 0,
  'Collaborative Task': 42,
  'Interactive Task': 85,
  'Social Task': 127,
} as const;

export const ValueToTaskCategory: { [key: number]: string } = {
  [-128]: 'Highly Concentrated Private Task',
  [-85]: 'Concentrated Private Task',
  [-42]: 'Focus Work Task',
  [0]: 'Learning/Development Task',
  [42]: 'Collaborative Task',
  [85]: 'Interactive Task',
  [127]: 'Social Task',
};