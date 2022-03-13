import React from 'react';

import IconButton from '../../components/IconButton';
import IconInfoCircle from '../../icons/IconInfoCircle';
import Tooltip, { TooltipContainer } from '../../components/Tooltip';
import PriceSummary from './PriceSummary';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const PriceInfo = ({ summary, totalPrice }) => {
  const ref = React.useRef();
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  // Close on click outside of the tooltip
  useOnClickOutside(ref, () => setTooltipOpen(false));

  return (
    <TooltipContainer ref={ref}>
      <IconButton onClick={() => setTooltipOpen(!isTooltipOpen)} title='Cart Summary'>
        <IconInfoCircle size="20" />
      </IconButton>
      {isTooltipOpen ? (
        <Tooltip>
          <PriceSummary summary={summary} totalPrice={totalPrice} />
        </Tooltip>
      ) : null}
    </TooltipContainer>
  );
};

export default PriceInfo;
