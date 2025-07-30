export const NominationErrorMessages: Record<string, string> = {
  fullName: 'Full name is required',
  email: 'Email is required',
  nominee: 'Nominee is required',
  constituency: 'Constituency is required',
  college: 'College is required',
  major: 'Major is required',
  graduationYear: 'Graduation Year is required',
  otherConstituency: 'Please enter the other constituency name'
};

export interface NominationErrors {
  fullName: boolean;
  email: boolean;
  nominee: boolean;
  constituency: boolean;
  college: boolean;
  major: boolean;
  graduationYear: boolean;
  otherConstituency: boolean;
}
