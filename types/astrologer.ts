// Shared types for astrologer-related interfaces

export interface Certification {
  id?: number;
  courseName: string;
  instituteName: string;
  yearOfCompletion: string;
  certificateFile?: string;
  file?: File;
  status?: string;
  remarks?: string;
}

export interface Education {
  id?: number;
  qualification: string;
  fieldOfStudy: string;
  universityName: string;
  degreeFile?: string;
  file?: File;
  status?: string;
  remarks?: string;
}
