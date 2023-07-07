import { Link } from 'react-router-dom';

export default function Card({ header, children, route }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">
        {children}
      </div>
      <div className="card-footer">
        <Link to={route} className="btn">View</Link>
      </div>
    </div>
  );
}
