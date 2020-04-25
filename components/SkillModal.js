

import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';

import PhaseInfo from '../data/phase';

import {
  SELECT_PHASE_KEY,
} from '../redux/modules/main';

const Modal = () => {
  const dispatch = useDispatch();

  const selectedPhaseKey = useSelector(state => state.main.selectedPhaseKey);
  const selectedPhaseOption = useSelector(state => state.main.selectedPhaseOption);
  if (!selectedPhaseKey) return null;
	return (
	  <div
	  	className={css`width: 100px;`}
	  >
		  <ReactModal
	        isOpen={!!selectedPhaseKey}
	        onRequestClose={
	        	() => dispatch({
		          type: SELECT_PHASE_KEY,
		          phaseKey: null
		      	})
	        }
	        ariaHideApp={false}
	        style={{
	        	content:{
				    top: '50%',
				    left: '50%',
				    right: 'auto',
				    bottom: 'auto',
				    marginRight: '-50%',
				    transform: 'translate(-50%, -50%)',
				    maxHeight: '80vh',
				    overflow: 'scroll'
  				}
  			}}
	      >
	        <button
	          className={css`
	          		float: right;
	          	`}
	          onClick={
	          	() => dispatch({
	              type: SELECT_PHASE_KEY,
	              phaseKey: null
	            })
	          }
	        >
	          X
	        </button>
	        <h3>{selectedPhaseOption.display_name}->{selectedPhaseKey.decision}->{selectedPhaseKey.card}->{selectedPhaseKey.name}</h3>

			{PhaseInfo.Phase_Key_Values.findIndex(kValue => kValue && kValue.phase_key === selectedPhaseKey.id) === -1 &&
				(<h2>
					Video Coming Soon...
				</h2>)}
	        {PhaseInfo.Phase_Key_Values.map(kValue => {
	        	if (kValue.phase_key !== selectedPhaseKey.id) return null;

	        	return (
	        		<div
	        			className={css`
	        				max-width: 600px;
	        			`}
	        			key={kValue.value}
	        		>
		        		<img
			        		src={`/dictionary_values/${kValue.value}`}
			        		width="100%"
			        	/>
		        	</div>
		        );
	        })}
	        <a
	        	href={`${location.protocol.concat('//').concat(location.host).concat(location.pathname)}?phaseKey=${selectedPhaseKey.id}&phase=${selectedPhaseOption.id}`}
	        	target="_blank"
	        >
	        	{`${location.protocol.concat('//').concat(location.host).concat(location.pathname)}?phaseKey=${selectedPhaseKey.id}&phase=${selectedPhaseOption.id}`}
	        </a>
	      </ReactModal>
      </div>
	);
}

export default Modal;