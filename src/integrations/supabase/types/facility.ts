export type Facility = {
  facility_id: string;
  Facility: string;
  Subtitle: string | null;
  Description: string | null;
  'Task Category': string | null;
  Priority: number | null;
  'Approx. Square Meters': string | null;
  'Approx. Users': string | null;
  Notes: string | null;
  'Purpose of the Facility': string | null;
  'Types of Activities Supported': string | null;
  'Amenities & Features': string | null;
  'Etiquette and Guidelines': string | null;
  'Technology Integration': string | null;
  'Sq M Min': number | null;
  'Sq M Max': number | null;
  'Users Min': number | null;
  'Users Max': number | null;
};

export type FacilityIndexValues = {
  facility_id: string;
  Facility: string;
  Priority: number | null;
  'Task Category': string | null;
  'Sq M Min': number | null;
  'Sq M Max': number | null;
  'Users Min': number | null;
  'Users Max': number | null;
};

export type FacilityTaskValues = {
  facility_id: string;
  Facility: string;
  'Task Category': string | null;
  'INT8 Task Value': number;
};

export type CombinedFacility = Facility & {
  'index_values'?: FacilityIndexValues;
  'task_values'?: FacilityTaskValues;
};