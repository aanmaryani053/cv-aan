import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Phone, MapPin, Sparkles } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Kolaborasi Riset / Proyek Sistem Informasi',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Kolaborasi Riset / Proyek Sistem Informasi',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">
              Hubungi & Berdiskusi
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Mari Berkolaborasi
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Terbuka untuk diskusi proyek analisis data anime, perancangan skema basis data sistem informasi,
              peluang magang data engineering, maupun riset akademik kolaboratif.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3.5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Email Resmi</div>
                  <a
                    href={`mailto:${PROFILE_INFO.email}`}
                    className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    {PROFILE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Lokasi Kampus</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {PROFILE_INFO.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-indigo-900">
              <strong className="block mb-1 text-indigo-950 font-bold">Ketersediaan Mahasiswa:</strong>
              Terbuka untuk kolaborasi tugas studi, eksplorasi riset data bersama dosen/rekan, asistensi praktikum basis data, serta peluang magang perkenalan (early internship) bidang sistem informasi.
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-7 sm:p-9 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Kirim Pesan Langsung</h3>
            <p className="text-xs text-slate-500 mb-6">
              Isi formulir di bawah ini dan saya akan merespon dalam kurun waktu kurang dari 24 jam.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Terima kasih telah menghubungi saya. Notifikasi telah diteruskan ke email dan akan segera ditindaklanjuti.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nama Lengkap:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Budi Santoso"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Alamat Email:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. budi@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Topik / Keperluan:
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Kolaborasi Riset / Proyek Sistem Informasi">
                      Kolaborasi Riset / Proyek Sistem Informasi
                    </option>
                    <option value="Tawaran Peluang Magang / Kerja Praktik">
                      Tawaran Peluang Magang / Kerja Praktik
                    </option>
                    <option value="Diskusi Analisis Data & Sistem Rekomendasi Anime">
                      Diskusi Analisis Data & Sistem Rekomendasi Anime
                    </option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Pesan Detail:
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan deskripsi ide, studi kasus, atau pertanyaan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
