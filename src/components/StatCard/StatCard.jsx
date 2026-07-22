import "./StatCard.css";

export default function StatCard({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "blue",
    onClick
}) {

    return (

        <button
            className={`stat-card stat-card--${color}`}
            onClick={onClick}
            type="button"
        >

            <div className="stat-card__icon">
                {Icon && <Icon />}
            </div>

            <div className="stat-card__content">

                <span className="stat-card__title">
                    {title}
                </span>

                <strong className="stat-card__value">
                    {value}
                </strong>

                {subtitle && (
                    <small className="stat-card__subtitle">
                        {subtitle}
                    </small>
                )}

            </div>

        </button>

    );

}