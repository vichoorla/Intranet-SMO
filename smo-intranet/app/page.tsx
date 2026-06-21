import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <main style={{
        background: "white",
        borderRadius: "8px",
        padding: "80px 60px",
        border: "1px solid #e5e7eb",
        maxWidth: "900px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "36px", margin: "0 0 16px 0", color: "#1f2937", fontWeight: 600 }}>
          Gestor de Consultas
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 40px 0", lineHeight: 1.6 }}>
          Gestiona las consultas de tus clientes con un sistema simple y eficiente.
        </p>
        
        <Link href="/consultas" style={{
          display: "inline-block",
          padding: "12px 32px",
          background: "#3b82f6",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: 500,
          fontSize: "15px",
          marginBottom: "48px",
          transition: "background 0.2s ease"
        }}>
          Acceder al CRUD
        </Link>

        <div style={{
          background: "#f9fafb",
          borderRadius: "6px",
          padding: "32px",
          marginTop: "40px",
          textAlign: "left",
          border: "1px solid #e5e7eb"
        }}>
          <h3 style={{ margin: "0 0 20px 0", color: "#1f2937", fontSize: 16, fontWeight: 600 }}>Características</h3>
          <ul style={{ margin: "0", paddingLeft: "20px", color: "#6b7280", lineHeight: 1.8 }}>
            <li>Crear nuevas consultas</li>
            <li>Editar registros existentes</li>
            <li>Eliminar consultas</li>
            <li>Datos guardados en localStorage</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
