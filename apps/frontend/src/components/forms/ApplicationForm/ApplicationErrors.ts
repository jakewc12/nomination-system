export const ApplicationErrorMessages: Record<string, string> = {
  fullName: 'Full name is required',
  preferredFullName: 'Preferred name is required',
  phoneticPronunciation: 'Phonetic pronunciation is required',
  nickname: 'Nickname is required',
  northeasternID: 'Northeastern ID is required',
  pronouns: 'Pronouns are required',
  email: 'Email is required',
  phoneNumber: 'Phone number is required',
  year: 'Year is required',
  college: 'College is required',
  major: 'Major is required',
  minor: 'Minor is required',
  constituency: 'Constituency is required',
  constituencyType: 'Constituency type is required',
  constituencyName: 'Constituency name is required',
  returningSenatorType: 'Returning senator type is required',
  attestation: 'Please accept the acknowledgement',
  otherConstituencyName: 'Please enter the other constituency'
};
export interface ApplicationErrors {
  fullName: boolean;
  preferredFullName: boolean;
  phoneticPronunciation: boolean;
  nuid: boolean;
  pronouns: boolean;
  email: boolean;
  phoneNumber: boolean;
  year: boolean;
  college: boolean;
  major: boolean;
  constituency: boolean;
  constituencyType: boolean;
  constituencyName: boolean;
  returningSenatorType: boolean;
  attestation: boolean;
  otherConstituencyName?: boolean;
}
