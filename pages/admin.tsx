import { useState } from 'react';
import Link from 'next/link';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // قاعدة بيانات وهمية للتجربة (دي اللي بتظهرلك المشتركين)
  const [users, setUsers] = useState([
    { id: 1, name: "محمد أحمد", phone: "010xxxx", plan: "مجاني", status: "غير مفعل" },
    { id: 2, name: "سارة علي", phone: "012xxxx", plan: "VIP", status: "انتظار الدفع" },
  ]);

  const handleLogin = () => {
    // هنا الباسورد اللي هتدخل بيه
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("كلمة السر خاطئة!");
    }
  };

  const activateUser = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: "مفعل ✅", plan: "VIP (هدية)" } : user
    ));
    alert("تم تفعيل الحساب بنجاح!");
  };

  const deleteUser = (id) => {
    if(confirm("هل أنت متأكد؟")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'rtl'}}>
        <div style={{background: '#1e293b', padding: '40px', borderRadius: '15px', textAlign: 'center', color: 'white'}}>
          <h2 style={{marginBottom: '20px'}}>🔒 لوحة المدير</h2>
          <input type="password" placeholder="كلمة السر" onChange={(e) => setPassword(e.target.value)} style={{padding: '10px', borderRadius: '5px', border: 'none', width: '100%', marginBottom: '15px'}} />
          <button onClick={handleLogin} style={{background: '#2563eb', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}>دخول</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: '#0f172a', color: 'white', padding: '40px', direction: 'rtl'}}>
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
          <h1>🛠️ التحكم في المشتركين</h1>
          <button onClick={() => setIsAuthenticated(false)} style={{background: '#ef4444', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer'}}>خروج</button>
        </div>
        <div style={{background: '#1e293b', borderRadius: '15px', overflow: 'hidden'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'right'}}>
            <thead style={{background: '#334155'}}>
              <tr>
                <th style={{padding: '15px'}}>الاسم</th>
                <th style={{padding: '15px'}}>الهاتف</th>
                <th style={{padding: '15px'}}>الباقة</th>
                <th style={{padding: '15px'}}>الحالة</th>
                <th style={{padding: '15px'}}>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{borderBottom: '1px solid #334155'}}>
                  <td style={{padding: '15px'}}>{user.name}</td>
                  <td style={{padding: '15px'}}>{user.phone}</td>
                  <td style={{padding: '15px'}}>{user.plan}</td>
                  <td style={{padding: '15px'}}>{user.status}</td>
                  <td style={{padding: '15px'}}>
                    <button onClick={() => activateUser(user.id)} style={{background: '#22c55e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', marginLeft: '5px', cursor: 'pointer'}}>تفعيل</button>
                    <button onClick={() => deleteUser(user.id)} style={{background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer'}}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  }
          
