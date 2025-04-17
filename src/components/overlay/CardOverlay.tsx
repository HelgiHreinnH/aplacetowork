
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AnimatedOverlay from './AnimatedOverlay';
import FacilityOverlayCard from './FacilityOverlayCard';

const CardOverlay = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const handleClose = () => {
    if (state?.backgroundLocation) {
      navigate(state.backgroundLocation.pathname);
    } else {
      navigate('/overview');
    }
  };

  return (
    <AnimatedOverlay onClose={handleClose}>
      {facilityId && <FacilityOverlayCard facilityId={facilityId} />}
    </AnimatedOverlay>
  );
};

export default CardOverlay;
