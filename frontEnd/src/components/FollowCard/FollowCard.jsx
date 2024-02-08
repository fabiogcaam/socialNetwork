const FollowCard = ({ follow }) => {

    return (
        <div className="FollowCard d-flex">
            <div>
                <img src={follow.avatar} alt='' />
            </div>
            <div className="info">
                <h5>{follow.username}</h5>
                <p>{follow.email}</p>
            </div>
        </div>
    )
}

export default FollowCard