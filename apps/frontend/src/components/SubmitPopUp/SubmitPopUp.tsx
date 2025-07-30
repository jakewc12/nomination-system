import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
}

const SubmitPopUp: React.FC<Props> = ({ open, setOpen, name }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <Alert
        onClose={() => setOpen(false)}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {name} Form Submitted!
      </Alert>
    </Snackbar>
  );
};

export default SubmitPopUp;
