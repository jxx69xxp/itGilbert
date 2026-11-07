// Decorative quadcopter that drifts across the viewport. Motion lives in globals.css (.drone-*).
export default function FlyingDrone() {
  return (
    <div className="drone-flight" aria-hidden="true">
      <svg className="drone-body" viewBox="0 0 120 64" width="132" height="70">
        {/* arms */}
        <path d="M60 30 L16 16 M60 30 L104 16" stroke="#bbcabf" strokeWidth="3.5" strokeLinecap="round" />
        {/* rotor masts */}
        <rect x="13" y="10" width="6" height="8" rx="1.5" fill="#86948a" />
        <rect x="101" y="10" width="6" height="8" rx="1.5" fill="#86948a" />
        {/* spinning props (blur discs) */}
        <ellipse className="drone-rotor" cx="16" cy="9" rx="15" ry="2.2" fill="#dde3ed" opacity=".7" />
        <ellipse className="drone-rotor drone-rotor-b" cx="104" cy="9" rx="15" ry="2.2" fill="#dde3ed" opacity=".7" />
        {/* body */}
        <path d="M42 26 Q60 18 78 26 L74 36 Q60 41 46 36 Z" fill="#4a5560" stroke="#86948a" />
        <path d="M48 27 Q60 22 72 27" stroke="#4edea3" strokeWidth="1.5" fill="none" opacity=".8" />
        {/* gimbal + camera */}
        <rect x="56" y="38" width="8" height="4" rx="1" fill="#86948a" />
        <rect x="53" y="42" width="14" height="10" rx="3" fill="#161c23" stroke="#3c4a42" />
        <circle cx="60" cy="47" r="3.2" fill="#090f16" stroke="#86948a" />
        <circle className="drone-lens" cx="61" cy="46" r="1" fill="#ffb95f" />
        {/* nav lights */}
        <circle className="drone-led" cx="44" cy="33" r="1.8" fill="#4edea3" />
        <circle className="drone-led drone-led-b" cx="76" cy="33" r="1.8" fill="#ffb95f" />
      </svg>
    </div>
  );
}
