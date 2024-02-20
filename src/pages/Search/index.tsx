import React from 'react';
import Layout from "../../components/Layout";
import {useRouter} from "next/router";

const Search: () => JSX.Element = () => {
	const router = useRouter();
	const {disease, department} = router.query;
	
	return (
		<Layout>
			<div>
				여기는 병원검색!<br/>
				{disease}<br/>
				{department}
			</div>
		</Layout>
	);
};

export default Search;
