export type Facility = {
  "Amenities & Features": string | null;
  "Approx. Square Meters": string | null;
  "Approx. Users": string | null;
  Description: string | null;
  "Etiquette and Guidelines": string | null;
  Facility: string;
  facility_id: string;
  Notes: string | null;
  Priority: number | null;
  "Purpose of the Facility": string | null;
  "Sq M Max": number | null;
  "Sq M Min": number | null;
  Subtitle: string | null;
  "Task Category": string | null;
  "Technology Integration": string | null;
  "Types of Activities Supported": string | null;
  "Users Max": number | null;
  "Users Min": number | null;
};

export type FacilityIndexValues = {
  Facility: string;
  Priority: number | null;
  "Task Category": string | null;
  "Sq M Min": number | null;
  "Sq M Max": number | null;
  "Users Min": number | null;
  "Users Max": number | null;
  facility_id: string;
};

export type FacilityTaskValues = {
  Facility: string;
  "Task Category": string | null;
  "INT8 Task Value": number;
  facility_id: string;
};

export type CombinedFacility = Facility & {
  "Facilities index values": Omit<FacilityIndexValues, 'Facility'>;
  "Facility task values": Omit<FacilityTaskValues, 'Facility'>;
};