import Carousel from "./Carousel"
import "./App.css"

function App() {
	return (
		<>
			<div>
				<Carousel
					autoScroll={true}
					interval={3000}
				/>
			</div>
		</>
	)
}

export default App
