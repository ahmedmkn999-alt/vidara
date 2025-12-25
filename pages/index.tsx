import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, name: "بداية", price: 100, features: ["50 فيديو", "جودة HD"] },
    { id: 2, name: "برو (VIP)", price: 250, features: ["300 فيديو", "جودة 4K", "سرعة عالية"], recommended: true },
    { id: 3, name: "شركات", price: 500, features: ["فيديوهات بلا حدود", "دعم فني خاص"] }
  ];

  const handlePay = () => {
    if(!phoneNumber) return alert("من فضلك اكتب رقم المحفظة");
    alert(`تم استلام طلبك للرقم ${phoneNumber}! سيتم التفعيل خلال دقائق.`);
    setSelectedPlan(null);
  };

  return (
    <div style={{minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'sans-serif', direction: 'rtl'}}>
      {/* البار العلوي */}
      <nav style={{padding: '20px', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{fontSize: '24px', color: '#60a5fa', margin: 0, fontWeight: 'bold'}}>فيدارا AI 🤖</h1>
        <div style={{display: 'flex', gap: '10px'}}>
           <Link href="/admin"><button style={{background: 'transparent', color: '#9ca3af', border: '1px solid #374151', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer'}}>الإدارة</button></Link>
           <Link href="/dashboard"><button style={{background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}>دخول الاستوديو 🚀</button></Link>
        </div>
      </nav>

      {/* مقدمة الموقع */}
      <div style={{textAlign: 'center', padding: '80px 20px'}}>
        <h2 style={{fontSize: '50px', marginBottom: '20px'}}>حـول خيالك لـ <span style={{color: '#a855f7'}}>فيديو</span></h2>
        <p style={{color: '#9ca3af', fontSize: '20px', maxWidth: '600px', margin: '0 auto'}}>أفضل منصة عربية لصناعة الفيديوهات بالذكاء الاصطناعي. اشترك الآن وابدأ الإبداع.</p>
      </div>

      {/* كروت الباقات */}
      <div style={{maxWidth: '1000px', margin: '0 auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
        {plans.map((plan) => (
          <div key={plan.id} style={{background: '#1e293b', padding: '30px', borderRadius: '15px', border: plan.recommended ? '2px solid #a855f7' : '1px solid #374151', position: 'relative'}}>
            {plan.recommended && <span style={{position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#a855f7', padding: '5px 15px', borderRadius: '20px', fontSize: '12px'}}>الأكثر مبيعاً</span>}
            <h3 style={{fontSize: '24px'}}>{plan.name}</h3>
            <div style={{fontSize: '36px', fontWeight: 'bold', margin: '15px 0', color: '#60a5fa'}}>{plan.price} ج.م</div>
            <ul style={{listStyle: 'none', padding: 0, color: '#9ca3af', marginBottom: '20px'}}>
              {plan.features.map((f, i) => <li key={i} style={{marginBottom: '10px'}}>✓ {f}</li>)}
            </ul>
            <button onClick={() => setSelectedPlan(plan)} style={{width: '100%', background: plan.recommended ? '#a855f7' : '#334155', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>اشترك الآن</button>
          </div>
        ))}
      </div>

      {/* نافذة الدفع المنبثقة */}
      {selectedPlan && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
          <div style={{background: '#1e293b', padding: '30px', borderRadius: '15px', width: '90%', maxWidth: '400px', textAlign: 'center'}}>
            <h3 style={{marginBottom: '15px'}}>تفعيل باقة: {selectedPlan.name}</h3>
            <p style={{marginBottom: '20px', color: '#9ca3af'}}>حول المبلغ على فودافون كاش واكتب رقمك هنا</p>
            <input 
              type="text" placeholder="رقم محفظتك (010xxxx)" 
              style={{width: '100%', background: '#0f172a', border: '1px solid #4b5563', padding: '12px', borderRadius: '8px', color: 'white', marginBottom: '15px', textAlign: 'center'}}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handlePay} style={{width: '100%', background: '#22c55e', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>تأكيد الدفع ✅</button>
            <button onClick={() => setSelectedPlan(null)} style={{marginTop: '10px', background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer'}}>إلغاء</button>
          </div>
        </div>
      )}
    </div>
  );
      }
                                               
