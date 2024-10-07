/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react"
import "./Carousel.css"

const apiKey = "HgZrVZ3I_P66xSiugMXnZ_YDmIk0MNHM_66hWZU59i4"
const count = 30

const Carousel = ({ autoScroll = true, interval = 3000 }) => {
	const [images, setImages] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)

	// Fetch images from Unsplash API when the component mounts
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await fetch(
					`https://api.unsplash.com/photos/random/?client_id=${apiKey}&orientation=landscape&count=${count}`
				)
				const data = await response.json()
				// Extracting image URLs from the fetched data
				const imageUrls = data.map((item) => item.urls.regular)
				setImages(imageUrls)
			} catch (error) {
				console.error("Error fetching images:", error)
			}
		}

		fetchImages()
	}, [])

	// Handle next image
	const nextImage = useCallback(() => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		)
	}, [images.length])

	// Handle previous image
	const prevImage = useCallback(() => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		)
	}, [images.length])

	// Auto-scroll images
	useEffect(() => {
		if (autoScroll && images.length > 0) {
			const autoSlide = setInterval(nextImage, interval)
			return () => clearInterval(autoSlide)
		}
	}, [currentIndex, autoScroll, interval, images.length, nextImage, prevImage])

	return (
		<div className="carousel">
			{images.length > 0 ? (
				<>
					<button
						className="prev"
						onClick={prevImage}
					>
						❮
					</button>
					<div className="carousel-images">
						{images.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={`Slide ${index}`}
								className={index === currentIndex ? "active" : "inactive"}
							/>
						))}
					</div>
					<button
						className="next"
						onClick={nextImage}
					>
						❯
					</button>
				</>
			) : (
				<p>Loading images...</p>
			)}
		</div>
	)
}

export default Carousel
