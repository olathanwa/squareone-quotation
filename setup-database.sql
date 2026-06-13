-- ============================================================
-- ตั้งค่าฐานข้อมูลกลางสำหรับระบบใบเสนอราคา SquareOne
-- วิธีใช้: ก๊อปทั้งหมดนี้ไปวางใน Supabase > SQL Editor แล้วกด Run ครั้งเดียว
-- ============================================================

-- ตารางเก็บข้อมูลแบบ key-value (ใบเสนอราคา + การตั้งค่า)
create table if not exists public.kv_store (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

-- เปิดระบบความปลอดภัยระดับแถว (RLS)
alter table public.kv_store enable row level security;

-- อนุญาตให้เข้าถึงได้แบบสาธารณะ (ตามที่เลือก: ไม่ต้องล็อกอิน ใครมีลิงก์ก็ใช้ได้)
-- หมายเหตุ: ถ้าวันหลังอยากใส่รหัสกันคนนอก ค่อยเปลี่ยน policy นี้ภายหลังได้
drop policy if exists "open access kv_store" on public.kv_store;
create policy "open access kv_store"
  on public.kv_store for all
  to anon, authenticated
  using (true)
  with check (true);
