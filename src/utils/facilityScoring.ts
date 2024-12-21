import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

// Define valid task values as a union type
type TaskValue = -128 | -85 | -42 | 0 | 42 | 85 | 127;

export const TaskCategoryMapping = {
  'Highly Concentrated Private Task': -128 as TaskValue,
  'Concentrated Private Task': -85 as TaskValue,
  'Focus Work Task': -42 as TaskValue,
  'Learning/Development Task': 0 as TaskValue,
  'Collaborative Task': 42 as TaskValue,
  'Interactive Task': 85 as TaskValue,
  'Social Task': 127 as TaskValue,
} as const;

export const ValueToTaskCategory: { [K in TaskValue]: string } = {
  [-128]: 'Highly Concentrated Private Task',
  [-85]: 'Concentrated Private Task',
  [-42]: 'Focus Work Task',
  [0]: 'Learning/Development Task',
  [42]: 'Collaborative Task',
  [85]: 'Interactive Task',
  [127]: 'Social Task',
};

export const calculateFacilityScore = (
  facility: Facility,
  squareMeters: number,
  users: number,
  taskValue: TaskValue
): number => {
  let score = 0;
  const weights = {
    squareMeters: 0.3,
    users: 0.3,
    taskCategory: 0.4
  };

  // Square meters score
  if (facility["Sq M Min"] !== null && facility["Sq M Max"] !== null) {
    const facilityMidPoint = (facility["Sq M Min"] + facility["Sq M Max"]) / 2;
    const sqmDiff = Math.abs(squareMeters - facilityMidPoint);
    const maxPossibleDiff = 200;
    const sqmScore = Math.max(0, 1 - (sqmDiff / maxPossibleDiff));
    score += sqmScore * weights.squareMeters * 100;
    console.log(`Square meters score for ${facility.Facility}:`, sqmScore * weights.squareMeters * 100);
  }

  // Users score
  if (facility["Users Min"] !== null && facility["Users Max"] !== null) {
    const facilityMidPoint = (facility["Users Min"] + facility["Users Max"]) / 2;
    const usersDiff = Math.abs(users - facilityMidPoint);
    const maxPossibleDiff = 50;
    const usersScore = Math.max(0, 1 - (usersDiff / maxPossibleDiff));
    score += usersScore * weights.users * 100;
    console.log(`Users score for ${facility.Facility}:`, usersScore * weights.users * 100);
  }

  // Task category score
  const facilityTaskValue = getTaskValue(facility["Task Category"]);
  if (facilityTaskValue !== null) {
    const taskDiff = Math.abs(taskValue - facilityTaskValue);
    const maxPossibleDiff = 255;
    const taskScore = Math.max(0, 1 - (taskDiff / maxPossibleDiff));
    score += taskScore * weights.taskCategory * 100;
    console.log(`Task score for ${facility.Facility}:`, taskScore * weights.taskCategory * 100);
  }

  console.log(`Total score for ${facility.Facility}:`, score);
  return score;
};

export const getTaskValue = (taskCategory: string | null): TaskValue | null => {
  if (!taskCategory) return null;

  // Handle multiple task categories
  if (taskCategory.includes(',')) {
    const categories = taskCategory.split(',').map(cat => cat.trim());
    // Return the average value of all categories
    const values = categories
      .map(cat => TaskCategoryMapping[cat as keyof typeof TaskCategoryMapping])
      .filter((val): val is TaskValue => val !== undefined);

    if (values.length === 0) return null;
    
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    // Find the closest valid task value
    const validValues = Object.values(TaskCategoryMapping) as TaskValue[];
    return validValues.reduce((prev, curr) => 
      Math.abs(curr - average) < Math.abs(prev - average) ? curr : prev
    );
  }

  return TaskCategoryMapping[taskCategory as keyof typeof TaskCategoryMapping] ?? null;
};