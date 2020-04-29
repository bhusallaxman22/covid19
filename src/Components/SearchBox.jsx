
import React from 'react';

const SearchBox = ({ searchfield, searchChange}) => {
	return (
		<div className='text-center'>
	<input className='w-25 text-center'
		type='search' 
		placeholder='Search By Country' 
		onChange={searchChange}
	/>
	</div>
		);
}

export default SearchBox;