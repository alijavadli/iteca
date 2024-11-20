export const SummaryBlock = ({
    label = "Summary",
    amount,
    currency = "KZT"
}) => (
    <div className="summary-block price-block">
        <div className="label">
            <label className='title'>{label}</label>
            <div className="comment"></div>
            <div className="price">
             <span className="amount">{currency} {amount}</span>
            </div>
        </div>
    </div>
);
