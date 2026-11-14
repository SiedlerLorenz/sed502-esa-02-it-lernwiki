interface LadeanimationProps {
  text?: string; // optional: eigener Text, sonst "Wird geladen …"
}

// Zeigt einen drehenden Kreis und einen Text, solange Daten geladen werden
// role="status": Screenreader sagen den Text an, ohne die Nutzerin oder den Nutzer zu unterbrechen
function Ladeanimation({ text = 'Wird geladen …' }: LadeanimationProps): React.JSX.Element {
  return (
    <p className="ladeanimation" role="status">
      {/* Der Kreis ist nur Dekoration und wird vor Screenreadern versteckt */}
      <span className="ladeanimation-kreis" aria-hidden="true" />
      {text}
    </p>
  );
}

export default Ladeanimation;
