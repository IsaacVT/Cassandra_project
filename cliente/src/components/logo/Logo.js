import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx }) => {

  const logo = (
    <Box
      component="img"
      src="/assets/logo.png"
      sx={{ width: 240, height: 100, cursor: 'pointer', ...sx }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
