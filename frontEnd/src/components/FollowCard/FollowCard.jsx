const FollowCard = ({ following }) => {

    return (
        <div className="FollowCard">
            <img src={following.avatar} alt='' />
            <div className="info">
                <h5>{following.username}</h5>
                <p>{following.email}</p>
            </div>
        </div>
    )
}

export default FollowCard