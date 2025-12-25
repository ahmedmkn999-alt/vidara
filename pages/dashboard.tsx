import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [prompt, setPrompt] = useState('');
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  if (status === "loading") return <div style={{textAlign:'center', color:'white', marginTop:'50px'}}>جاري الدخول...</div>;

  if (!session) {
    return (
      <div style={{minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', direction: 'rtl'}}>
        <div style={{textAlign: 'center', background: '#1e293b', padding: '40px', borderRadius: '20px', border: '1px solid #334155'}}>
          <h2 style={{marginBottom: '20px'}}>مرحباً بك في استوديو فيدارا AI 🎬</h2>
          <button onClick={() => signIn('google')} style={{background: 'white', color: 'black', padding: '12px 25px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto'}}>
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" width="20" />
            التسجيل عبر حساب جوجل
          </button>
        </div>
      </div>
    );
  }

  const generateVideo = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ prompt })
      });
      let pred = await res.json();
      while (pred.status !== "succeeded" && pred.status !== "failed") {
        await new Promise(r => setTimeout(r, 2500));
        const check = await fetch("https://api.replicate.com/v1/predictions/" + pred.id, {
          headers: { Authorization: "Token R8_Kv4EUNsp6xIkUtcP3xCGjbIVF36pOxx3fq803" }
        });
        pred = await check.json();
      }
      if (pred.status === "succeeded") setVideo(pred.output[0]);
    } catch (e) { alert("حدث خطأ في محرك الفيديو"); }
    setLoading(false);
  };

  return (
    <div style={{minHeight: '100vh', background: '#0f172a', color: 'white', padding: '20px', direction: 'rtl'}}>
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
          <span>أهلاً بك، {session.user.name} 👋</span>
          <button onClick={() => signOut()} style={{background: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer'}}>خروج</button>
        </header>
        <div style={{background: '#1e293b', padding: '30px', borderRadius: '20px'}}>
          <textarea onChange={(e) => setPrompt(e.target.value)} placeholder="اكتب وصف الفيديو هنا (بالإنجليزي)..." style={{width: '100%', height: '100px', background: '#0f172a', color: 'white', padding: '15px', borderRadius: '10px', border: '1px solid #334155'}} />
          <button onClick={generateVideo} disabled={loading} style={{width: '100%', marginTop: '15px', padding: '15px', background: '#7c3aed', color: 'white', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}>
            {loading ? "🎬 جاري صنع فيديو أحلامك..." : "🚀 ابدأ صنع الفيديو"}
          </button>
        </div>
        {video && <video src={video} controls autoPlay loop style={{width: '100%', marginTop: '30px', borderRadius: '15px', border: '2px solid #7c3aed'}} />}
      </div>
    </div>
  );
}
