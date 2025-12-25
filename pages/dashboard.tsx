import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const generateVideo = async () => {
    if (!prompt) return alert("اكتب وصف الفيديو!");
    setLoading(true);
    setStatus("جاري الاتصال بالسيرفر...");
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ prompt })
      });
      
      let pred = await res.json();
      if (res.status !== 201) throw new Error(pred.detail || "حدث خطأ");

      setStatus("جاري الرسم.. (قد يستغرق دقيقة)");

      while (pred.status !== "succeeded" && pred.status !== "failed") {
        await new Promise(r => setTimeout(r, 2000));
        // المفتاح مضاف هنا كمان
        const check = await fetch("https://api.replicate.com/v1/predictions/" + pred.id, {
          headers: { Authorization: "Token R8_Kv4EUNsp6xIkUtcP3xCGjbIVF36pOxx3fq803" }
        });
        pred = await check.json();
      }

      if (pred.status === "succeeded") {
        setVideo(pred.output[0]);
        setStatus("تم الانتهاء! 🎉");
      } else { setStatus("فشلت العملية"); }

    } catch (e) { alert(e.message); setStatus("خطأ"); }
    setLoading(false);
  };

  return (
    <div style={{minHeight: '100vh', background: '#0f172a', color: 'white', padding: '20px', direction: 'rtl'}}>
      <nav style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px'}}>
        <h2>🎬 استوديو فيدارا</h2>
        <Link href="/" style={{color: '#9ca3af', textDecoration: 'none'}}>خروج</Link>
      </nav>
      <div style={{maxWidth: '700px', margin: '0 auto', background: '#1e293b', padding: '30px', borderRadius: '15px'}}>
        <textarea 
          value={prompt} onChange={(e) => setPrompt(e.target.value)}
          placeholder="اكتب وصف الفيديو بالإنجليزي (مثال: Lion running)..."
          style={{width: '100%', height: '100px', background: '#0f172a', color: 'white', border: '1px solid #4b5563', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}
        />
        <button onClick={generateVideo} disabled={loading} style={{width: '100%', background: '#7c3aed', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold'}}>
          {loading ? status : "✨ اصنع الفيديو"}
        </button>
      </div>
      {video && (
        <div style={{marginTop: '30px', textAlign: 'center'}}>
          <video controls src={video} style={{width: '100%', maxWidth: '100%', borderRadius: '15px'}} autoPlay loop />
          <a href={video} download style={{display: 'block', marginTop: '15px', color: '#60a5fa'}}>تحميل الفيديو</a>
        </div>
      )}
    </div>
  );
      }
