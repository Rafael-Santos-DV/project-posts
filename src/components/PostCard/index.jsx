export const PostCard = ({cover, title, body, id}) => {
    return (
        <div className="post">
            <img className="img-post" src={cover} alt={title} />
            <div className="post-content">
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        </div>
    )
}