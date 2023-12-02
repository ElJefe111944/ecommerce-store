import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa6"

const Rating = ({ value, text }) => {
    return (
        <div className="rating">
            {[1, 2, 3, 4, 5].map((rating) => (
                <span key={rating}>
                    {value >= rating ? (
                        <FaStar />
                    ) : value >= rating - 0.5 ? (
                        <FaStarHalf />
                    ) : (
                        <FaRegStar />
                    )}
                </span>
            ))}
            <span className="rating-text">{ text && text }</span>
        </div>

    )
}

export default Rating