import { css } from 'emotion';

const MobileFlowChart = () => {
	return (
	  <div className={css`
	    position: relative;
	    @media (min-width: 1000px) {
	      display: none;
	    }`
	  }>
	    Mobile Flow Chart
	  </div>
	);
}

export default MobileFlowChart;
