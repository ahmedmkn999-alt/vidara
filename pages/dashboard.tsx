import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [prompt, setPrompt] = useState('');
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  if (status === "loading") return <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>جاري التحميل...</div>;

  if (!session) {
    return (
      <div style={{minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', direction: 'rtl'}}>
        <div style={{textAlign: 'center', background: '#1e293b', padding: '40px', borderRadius: '20px', border: '1px solid #334155'}}>
          <h2>مرحباً بك في استوديو فيدارا 🎬</h2>
          <p style={{color: '#9ca3af', margin: '15px 0'}}>يجب تسجيل الدخول باستخدام جوجل للبدء</p>
          <button onClick={() => signIn('google')} style={{background: 'white', color: 'black', padding: '12px 25px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '20px auto'}}>
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" width="20" />
            الدخول عبر جوجل
          </button>
        </div>
      </div>
    );
  }

  const generateVideo = async () => {
    if (!prompt) return alert("اكتب وصف الفيديو!");
    setLoading(true);
    setMsg("جاري الاتصال بالمحرك...");
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ prompt })
      });
      let pred = await res.json();
      setMsg("بدأ السحر.. انتظر قليلاً");
      while (pred.status !== "succeeded" && pred.status !== "failed") {
        await new Promise(r => setTimeout(r, 2500));
        const check = await fetch("https://api.replicate.com/v1/predictions/" + pred.id, {
          headers: { Authorization: "Token R8_Kv4EUNsp6xIkUtcP3xCGjbIVF36pOxx3fq803" }
        });
        pred = await check.json();
      }
      if (pred.status === "succeeded") {
        setVideo(pred.output[0]);
        setMsg("تم الصنع بنجاح!");
      } else { setMsg("فشلت المحاولة"); }
    } catch (e) { setMsg("خطأ في الاتصال"); }
    setLoading(false);
  };

  return (
    <div style={{minHeight: '100vh', background: '#0f172a', color: 'white', padding: '20px', direction: 'rtl'}}>
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto 30px'}}>
        <span>أهلاً {session.user.name} 👋</span>
        <button onClick={() => signOut()} style={{background: '#ef4444', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer'}}>خروج</button>
      </nav>
      <div style={{maxWidth: '600px', margin: '0 auto', background: '#1e293b', padding: '30px', borderRadius: '20px'}}>
        <textarea onChange={(e) => setPrompt(e.target.value)} placeholder="وصف الفيديو (بالإنجليزي)..." style={{width: '100%', height: '100px', background: '#0f172a', color: 'white', padding: '15px', borderRadius: '10px', border: '1px solid #334155'}} />
        <button onClick={generateVideo} disabled={loading} style={{width: '100%', marginTop: '15px', padding: '15px', background: '#7c3aed', color: 'white', borderRadius: '10px', border: 'none', fontWeight: 'bold'}}>
          {loading ? msg : "🚀 اصنع فيديو"}
        </button>
      </div>
      {video && <video src={video} controls autoPlay loop style={{width: '100%', maxWidth: '600px', display: 'block', margin: '20px auto', borderRadius: '15px'}} />}
    </div>
  );
}
