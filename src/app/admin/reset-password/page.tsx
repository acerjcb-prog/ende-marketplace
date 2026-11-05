
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checking, setChecking] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (session && (
        event === "PASSWORD_RECOVERY" ||
        event === "SIGNED_IN" ||
        event === "INITIAL_SESSION"
      )) {
        setSessionReady(true);
        setMessage("");
        setChecking(false);
      }
    });

    async function checkRecovery() {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);

          if (!active) return;

          if (error) {
            setMessage(
              "Tautan pemulihan tidak valid atau sudah kedaluwarsa. Silakan minta email baru."
            );
          } else if (data.session) {
            setSessionReady(true);
          }
        } else {
          const { data, error } = await supabase.auth.getSession();

          if (!active) return;

          if (!error && data.session) {
            setSessionReady(true);
          } else {
            setMessage(
              "Tautan pemulihan tidak valid atau sudah kedaluwarsa. Silakan minta email baru."
            );
          }
        }
      } catch {
        if (active) {
          setMessage("Gagal memeriksa tautan pemulihan.");
        }
      } finally {
        if (active) setChecking(false);
      }
    }

    void checkRecovery();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Kata sandi harus minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Konfirmasi kata sandi tidak sama.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setMessage("Gagal mengganti kata sandi: " + error.message);
        return;
      }

      setMessage(
        "Kata sandi berhasil diganti. Silakan masuk kembali sebagai Super Admin."
      );

      await supabase.auth.signOut();

      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch {
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Memeriksa tautan pemulihan...
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold">
          Buat Kata Sandi Baru
        </h1>

        <p className="text-sm text-slate-600">
          Masukkan kata sandi baru untuk akun Super Admin Marketplace Ekonomi Kreatif Ende.
        </p>

        {sessionReady ? (
          <>
            <label className="block text-sm font-medium">
              Kata sandi baru
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border px-3 py-3 font-normal"
                placeholder="Minimal 8 karakter"
              />
            </label>

            <label className="block text-sm font-medium">
              Ulangi kata sandi baru
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border px-3 py-3 font-normal"
                placeholder="Ketik ulang kata sandi"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-marun px-4 py-3 font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
            </button>
          </>
        ) : (
          <p className="text-sm text-red-700">
            {message}
          </p>
        )}

        {sessionReady && message && (
          <p role="status" className="text-sm text-slate-700">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
