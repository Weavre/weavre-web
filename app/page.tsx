'use client'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main
      style={{
        margin: 0,
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(135deg, #d6d5ebff, #b0b3d3ff)",
        color: "#E8EAE7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      {/* Logo */}
      <img
        src="/logo.png" // <- put your logo file inside /public as logo.png
        alt="Weavre Logo"
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />

      <h1 style={{ fontSize: "2.2rem", marginBottom: 10, color: "#2842c4ff" }}>Weavre</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: 30, color: "#2e3972ff" }}>
        Threads of your campus story. Something big is coming...
  
      </p>

      {/* Email signup form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{
            padding: 12,
            borderRadius: 20,
            border: "none",
            width: 240,
            outline: "none",
            color: "#0d0220ff",
          }}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            background: "linear-gradient(135deg, #8133ffff, #4da9ffff)",
            border: "none",
            color: "white",
            padding: "12px 24px",
            borderRadius: 30,
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {status === 'submitting' ? 'Saving...' : 'Notify Me'}
        </button>
      </form>
      
      {status === 'success' && (
        <p style={{ color: '#4da9ffff', marginTop: 10 }}>Thanks! We'll notify you.</p>
      )}
      {status === 'error' && (
        <p style={{ color: '#ff4d4d', marginTop: 10 }}>Something went wrong. Try again.</p>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 20,
          fontSize: "0.9rem",
          color: "#2d3975ff",
        }}
      >
        © 2025 Weavre Ltd. All rights reserved.
      </div>
    </main>
  );
}
