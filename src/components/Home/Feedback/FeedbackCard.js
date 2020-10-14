import React from 'react'

const FeedbackCard = ({ feedback }) => {
    return (
        <div className="col-lg-4 reviewer">
            <div className="reviewer-details">
                <div className="reviewer-top d-flex align-items-center">
                    <img className="img-fluid" src={feedback.image} alt={feedback.name} />
                    <div className="reviewer-head">
                        <h4>{feedback.reviewer}</h4>
                        <p>{feedback.position}</p>
                    </div>
                </div>
                <div className="review">
                    <p>{feedback.review}</p>
                </div>
            </div>
        </div>
    )
}

export default FeedbackCard