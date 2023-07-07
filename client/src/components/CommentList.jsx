export default function CommentList({ comments }) {
  return (
    <div className="card-stack">
      {comments.map(comment => (
        <div key={comment.id} className="card">
          <div className="card-body">
            <div className="text-sm mb-1">{comment.email}</div>
            {comment.body}
          </div>
        </div>
      ))}
    </div>
  );
}
