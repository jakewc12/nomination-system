import { SampleForm, Introduction } from '../FormStyles';
import { Button } from '@mui/material';

interface Props {
  handleNext: () => void;
}

export const ApplicationFormIntro: React.FC<Props> = ({ handleNext }) => {
  return (
    <>
      <SampleForm>
        <Introduction>
          <h2>SGA Senator Application Form</h2>
          Thank you for your interest in joining the Student Government
          Association (SGA)! SGA serves as the voice of the undergraduate
          student body and strives to promote student interests in the
          university and its surrounding communities. We have many active
          projects and initiatives. Read more about our work{' '}
          <a
            href="https://northeasternsga.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .<br></br>
          <br></br>
          Any undergraduate student in good academic and judicial standing is
          eligible to apply to become a senator. There are no elections. Read
          more about the process to become a senator in the{' '}
          <a
            href="https://www.northeasternsga.com/become-a-senator"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            frequently asked questions document
          </a>{' '}
          and please contact the Senate Speaker at
          sgaSenateSpeaker@northeastern.edu with any questions.
          <br></br>
          <br></br>
          This form is the first step in becoming a senator, the second step is
          to gather signatures. For your application to be accepted, you need to
          collect at least 30 nominations from students in your constituency. If
          you are applying to be a special interest senator and your
          organization has less than 40 members, you must get three fourths of
          the organization’s members’ signatures. This form must be submitted so
          your name can be automatically added to the signature collection form.
          Both forms will stop accepting submissions on January 30th at 11:59 pm
          EST.
          <br></br>
          <br></br>
          Welcome to SGA!
        </Introduction>
      </SampleForm>
      <Button
        size="large"
        variant="contained"
        onClick={() => {
          handleNext();
        }}
      >
        Start Application
      </Button>
    </>
  );
};
