import { createClient } from '@supabase/supabase-js';

// ===== การเชื่อมต่อ Supabase (ฐานข้อมูลกลางออนไลน์) =====
// คีย์สาธารณะ (publishable) — ปลอดภัยที่จะอยู่ในโค้ดฝั่งหน้าเว็บ ป้องกันด้วย RLS ที่ฝั่งฐานข้อมูล
const SUPABASE_URL = 'https://bmoxvmwlmjnbvxjqhvhy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_CGkJ6WPpbti6nWfdc7hCFQ_EMyF9Jps';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const TABLE = 'kv_store';

// สำเนาในเครื่อง (localStorage) — ใช้เป็นตัวสำรองเวลาออฟไลน์/เน็ตหลุด
const mirror = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* ignore */ } },
  list(prefix) {
    const out = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (!prefix || k.startsWith(prefix))) out.push(k);
      }
    } catch { /* ignore */ }
    return out;
  },
};

// อะแดปเตอร์ที่มีหน้าตาเหมือน window.storage เดิม (get/set/delete/list)
// แต่เก็บข้อมูลไว้บน Supabase เพื่อให้ทุกเครื่องเห็นข้อมูลชุดเดียวกัน
export const cloudStorage = {
  async get(key) {
    try {
      const { data, error } = await supabase
        .from(TABLE).select('value').eq('key', key).maybeSingle();
      if (error) throw error;
      if (data) { mirror.set(key, data.value); return { key, value: data.value }; }
      return null;
    } catch (e) {
      console.warn('[storage] get ใช้ข้อมูลสำรองในเครื่อง:', e?.message || e);
      const v = mirror.get(key);
      return v == null ? null : { key, value: v };
    }
  },
  async set(key, value) {
    mirror.set(key, value); // เก็บสำเนาในเครื่องทันที
    try {
      const { error } = await supabase
        .from(TABLE).upsert({ key, value, updated_at: new Date().toISOString() });
      if (error) throw error;
    } catch (e) {
      console.warn('[storage] set บันทึกขึ้นคลาวด์ไม่สำเร็จ (เก็บในเครื่องไว้แล้ว):', e?.message || e);
    }
    return { key, value };
  },
  async delete(key) {
    mirror.del(key);
    try {
      const { error } = await supabase.from(TABLE).delete().eq('key', key);
      if (error) throw error;
    } catch (e) {
      console.warn('[storage] delete บนคลาวด์ไม่สำเร็จ:', e?.message || e);
    }
    return { key, deleted: true };
  },
  async list(prefix) {
    try {
      const { data, error } = await supabase
        .from(TABLE).select('key').like('key', `${prefix}%`);
      if (error) throw error;
      return { keys: (data || []).map((r) => r.key), prefix };
    } catch (e) {
      console.warn('[storage] list ใช้ข้อมูลสำรองในเครื่อง:', e?.message || e);
      return { keys: mirror.list(prefix), prefix };
    }
  },
};
