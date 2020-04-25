import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import PhaseInfo from '../data/phase';

import {
  SELECT_PHASE_OPTION,
  SELECT_PHASE_KEY,
  SELECT_PHASE_CARD
} from '../redux/modules/main';

const options = [];

PhaseInfo.Phase_Keys.map(k => {
	k.keys.map(kk => {
		options.push({value: {...kk, phase: k.phase }, label: `${kk.decision}->${kk.card}->${kk.name}`});
		return true;
	})
	return true;
})

const SearchBar = () => {
 	const dispatch = useDispatch();
 	const selectedPhaseKey = useSelector(state => state.main.selectedPhaseKey);

	return (
		<Select
			instanceId={1}
			options={options}
			onChange={entry => {
				const {value} = entry;
				const phaseOption = PhaseInfo.Phase_Options[PhaseInfo.Phase_Options.findIndex(po => po.id === value.phase)];
				
				const phaseCard = PhaseInfo.Cards[PhaseInfo.Cards.findIndex(pcs => pcs.phase === value.phase)].cards;

				dispatch({
					type: SELECT_PHASE_OPTION,
					phaseOption,
				})

				dispatch({
					type: SELECT_PHASE_CARD,
					phaseCard,
				})

				dispatch({
					type: SELECT_PHASE_KEY,
					phaseKey: value
				});
			}}
		/>
	);
}

export default SearchBar;