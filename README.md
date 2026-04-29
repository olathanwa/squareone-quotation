# 🏠 SquareOne Quotation System

ระบบใบเสนอราคาออนไลน์ บริษัท สแควร์วัน ดีไซน์ แอนด์ อินสเปคเตอร์ จำกัด

---

## 📋 สารบัญคู่มือ

1. [เตรียมเครื่องมือ (ทำครั้งเดียว)](#เตรียมเครื่องมือ-ทำครั้งเดียว)
2. [ทดลองรันบนเครื่อง (Optional)](#-ทดลองรันบนเครื่อง-optional)
3. [Deploy ขึ้นออนไลน์ฟรี](#-deploy-ขึ้นออนไลน์ฟรี)
4. [การใช้งาน](#-การใช้งาน)
5. [แก้ปัญหา](#-แก้ปัญหา)

---

## เตรียมเครื่องมือ (ทำครั้งเดียว)

### 1️⃣ ติดตั้ง Node.js

Node.js คือโปรแกรมที่ใช้สำหรับ build เว็บนี้

**ขั้นตอน:**

1. เข้าเว็บ https://nodejs.org
2. กดดาวน์โหลดเวอร์ชัน **LTS** (เลขเขียวๆ) — เวอร์ชันแนะนำ
3. ดับเบิลคลิกไฟล์ที่ดาวน์โหลด → กด Next ไปเรื่อยๆ → Install
4. ตรวจสอบว่าติดตั้งสำเร็จ:
   - **Windows:** เปิด Command Prompt (กด `Win + R` → พิมพ์ `cmd` → Enter)
   - **Mac:** เปิด Terminal (กด `Cmd + Space` → พิมพ์ `terminal` → Enter)
   - พิมพ์คำสั่ง: `node --version`
   - ถ้าขึ้นเลขเช่น `v20.x.x` แสดงว่าติดตั้งสำเร็จ ✅

### 2️⃣ สมัคร GitHub

GitHub คือเว็บเก็บโค้ด — ใช้สำหรับ deploy ผ่าน Vercel

1. เข้าเว็บ https://github.com
2. กด **Sign up** → กรอกอีเมล + ตั้งรหัสผ่าน + เลือก username
3. ยืนยันอีเมล → เสร็จ ✅

### 3️⃣ สมัคร Vercel

Vercel คือเว็บที่จะใช้ host เว็บของเราฟรี

1. เข้าเว็บ https://vercel.com
2. กด **Sign Up** → เลือก **Continue with GitHub** (ใช้ GitHub ที่เพิ่งสมัคร)
3. ตอบคำถาม onboarding ตามจริง (เลือก Hobby = ฟรี) → เสร็จ ✅

---

## 🧪 ทดลองรันบนเครื่อง (Optional)

ขั้นนี้ข้ามได้ ถ้าอยาก deploy ขึ้น online เลย ไปข้อ 3 ได้เลย

```bash
# 1. แตก zip ที่ได้จาก Claude → จะได้โฟลเดอร์ squareone-app

# 2. เปิด Terminal/Command Prompt → cd เข้าโฟลเดอร์
cd path/to/squareone-app

# 3. ติดตั้ง libraries (ทำครั้งแรกครั้งเดียว)
npm install

# 4. รันเว็บ
npm run dev

# 5. เปิด browser → http://localhost:5173
```

ถ้าทุกอย่างเรียบร้อยจะเห็นระบบใบเสนอราคาเปิดในเครื่อง 🎉

กด `Ctrl + C` ใน terminal เพื่อหยุดเว็บ

---

## 🚀 Deploy ขึ้นออนไลน์ฟรี

มี 2 วิธี — เลือกอันที่สะดวกกว่า

### ✨ วิธี A: ใช้ Vercel CLI (เร็วที่สุด — แนะนำ)

```bash
# 1. cd เข้าโฟลเดอร์โปรเจค
cd path/to/squareone-app

# 2. ติดตั้ง libraries (ถ้ายังไม่ได้ทำ)
npm install

# 3. ติดตั้ง Vercel CLI
npm install -g vercel

# 4. Login (จะเปิด browser ให้ login ผ่าน GitHub)
vercel login

# 5. Deploy!
vercel

# จะมีคำถามถาม: ตอบตามนี้
# - Set up and deploy? → Y
# - Which scope? → [เลือก account ของคุณ]
# - Link to existing project? → N
# - Project name? → squareone-quotation (หรือชื่ออื่น)
# - In which directory? → ./
# - Override settings? → N

# 6. รอ 1-2 นาที → จะได้ URL เช่น
# https://squareone-quotation.vercel.app
```

**Deploy production:**
```bash
vercel --prod
```

ทุกครั้งที่แก้โค้ด → รัน `vercel --prod` อีกครั้ง

### 🌐 วิธี B: ผ่าน Web UI ของ GitHub + Vercel

**ขั้นที่ 1 — Upload โค้ดขึ้น GitHub**

1. เข้า https://github.com → กด **+** มุมขวาบน → **New repository**
2. ตั้งชื่อ: `squareone-quotation` → กด **Create repository**
3. หน้าถัดไป กดเลือก **uploading an existing file**
4. ลาก ALL ไฟล์และโฟลเดอร์จาก `squareone-app` (ยกเว้น `node_modules`) → ลงในกล่อง
5. กด **Commit changes** → รอจน upload เสร็จ

**ขั้นที่ 2 — Deploy บน Vercel**

1. เข้า https://vercel.com → กด **Add New** → **Project**
2. เลือก repository `squareone-quotation` → กด **Import**
3. กด **Deploy** (ไม่ต้องตั้งค่าอะไร)
4. รอ 1-2 นาที → ได้ URL แล้ว 🎉

URL ที่ได้จะเป็นแบบ: `https://squareone-quotation-xxxx.vercel.app`

---

## 📱 การใช้งาน

### เปิดใช้งาน
- เปิด URL ที่ Vercel ให้บน **browser ใดก็ได้** (Chrome, Safari, Edge, Firefox)
- ใช้ได้ทั้งบน **คอมพิวเตอร์, มือถือ, แท็บเล็ต**

### ⚠️ สิ่งที่ต้องรู้

**ข้อมูลเก็บใน Browser ของเครื่องที่ใช้**
- ใช้บน Chrome ในคอม → ข้อมูลอยู่ในคอมเครื่องนั้น
- ใช้บนมือถือ → ข้อมูลอยู่ในมือถือเครื่องนั้น
- **ไม่ sync ระหว่างเครื่อง** (ทางที่ 1 มีข้อจำกัดแบบนี้)

**ห้ามทำสิ่งเหล่านี้** เพราะข้อมูลจะหาย:
- ❌ Clear browsing data ของ browser
- ❌ ใช้ Incognito/Private window
- ❌ Uninstall browser

**แนะนำ:**
- ✅ ใช้ browser เดียวกันทุกครั้ง
- ✅ Bookmark URL ไว้ที่หน้าแรก
- ✅ ทุก 1-2 สัปดาห์ Export ข้อมูลออกมาเก็บ (ฟีเจอร์นี้ยังไม่มี — บอกผมถ้าต้องการ)

### Custom Domain (Optional)

ถ้าอยากใช้ URL ของตัวเอง เช่น `quotation.squareone.com` แทน `xxx.vercel.app`:

1. ซื้อโดเมนจาก Namecheap, GoDaddy, หรือ Cloudflare (~300-1,000 บาท/ปี)
2. ใน Vercel project → **Settings** → **Domains** → เพิ่มโดเมน
3. ทำตาม DNS instructions ที่ Vercel แนะนำ

---

## 🐛 แก้ปัญหา

### `npm: command not found`
→ ยังไม่ได้ติดตั้ง Node.js ให้ทำขั้นตอนที่ 1 ก่อน

### `Permission denied` (Mac/Linux)
→ ใช้ `sudo npm install -g vercel` แทน

### หน้าเว็บขาว/ขึ้น error
→ เปิด Console ของ browser (กด `F12` → tab Console) ดูว่า error อะไร

### โลโก้/QR ไม่ขึ้น
→ ตรวจสอบว่า upload ไฟล์ครบรวม `src/App.jsx` ที่มี base64 ในนั้น

### อยากแก้โค้ด/เปลี่ยนข้อมูล
→ แก้ไฟล์ → run `vercel --prod` อีกครั้ง (วิธี A) หรือ git push (วิธี B)

---

## 💡 อยากเพิ่มฟีเจอร์?

ฟีเจอร์ที่ทำได้ในอนาคต (ติดต่อกลับมาได้ทุกเมื่อ):
- 📤 Export ข้อมูลทั้งหมดเป็นไฟล์ JSON (ป้องกันข้อมูลหาย)
- 📥 Import ข้อมูลกลับ
- 🔐 ใส่รหัสผ่านเพื่อเข้าระบบ (กันคนอื่นเปิด URL)
- ☁️ ย้ายไป Supabase (เพื่อ sync ข้ามเครื่อง)
- 📊 Export Excel
- 📧 ส่งใบเสนอราคาทาง Email อัตโนมัติ

---

ขอให้ใช้งานได้สะดวกครับ! 🎉
