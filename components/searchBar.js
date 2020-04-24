import Select from 'react-select';

import PhaseInfo from '../data/phase';

const options = [];

PhaseInfo.Phase_Keys.map(k => {
	k.keys.map(kk => {
		options.push({value: kk.id, label: `${kk.decision}->${kk.card}->${kk.name}`});
		return true;
	})
	return true;
})

const SearchBar = () => {
	return (
		<Select
			instanceId={1}
			options={options}
		/>
	);
}

export default SearchBar;