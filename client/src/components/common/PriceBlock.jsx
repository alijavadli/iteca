export const PriceBlock = ({
  title,
  comment,
  price,
  deadline,
  deadline_to,
  status,
}) => (
  <div className={`price-block ${status}`}>
    <div className="label">
      <div className="title">{title}</div>
      <div className="comment">{comment}</div>
    </div>
    <div className="price">KZT {price}</div>
    {deadline && (
      <div className="dates">
        <small>
          from
          <span>{deadline}</span>
        </small>
        {deadline_to ? (
          <small>
            to
            <span>{deadline_to}</span>
          </small>
        ) : (
          ""
        )}
      </div>
    )}
  </div>
);
