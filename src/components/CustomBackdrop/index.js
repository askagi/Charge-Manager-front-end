import Backdrop from '@mui/material/Backdrop';
import { CustomCircularProgress } from './styles';

export default function CustomBackdrop({ open }) {

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CustomCircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}

