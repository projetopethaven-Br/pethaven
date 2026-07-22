import "./ModulePlaceholder.css";

export default function ModulePlaceholder({
  eyebrow,
  title,
  description,
  icon: Icon,
  actionLabel,
}) {
  return (
    <section className="module-page">
      <header className="module-page__header">
        <div>
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        {actionLabel && (
          <button type="button" className="module-page__action">
            {actionLabel}
          </button>
        )}
      </header>

      <div className="module-placeholder">
        <div className="module-placeholder__icon">
          <Icon />
        </div>

        <h2>Módulo conectado</h2>
        <p>
          A navegação desta área já está funcionando. O conteúdo operacional
          será desenvolvido na próxima etapa do PetHaven.
        </p>
      </div>
    </section>
  );
}
