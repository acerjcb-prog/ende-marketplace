
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import {
  LayoutDashboard,
  Palette,
  Image as ImageIcon,
  Menu as MenuIcon,
  Layers,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Settings,
} from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  visible: boolean;
};

type SectionItem = {
  id: string;
  title: string;
  visible: boolean;
};

type SiteSettings = {
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  primaryColor: string;
  secondaryColor: string;
  menus: MenuItem[];
  sections: SectionItem[];
};

const STORAGE_KEY = "ende-marketplace-admin-draft-v1";

const defaultSettings: SiteSettings = {
  siteName: "Marketplace Ekonomi Kreatif Ende",
  tagline: "Dikelola oleh Dinas Pariwisata Kabupaten Ende",
  heroTitle: "Jelajahi Produk dan Kreativitas Ende",
  heroDescription:
    "Temukan produk UMKM unggulan dan layanan jasa kreatif dari Kabupaten Ende.",
  heroImage: "",
  primaryColor: "#800000",
  secondaryColor: "#142b4a",
  menus: [
    { label: "Beranda", href: "/", visible: true },
    { label: "Produk UMKM", href: "/produk", visible: true },
    { label: "Desa Kreatif", href: "/desa-kreatif", visible: true },
    { label: "Jasa Ekraf", href: "/jasa-ekraf", visible: true },
    { label: "Profil UMKM", href: "/umkm", visible: true },
    { label: "Berita dan Promosi", href: "/berita", visible: true },
    { label: "Cara Berbelanja", href: "/cara-berbelanja", visible: true },
    { label: "Tentang Kami", href: "/tentang-kami", visible: true },
  ],
  sections: [
    { id: "hero", title: "Banner utama beranda", visible: true },
    { id: "categories", title: "Kategori produk dan jasa", visible: true },
    { id: "products", title: "Produk unggulan", visible: true },
    { id: "creative", title: "Jasa kreatif unggulan", visible: true },
    { id: "news", title: "Berita dan promosi", visible: true },
  ],
};

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "content", label: "Tulisan beranda", icon: Settings },
  { id: "appearance", label: "Warna dan gambar", icon: Palette },
  { id: "menus", label: "Menu website", icon: MenuIcon },
  { id: "sections", label: "Susunan halaman", icon: Layers },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [settings, setSettings] =
    useState<SiteSettings>(defaultSettings);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SiteSettings>;

        setSettings({
          ...defaultSettings,
          ...parsed,
          menus: Array.isArray(parsed.menus)
            ? parsed.menus
            : defaultSettings.menus,
          sections: Array.isArray(parsed.sections)
            ? parsed.sections
            : defaultSettings.sections,
        });
      }
    } catch {
      setMessage("Pengaturan tersimpan tidak dapat dibaca.");
    }

    setReady(true);
  }, []);
  
  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      const session = data.session;

      if (!error && session?.user.id === "6a137349-382b-4585-a2f0-651b04938c9c") {
        setUserId(session.user.id);
      } else {
        setUserId(null);

        if (session) {
          await supabase.auth.signOut();
        }
      }

      if (active) setAuthReady(true);
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user.id === "6a137349-382b-4585-a2f0-651b04938c9c") {
        setUserId(session.user.id);
      } else {
        setUserId(null);
      }

      setAuthReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userId) return;

    let active = true;

    async function loadSettings() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("site_settings")
        .select("settings")
        .eq("id", "global")
        .maybeSingle();

      if (!active) return;

      if (error) {
        setMessage("Gagal memuat pengaturan dari Supabase.");
        return;
      }

      if (data?.settings) {
        const parsed =
          data.settings as unknown as Partial<SiteSettings>;

        setSettings({
          ...defaultSettings,
          ...parsed,
          menus: Array.isArray(parsed.menus)
            ? parsed.menus
            : defaultSettings.menus,
          sections: Array.isArray(parsed.sections)
            ? parsed.sections
            : defaultSettings.sections,
        });
      }
    }

    void loadSettings();

    return () => {
      active = false;
    };
  }, [userId]);


  async function handleLogin() {
    setMessage("");

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Login gagal. Periksa email dan kata sandi.");
      return;
    }

    if (data.user.id !== "6a137349-382b-4585-a2f0-651b04938c9c") {
      await supabase.auth.signOut();
      setUserId(null);
      setMessage("Akun ini bukan akun Super Admin.");
      return;
    }

    setUserId(data.user.id);
    setPassword("");
    setMessage("Login Super Admin berhasil.");
  }

  async function handlePasswordRecovery() {
    if (!email) {
      setMessage("Masukkan email admin terlebih dahulu.");
      return;
    }

    setMessage("");

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      }
    );

    if (error) {
      setMessage(
        "Gagal mengirim email pemulihan. " + error.message
      );
      return;
    }

    setMessage(
      "Permintaan pemulihan dikirim. Periksa email admin."
    );
  }

  function updateField<K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K]
  ) {
    setSettings((current) => ({ ...current, [key]: value }));
    setMessage("");
  }

 
  async function saveSettings() {
    if (!userId) {
      setMessage("Silakan login sebagai Super Admin.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("site_settings")
        .upsert({
          id: "global",
          settings,
        });

      if (error) {
        throw error;
      }

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings)
      );

      setMessage("Pengaturan berhasil disimpan ke Supabase.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? `Gagal menyimpan: ${error.message}`
          : "Gagal menyimpan pengaturan ke Supabase."
      );
    } finally {
      setSaving(false);
    }
  }


  function resetSettings() {
    const confirmed = window.confirm(
      "Kembalikan semua pengaturan draft ke nilai awal?"
    );

    if (!confirmed) return;

    setSettings(defaultSettings);
    window.localStorage.removeItem(STORAGE_KEY);
    setMessage("Pengaturan draft dikembalikan ke nilai awal.");
  }

  function updateMenu(
    index: number,
    field: keyof MenuItem,
    value: string | boolean
  ) {
    const next = settings.menus.map((menu, i) =>
      i === index ? { ...menu, [field]: value } : menu
    );

    updateField("menus", next);
  }

  function moveSection(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= settings.sections.length) {
      return;
    }

    const next = [...settings.sections];
    [next[index], next[nextIndex]] = [
      next[nextIndex],
      next[index],
    ];

    updateField("sections", next);
  }

  function toggleSection(index: number) {
    const next = settings.sections.map((section, i) =>
      i === index
        ? { ...section, visible: !section.visible }
        : section
    );

    updateField("sections", next);
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        Memuat panel admin...
      </main>
    );
  }

  if (!authReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        Memeriksa sesi admin...
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleLogin();
          }}
          className="w-full max-w-md space-y-5 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div>
            <h1 className="text-2xl font-bold">
              Login Super Admin
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Marketplace Ekonomi Kreatif Ende
            </p>
          </div>

          <label className="block text-sm font-medium">
            Email admin
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border px-3 py-3 font-normal"
              placeholder="Masukkan email admin"
            />
          </label>

          <label className="block text-sm font-medium">
            Kata sandi
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border px-3 py-3 font-normal"
              placeholder="Masukkan kata sandi"
            />
          </label>

          {message && (
            <p role="status" className="text-sm text-red-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-marun px-4 py-3 font-semibold text-white"
          >
            Masuk sebagai Super Admin
          </button>
          
          <button
            type="button"
            onClick={() => void handlePasswordRecovery()}
            className="w-full rounded-lg border px-4 py-3 text-sm font-medium"
          >
            Lupa kata sandi?
          </button>

        </form>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-marun">
              Panel Pengelola
            </p>
            <h1 className="mt-1 text-lg font-bold sm:text-xl">
              Marketplace Ekonomi Kreatif Ende
            </h1>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Lihat website ↗
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="h-fit rounded-xl border bg-white p-3">
          <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Pengaturan website
          </p>

          <nav className="grid grid-cols-2 gap-1 lg:grid-cols-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-medium ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={17} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900">
            Mode draft lokal. Pengaturan belum terhubung ke website publik.
          </div>
        </aside>

        <main className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Kelola pengaturan draft website Anda.
              </p>
            </div>

            <button
              type="button"
              onClick={saveSettings}
              className="flex items-center gap-2 rounded-lg bg-marun px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              <Save size={17} />
              Simpan draft
            </button>
          </div>

          {message && (
            <div
              role="status"
              className="rounded-lg border border-slate-200 bg-white p-3 text-sm"
            >
              {message}
            </div>
          )}

          {activeTab === "dashboard" && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-xl border bg-white p-5">
                  <LayoutDashboard className="text-slate-500" />
                  <p className="mt-4 text-sm text-slate-500">
                    Nama website
                  </p>
                  <p className="mt-1 font-bold">
                    {settings.siteName}
                  </p>
                </div>

                <div className="rounded-xl border bg-white p-5">
                  <MenuIcon className="text-slate-500" />
                  <p className="mt-4 text-sm text-slate-500">
                    Menu ditampilkan
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {settings.menus.filter((menu) => menu.visible).length}
                  </p>
                </div>

                <div className="rounded-xl border bg-white p-5">
                  <Layers className="text-slate-500" />
                  <p className="mt-4 text-sm text-slate-500">
                    Bagian halaman aktif
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {
                      settings.sections.filter(
                        (section) => section.visible
                      ).length
                    }
                  </p>
                </div>
              </section>

              <section className="rounded-xl border bg-white p-5">
                <h3 className="font-bold">Mulai mengatur website</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Pilih menu di sebelah kiri untuk mengubah teks
                  beranda, warna, gambar, navigasi, atau susunan
                  bagian halaman.
                </p>
                <p className="mt-3 text-sm leading-6 text-amber-800">
                  Perubahan pada tahap ini hanya tersimpan sebagai
                  draft di browser yang digunakan.
                </p>
              </section>
            </>
          )}

          {activeTab === "content" && (
            <section className="space-y-5 rounded-xl border bg-white p-5">
              <h3 className="font-bold">Identitas dan tulisan beranda</h3>

              <label className="block text-sm font-medium">
                Nama website
                <input
                  value={settings.siteName}
                  onChange={(e) =>
                    updateField("siteName", e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal"
                />
              </label>

              <label className="block text-sm font-medium">
                Tagline atau keterangan pengelola
                <input
                  value={settings.tagline}
                  onChange={(e) =>
                    updateField("tagline", e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal"
                />
              </label>

              <label className="block text-sm font-medium">
                Judul banner beranda
                <input
                  value={settings.heroTitle}
                  onChange={(e) =>
                    updateField("heroTitle", e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal"
                />
              </label>

              <label className="block text-sm font-medium">
                Deskripsi banner
                <textarea
                  rows={4}
                  value={settings.heroDescription}
                  onChange={(e) =>
                    updateField("heroDescription", e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal"
                />
              </label>

              <p className="text-xs leading-5 text-slate-500">
                Ini adalah draft editor. Integrasi dengan komponen
                beranda akan dibuat pada tahap berikutnya.
              </p>
            </section>
          )}

          {activeTab === "appearance" && (
            <section className="space-y-5 rounded-xl border bg-white p-5">
              <h3 className="font-bold">Warna website</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Warna utama
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) =>
                        updateField("primaryColor", e.target.value)
                      }
                      className="h-11 w-14 cursor-pointer rounded border p-1"
                    />
                    <span>{settings.primaryColor}</span>
                  </div>
                </label>

                <label className="block text-sm font-medium">
                  Warna navigasi
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) =>
                        updateField("secondaryColor", e.target.value)
                      }
                      className="h-11 w-14 cursor-pointer rounded border p-1"
                    />
                    <span>{settings.secondaryColor}</span>
                  </div>
                </label>
              </div>

              <div
                className="rounded-lg p-5 text-white"
                style={{ backgroundColor: settings.secondaryColor }}
              >
                <p className="text-sm">Pratinjau warna navigasi</p>
                <h4 className="mt-2 text-xl font-bold">
                  {settings.siteName}
                </h4>
                <button
                  type="button"
                  className="mt-4 rounded px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Contoh tombol
                </button>
              </div>

              <div className="border-t pt-5">
                <label className="block text-sm font-medium">
                  URL gambar banner
                  <input
                    value={settings.heroImage}
                    onChange={(e) =>
                      updateField("heroImage", e.target.value)
                    }
                    placeholder="https://contoh.com/banner.jpg"
                    className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal"
                  />
                </label>

                {settings.heroImage.trim() && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-slate-500">
                      Pratinjau gambar
                    </p>
                    {/* Pratinjau URL saja, belum diunggah ke server. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={settings.heroImage}
                      alt="Pratinjau banner"
                      className="max-h-64 w-full rounded-lg border object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = "block";
                      }}
                    />
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <ImageIcon size={15} />
                  Gunakan URL gambar yang dapat diakses publik.
                  Upload gambar ke penyimpanan server akan dibuat
                  pada tahap integrasi.
                </div>
              </div>
            </section>
          )}

          {activeTab === "menus" && (
            <section className="space-y-4 rounded-xl border bg-white p-5">
              <h3 className="font-bold">Menu navigasi</h3>
              <p className="text-sm text-slate-500">
                Edit nama dan alamat menu. Tombol mata mengatur
                status draft menu.
              </p>

              {settings.menus.map((menu, index) => (
                <div
                  key={`${index}-${menu.href}`}
                  className="grid gap-3 rounded-lg border p-3 sm:grid-cols-[1fr_1fr_auto]"
                >
                  <label className="text-xs font-medium text-slate-500">
                    Nama menu
                    <input
                      value={menu.label}
                      onChange={(e) =>
                        updateMenu(index, "label", e.target.value)
                      }
                      className="mt-1 w-full rounded border px-3 py-2 text-sm font-normal text-slate-800"
                    />
                  </label>

                  <label className="text-xs font-medium text-slate-500">
                    Alamat menu
                    <input
                      value={menu.href}
                      onChange={(e) =>
                        updateMenu(index, "href", e.target.value)
                      }
                      className="mt-1 w-full rounded border px-3 py-2 text-sm font-normal text-slate-800"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      updateMenu(index, "visible", !menu.visible)
                    }
                    aria-label={
                      menu.visible
                        ? "Sembunyikan menu"
                        : "Tampilkan menu"
                    }
                    className="flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
                  >
                    {menu.visible ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                    {menu.visible ? "Tampil" : "Tersembunyi"}
                  </button>
                </div>
              ))}

              <p className="text-xs leading-5 text-slate-500">
                Daftar ini belum menggantikan navigasi pada Header.tsx.
                Kita akan menghubungkannya setelah struktur komponen
                publik diperiksa.
              </p>
            </section>
          )}

          {activeTab === "sections" && (
            <section className="space-y-4 rounded-xl border bg-white p-5">
              <h3 className="font-bold">Susunan bagian beranda</h3>
              <p className="text-sm text-slate-500">
                Gunakan panah untuk mengubah urutan draft bagian.
              </p>

              {settings.sections.map((section, index) => (
                <div
                  key={section.id}
                  className="flex flex-wrap items-center gap-3 rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <p className="font-medium">{section.title}</p>
                    <p className="text-xs text-slate-500">
                      Bagian: {section.id}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                    aria-label="Pindahkan ke atas"
                    className="rounded border p-2 disabled:opacity-30"
                  >
                    <ArrowUp size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveSection(index, 1)}
                    disabled={index === settings.sections.length - 1}
                    aria-label="Pindahkan ke bawah"
                    className="rounded border p-2 disabled:opacity-30"
                  >
                    <ArrowDown size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSection(index)}
                    className="flex items-center gap-2 rounded border px-3 py-2 text-sm"
                  >
                    {section.visible ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                    {section.visible ? "Tampil" : "Sembunyi"}
                  </button>
                </div>
              ))}

              <p className="text-xs leading-5 text-slate-500">
                Urutan dan visibilitas ini masih berupa draft.
                Bagian beranda baru akan mengikuti pengaturan setelah
                komponen halaman utama diintegrasikan.
              </p>
            </section>
          )}

          <footer className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white p-4">
            <p className="text-xs leading-5 text-slate-500">
              Simpan draft sebelum meninggalkan halaman.
            </p>

            <button
              type="button"
              onClick={resetSettings}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
            >
              <RotateCcw size={16} />
              Reset draft
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}
