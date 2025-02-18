import React, { useEffect, useRef, useState } from "react";



//create your first component
const Home = () => {

	const [lista, setLista] = useState([])
	const activeSong = useRef()
	let [song, setSong] = useState(0)

	const getSongs = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/sound/songs")
			// console.log(response)
			const data = await response.json()
			// console.log(data.songs)
			setLista(data.songs)
		} catch (error) {
			console.log(error);
		}
	}
	const playSong = (urlCancion, id) => {

		activeSong.current.src = "https://playground.4geeks.com" + urlCancion
		// console.log(activeSong.current)
		activeSong.current.play()
		setSong(id - 1)
	}

	const playNext = () => {
		setSong(song++)
		let urlCancion = lista[song].url
		activeSong.current.src = "https://playground.4geeks.com" + urlCancion
		activeSong.current.play()
	}

	const playPrevious = () => {
		setSong(song--)
		let urlCancion = lista[song].url
		activeSong.current.src = "https://playground.4geeks.com" + urlCancion
		activeSong.current.play()
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

						<button
							key={cancion.id}
							className="btn btn-dark w-50 m-1"
							onClick={() => playSong(cancion.url, cancion.id)}
							value={cancion}
						>{cancion.name}</button>
					))}
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<button className="btn btn-outline-dark" 
				onClick={playPrevious}
				>
					<i className="fa fa-backward"></i>
				</button>

				<audio ref={activeSong} controls>
					<source src={activeSong} type="audio/mp3" />

				</audio>
				<button className="btn btn-outline-dark"
				onClick={playNext}
				>
					<i className="fa fa-forward"></i>
				</button>
			</div>



		</div>
	);
};

export default Home;