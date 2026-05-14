import CervezasGrid from "./CervezasGrid";
import HeroNevados from "./HeroNevados";
import LoginForm from "./LoginForm";

export default function AuthPage() {
    return (
        <main style={{ minHeight: '100vh', background: '#0a0c09', fontFamily: "'Jost', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes drift { 0%,100%{transform:translateX(0)} 50%{transform:translateX(10px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .beer-card { transition: transform 0.2s; }
        .beer-card:hover { transform: translateY(-4px); }
        .btn-login:hover { background: #324030 !important; }
        .btn-login:disabled { opacity: 0.5; cursor: not-allowed; }
        input:focus { outline: none; border-color: #4a6a40 !important; }
        input::placeholder { color: #3a4235; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #141812 inset !important;
          -webkit-text-fill-color: #c8c0b0 !important;
          border-color: #4a6a40 !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        @media (min-width: 640px) {
          .beer-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

            <HeroNevados />

            <div style={{
                background: '#0c1008', borderTop: '0.5px solid #1e2820',
                borderBottom: '0.5px solid #1e2820', padding: '20px 24px', textAlign: 'center',
            }}>
                <p style={{
                    fontFamily: "'Cormorant Garamond',serif", fontSize: 15,
                    fontStyle: 'italic', fontWeight: 300, color: '#6a8060',
                    maxWidth: 600, margin: '0 auto', lineHeight: 1.7,
                }}>
                    "Cada sorbo es un recordatorio de que el páramo nos da el agua, el frío y la vida.
                    Cuídalo como él nos cuida a nosotros."
                </p>
                <div style={{
                    marginTop: 10, fontSize: 9, fontWeight: 200,
                    color: '#8a9280', letterSpacing: '0.25em', textTransform: 'uppercase',
                }}>
                    Nevados · comprometidos con los páramos de Caldas
                </div>
            </div>

            <CervezasGrid />
            <LoginForm />
        </main>
    )
}