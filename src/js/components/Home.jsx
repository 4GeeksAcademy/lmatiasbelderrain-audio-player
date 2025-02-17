import React, { useEffect, useState } from "react";



//create your first component
const Home = () => {

	const [lista, setLista] = useState([])
	const getSongs = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/sound/songs")
			console.log(response)
			const data = await response.json()
			console.log(data.songs)
			setLista(data.songs)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getSongs()
	}, [])
	
	return (
		<div className="text-center container">
			<h1>Sound API</h1>
			<div className="row">
				<div className="col-12">
					{lista.map((cancion) => (

						<button className="btn btn-dark w-75 m-1">{cancion.name}</button>
					))}
				</div>
			</div>



		</div>
	);
};

export default Home;