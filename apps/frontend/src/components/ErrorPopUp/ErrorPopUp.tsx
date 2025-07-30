import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
}

const ErrorPopUp: React.FC<Props> = ({ open, setOpen, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <Alert
        onClose={() => setOpen(false)}
        severity='error'
        variant="filled"
        sx={{ width: '100%' }}
      >
        Error: {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorPopUp;
