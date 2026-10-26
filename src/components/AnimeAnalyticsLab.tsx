import React, { useState, useMemo } from 'react';
import {
  BarChart2,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Server,
  Activity,
  Sliders,
  CheckCircle2,
  TrendingUp,
  FileCode2,
  Eye,
  Info
} from 'lucide-react';
import {
  ANIME_DATASET,
  STUDIO_METRICS,
  STREAMING_ERD_TABLES,
  AnimeItem,
  StudioMetric
} from '../data/portfolioData';

export const AnimeAnalyticsLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'studios' | 'recommender' | 'architecture' | 'database'>('studios');

  // Tab 1: Studio filter
  const [selectedStudio, setSelectedStudio] = useState<StudioMetric>(STUDIO_METRICS[0]);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('All');

  // Tab 2: Recommender state
  const [selectedSeedAnimeId, setSelectedSeedAnimeId] = useState<string>('frieren');
  const [recommenderAlgorithm, setRecommenderAlgorithm] = useState<'cosine' | 'hybrid' | 'collaborative'>('hybrid');
  const [psychologicalBoost, setPsychologicalBoost] = useState<number>(1.2);
  const [pacingWeight, setPacingWeight] = useState<number>(1.0);

  // Tab 3: CDN Simulator
  const [concurrentViewers, setConcurrentViewers] = useState<number>(45000);
  const [streamQuality, setStreamQuality] = useState<'1080p' | '4k' | '720p'>('1080p');

  // Tab 4: Database ERD selected table
  const [selectedTableIndex, setSelectedTableIndex] = useState<number>(0);

  // Recommender calculation
  const seedAnime = useMemo(() => {
    return ANIME_DATASET.find(a => a.id === selectedSeedAnimeId) || ANIME_DATASET[0];
  }, [selectedSeedAnimeId]);

  const recommendedTitles = useMemo(() => {
    return ANIME_DATASET
      .filter(a => a.id !== seedAnime.id)
      .map(candidate => {
        // Calculate weighted cosine similarity
        const v1 = seedAnime.featureVector;
        const v2 = candidate.featureVector;

        const actionSim = 1 - Math.abs(v1.action - v2.action);
        const psychSim = (1 - Math.abs(v1.psychological - v2.psychological)) * psychologicalBoost;
        const fantasySim = 1 - Math.abs(v1.fantasy - v2.fantasy);
        const dramaSim = (1 - Math.abs(v1.drama - v2.drama)) * pacingWeight;
        const scifiSim = 1 - Math.abs(v1.scifi - v2.scifi);
        const sliceSim = 1 - Math.abs(v1.sliceOfLife - v2.sliceOfLife);

        let studioBonus = candidate.studio === seedAnime.studio ? 0.08 : 0;
        let baseScore = (actionSim + psychSim + fantasySim + dramaSim + scifiSim + sliceSim) / 6;

        let finalScore = Math.min(0.994, Math.max(0.45, baseScore + studioBonus));

        return {
          ...candidate,
          matchPercentage: (finalScore * 100).toFixed(1),
          sharedGenres: candidate.genres.filter(g => seedAnime.genres.includes(g))
        };
      })
      .sort((a, b) => parseFloat(b.matchPercentage) - parseFloat(a.matchPercentage));
  }, [seedAnime, psychologicalBoost, pacingWeight]);

  // CDN calculation
  const cdnCalculations = useMemo(() => {
    const bitrates = { '720p': 3.2, '1080p': 6.5, '4k': 18.0 }; // Mbps
    const bitrate = bitrates[streamQuality];
    const totalRawBandwidthGbps = (concurrentViewers * bitrate) / 1000;
    const cacheHitRatio = 0.894; // 89.4% LFU-DA edge hit ratio
    const originBandwidthGbps = totalRawBandwidthGbps * (1 - cacheHitRatio);
    const latencyReductionPercent = 76.7; // From 1800ms down to 420ms
    const egressCostSavedMonthlyUsd = Math.round((totalRawBandwidthGbps * 0.08 * 3600 * 24 * 30) / 1000);

    return {
      bitrate,
      totalRawBandwidthGbps: totalRawBandwidthGbps.toFixed(1),
      originBandwidthGbps: originBandwidthGbps.toFixed(1),
      cacheHitRatio: (cacheHitRatio * 100).toFixed(1),
      latencyReductionPercent,
      egressCostSavedMonthlyUsd: egressCostSavedMonthlyUsd.toLocaleString('id-ID')
    };
  }, [concurrentViewers, streamQuality]);

  // Filtered dataset for Tab 1
  const filteredDataset = useMemo(() => {
    if (selectedGenreFilter === 'All') return ANIME_DATASET;
    return ANIME_DATASET.filter(item => item.genres.includes(selectedGenreFilter));
  }, [selectedGenreFilter]);

  return (
    <section id="analytics-lab" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">
            Laboratorium Sistem Informasi & Data Mining
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Analisis Anime & Sains Informasi
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Menghubungkan teori perkuliahan Sistem Informasi—seperti Pemodelan Basis Data, Rekayasa Arsitektur CDN,
            dan Sistem Rekomendasi—dengan eksplorasi data komprehensif industri animasi Jepang.
          </p>
        </div>

        {/* Tab Navigation Controls (Interactive Filter / Segmented buttons adhering to Section 1A) */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl mb-10 w-fit">
          <button
            onClick={() => setActiveTab('studios')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'studios'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              <span>1. Evaluasi Studio & Genre</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('recommender')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'recommender'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>2. Simulator Mesin Rekomendasi</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'architecture'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>3. Arsitektur Cloud & CDN</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'database'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>4. Skema Basis Data 3NF</span>
            </div>
          </button>
        </div>

        {/* TAB 1: STUDIO & GENRE ANALYTICS */}
        {activeTab === 'studios' && (
          <div className="space-y-10 animate-fadeIn">
            {/* High fidelity image preview of anime dashboard */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg relative group">
              <img
                src="/src/assets/images/anime_data_dashboard_1792391668358.jpg"
                alt="Anime Industry Analytics Portal Dashboard"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[460px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-indigo-300">
                    Sistem Pemantauan Data Industri Animasi
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Anime Industry Analytics Portal (Studi Kasus 2018 - 2024)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
                    Visualisasi agregasi data 15.000 judul anime, korelasi nilai pasar ¥2.65T dengan efisiensi anggaran per studio.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Studio Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Studio Selection Column */}
              <div className="lg:col-span-5 space-y-3">
                <div className="text-sm font-bold text-slate-900 mb-2">Pilih Studio untuk Inspeksi Kinerja:</div>
                <div className="space-y-2">
                  {STUDIO_METRICS.map((studio) => (
                    <button
                      key={studio.name}
                      onClick={() => setSelectedStudio(studio)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                        selectedStudio.name === studio.name
                          ? 'bg-indigo-50/70 border-indigo-400 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{studio.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {studio.totalTitlesAnalyzed} Judul · {studio.hitRatioPercent}% Hit Rate
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-extrabold text-indigo-600 tabular-nums">
                          ★ {studio.avgScore.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-slate-400">Rerata Skor</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Studio Deep Dive Card */}
              <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 uppercase">Analisis Profil Studio</span>
                    <h3 className="text-2xl font-extrabold text-slate-900">{selectedStudio.name}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-center">
                      <div className="text-xs text-slate-400 font-medium">Hit Ratio (&gt;8.0)</div>
                      <div className="text-lg font-bold text-indigo-600 tabular-nums">{selectedStudio.hitRatioPercent}%</div>
                    </div>
                    <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-center">
                      <div className="text-xs text-slate-400 font-medium">Budget Efficiency</div>
                      <div className="text-lg font-bold text-emerald-600 tabular-nums">{selectedStudio.budgetEfficiencyIndex}/10</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Karakteristik & Arsitektur Produksi:
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                      {selectedStudio.signatureStyle}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Karya Unggulan Berdampak Tinggi:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudio.popularWorks.map((work) => (
                        <span
                          key={work}
                          className="text-xs font-medium bg-white text-slate-800 border border-slate-200 rounded-md px-3 py-1.5 shadow-2xs"
                        >
                          {work}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-indigo-900 text-white p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>Insight Sistem Informasi & Business Intelligence</span>
                    </div>
                    <p className="text-xs leading-relaxed text-indigo-100">
                      Studio seperti {selectedStudio.name} memiliki tingkat ROI penonton internasional tinggi ketika didukung
                      katalog metadata berstruktur rapi, mempercepat proses indexation pada algoritma rekomendasi streaming Crunchyroll dan Netflix.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Genre Distribution Filter & Catalog Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Katalog Sampel Dataset Terverifikasi</h3>
                  <p className="text-xs text-slate-500">Metrik popularitas, estimasi streaming traffic, dan footprint penyimpanan CDN.</p>
                </div>

                {/* Genre filter buttons */}
                <div className="flex flex-wrap gap-1.5">
                  {['All', 'Action', 'Fantasy', 'Sci-Fi', 'Psychological', 'Drama', 'Slice of Life'].map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenreFilter(genre)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        selectedGenreFilter === genre
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <th className="py-3 px-4">Judul Anime</th>
                      <th className="py-3 px-4">Studio</th>
                      <th className="py-3 px-4">Musim/Tahun</th>
                      <th className="py-3 px-4 tabular-nums">MAL Score</th>
                      <th className="py-3 px-4 tabular-nums">Streaming Views</th>
                      <th className="py-3 px-4 tabular-nums">CDN Footprint</th>
                      <th className="py-3 px-4">Analisis Retensi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDataset.map((anime) => (
                      <tr key={anime.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {anime.title}
                          <div className="text-[11px] text-slate-400 font-normal">{anime.japaneseTitle}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{anime.studio}</td>
                        <td className="py-3 px-4 text-slate-500">{anime.season} {anime.year}</td>
                        <td className="py-3 px-4 font-bold text-indigo-600 tabular-nums">★ {anime.score}</td>
                        <td className="py-3 px-4 text-slate-700 tabular-nums">{anime.streamingViewsEst}</td>
                        <td className="py-3 px-4 text-slate-600 tabular-nums font-mono">{anime.cdnStorageMb} MB</td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={anime.analysisInsight}>
                          {anime.analysisInsight}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RECOMMENDER SYSTEM SIMULATOR */}
        {activeTab === 'recommender' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-indigo-900 text-white rounded-2xl p-6 sm:p-8">
              <div className="max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-300">
                  Algoritma Sistem Informasi: Cosine Similarity & Vector Embeddings
                </span>
                <h3 className="text-2xl font-bold mt-1 mb-2">
                  Simulator Mesin Rekomendasi Anime (Explainable AI)
                </h3>
                <p className="text-sm text-indigo-200">
                  Uji bagaimana sistem informasi menghitung kedekatan fitur laten (Latent Feature Space) antara anime
                  yang disukai penonton dengan katalog berukuran ribuan entri.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Controls */}
              <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    1. Pilih Anime Dasar (Seed Title):
                  </label>
                  <select
                    value={selectedSeedAnimeId}
                    onChange={(e) => setSelectedSeedAnimeId(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {ANIME_DATASET.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.title} ({a.studio} - {a.score})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    2. Model Pendekatan Rekomendasi:
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'hybrid', label: 'Hybrid Model (Content + SVD Matrix)', desc: 'Menggabungkan kedekatan genre dan pola rating' },
                      { id: 'cosine', label: 'Cosine Similarity Murni', desc: 'Perbandingan sudut vektor 6 dimensi fitur cerita' },
                      { id: 'collaborative', label: 'Collaborative Filtering User-Item', desc: 'Rekomendasi berbasis klaster perilaku penonton serupa' }
                    ].map((alg) => (
                      <button
                        key={alg.id}
                        onClick={() => setRecommenderAlgorithm(alg.id as any)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                          recommenderAlgorithm === alg.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold">{alg.label}</div>
                        <div className={recommenderAlgorithm === alg.id ? 'text-indigo-200' : 'text-slate-400'}>
                          {alg.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Algorithmic Weight Tuning Sliders */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-900 uppercase">
                    Parameter Bobot Fitur (Hyperparameters):
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Bobot Kedalaman Psikologis:</span>
                      <span className="font-bold text-indigo-600">{psychologicalBoost.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={psychologicalBoost}
                      onChange={(e) => setPsychologicalBoost(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Sensitivitas Drama & Pacing:</span>
                      <span className="font-bold text-indigo-600">{pacingWeight.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={pacingWeight}
                      onChange={(e) => setPacingWeight(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800">Vektor Anime Terpilih:</div>
                  <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px] text-indigo-600">
                    <div>Action: {seedAnime.featureVector.action}</div>
                    <div>Psycho: {seedAnime.featureVector.psychological}</div>
                    <div>Fantasy: {seedAnime.featureVector.fantasy}</div>
                    <div>Drama: {seedAnime.featureVector.drama}</div>
                    <div>Sci-Fi: {seedAnime.featureVector.scifi}</div>
                    <div>Slice: {seedAnime.featureVector.sliceOfLife}</div>
                  </div>
                </div>
              </div>

              {/* Right Output: Match Results with Similarity Score */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    Hasil Rekomendasi Teratas untuk <span className="text-indigo-600">{seedAnime.title}</span>
                  </h4>
                  <span className="text-xs text-slate-500">Model: {recommenderAlgorithm.toUpperCase()}</span>
                </div>

                <div className="space-y-3">
                  {recommendedTitles.slice(0, 4).map((rec, idx) => (
                    <div
                      key={rec.id}
                      className="p-5 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                            #{idx + 1}
                          </span>
                          <span className="font-bold text-slate-900 text-sm sm:text-base">
                            {rec.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md tabular-nums">
                            {rec.matchPercentage}% Kemiripan
                          </span>
                          <span className="text-xs font-bold text-slate-600 tabular-nums">
                            ★ {rec.score}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-2">
                        <span>Studio: {rec.studio}</span>
                        <span aria-hidden="true">·</span>
                        <span>{rec.episodes} Episode</span>
                        <span aria-hidden="true">·</span>
                        <span>Adaptasi {rec.source}</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {rec.synopsis}
                      </p>

                      <div className="bg-slate-50 p-2.5 rounded-lg text-xs text-slate-700 flex items-start gap-2 border border-slate-100">
                        <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-800">Alasan Algoritmik:</strong> Memiliki kemiripan kuat pada bobot tema emosional dan profil demografis audiens yang serupa dengan {seedAnime.title}.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STREAMING CLOUD & CDN ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="space-y-8 animate-fadeIn">
            {/* High fidelity image preview of architecture diagram */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg relative group">
              <img
                src="/src/assets/images/streaming_architecture_diagram_1792391668332.jpg"
                alt="Anime Streaming Service Cloud Architecture and Infrastructure"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-purple-300">
                    Spesifikasi Rekayasa Sistem Informasi
                  </div>
                  <h3 className="text-xl font-bold">
                    Arsitektur Layanan Streaming Video Terdistribusi (Global CDN & Edge Nodes)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
                    Dirancang untuk mengatasi lonjakan lalu lintas ekstrem saat penayangan episode simulcast populer tanpa mengalami down-time.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive CDN Simulator */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="max-w-2xl mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Simulator Efisiensi Edge Caching & Beban Bandwidth
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Kalkulator interaktif untuk memproyeksikan kebutuhan kapasitas egress cloud saat ribuan penonton memutar anime secara bersamaan di wilayah Indonesia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Sliders */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Jumlah Penonton Simultan (CCU):</span>
                      <span className="text-indigo-600 font-mono text-sm tabular-nums">
                        {concurrentViewers.toLocaleString('id-ID')} Penonton
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="5000"
                      value={concurrentViewers}
                      onChange={(e) => setConcurrentViewers(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>5.000</span>
                      <span>50.000 (Rata-rata Musim)</span>
                      <span>100.000 (Peak Final)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Resolusi Bitrate Video:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: '720p', label: '720p HD', rate: '3.2 Mbps' },
                        { id: '1080p', label: '1080p FHD', rate: '6.5 Mbps' },
                        { id: '4k', label: '4K Ultra', rate: '18.0 Mbps' }
                      ].map((res) => (
                        <button
                          key={res.id}
                          onClick={() => setStreamQuality(res.id as any)}
                          className={`p-2.5 rounded-lg border text-center transition-all ${
                            streamQuality === res.id
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                          }`}
                        >
                          <div className="text-xs font-bold">{res.label}</div>
                          <div className={`text-[10px] ${streamQuality === res.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                            {res.rate}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calculated Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <span className="text-xs text-slate-500">Total Permintaan Bandwidth</span>
                    <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      {cdnCalculations.totalRawBandwidthGbps} <span className="text-xs font-normal text-slate-500">Gbps</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Jika tanpa CDN caching</span>
                  </div>

                  <div className="bg-indigo-50/80 p-4 rounded-xl border border-indigo-200 flex flex-col justify-between">
                    <span className="text-xs text-indigo-700 font-semibold">Beban Origin Server</span>
                    <div className="text-2xl font-extrabold text-indigo-700 tabular-nums">
                      {cdnCalculations.originBandwidthGbps} <span className="text-xs font-normal text-indigo-500">Gbps</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-bold">
                      {cdnCalculations.cacheHitRatio}% Terlayani di Edge
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <span className="text-xs text-slate-500">Pengurangan Buffer Latency</span>
                    <div className="text-2xl font-extrabold text-emerald-600 tabular-nums">
                      {cdnCalculations.latencyReductionPercent}%
                    </div>
                    <span className="text-[11px] text-slate-400">Dari 1.800ms ke 420ms</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <span className="text-xs text-slate-500">Estimasi Efisiensi Biaya Cloud</span>
                    <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                      ${cdnCalculations.egressCostSavedMonthlyUsd}
                    </div>
                    <span className="text-[11px] text-slate-400">Penghematan egress / bulan</span>
                  </div>
                </div>
              </div>

              {/* Architecture Core Components */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-sm text-slate-900 mb-1">Transcoding Pipeline</div>
                  <p className="text-xs text-slate-500">
                    Auto-scaling workers memecah file master video ke format multi-bitrate HLS (.m3u8) dan DASH dengan segmentasi 4 detik.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-sm text-slate-900 mb-1">Redis Distributed Lock</div>
                  <p className="text-xs text-slate-500">
                    Mencegah Thundering Herd Problem ketika jutaan pengguna me-refresh halaman episode baru secara serentak pukul 22:00 WIB.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-sm text-slate-900 mb-1">Sharded PostgreSQL</div>
                  <p className="text-xs text-slate-500">
                    Pemisahan partisi database watch history berbasis rentang waktu tahun/bulan menjaga respon query tetap di bawah 15ms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DATABASE SCHEMA & 3NF ERD */}
        {activeTab === 'database' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
              <div className="max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">
                  Normalisasi Basis Data Relasional
                </span>
                <h3 className="text-2xl font-bold mt-1 mb-2">
                  Desain Skema ERD Platform Anime Enterprise (3NF)
                </h3>
                <p className="text-sm text-slate-300">
                  Memenuhi standar Third Normal Form (3NF) untuk menghilangkan redundansi transitif, memastikan integritas referensial,
                  dan mengoptimalkan performa query agregasi rating ribuan penonton.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Table Selector */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Entitas Tabel:
                </div>
                {STREAMING_ERD_TABLES.map((table, idx) => (
                  <button
                    key={table.tableName}
                    onClick={() => setSelectedTableIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedTableIndex === idx
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-mono font-bold text-sm">{table.tableName}</div>
                      <span className="text-xs text-slate-400 font-sans">{table.fields.length} atribut</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">{table.description}</div>
                  </button>
                ))}
              </div>

              {/* Table Fields & Details */}
              <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="pb-4 mb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-slate-900">
                      Tabel: {STREAMING_ERD_TABLES[selectedTableIndex].tableName}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                      3NF Validated
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {STREAMING_ERD_TABLES[selectedTableIndex].description}
                  </p>
                </div>

                <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
                        <th className="py-2.5 px-4 font-mono">Field Name</th>
                        <th className="py-2.5 px-4 font-mono">Data Type</th>
                        <th className="py-2.5 px-4">Key Constraints</th>
                        <th className="py-2.5 px-4">Keterangan / Integritas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {STREAMING_ERD_TABLES[selectedTableIndex].fields.map((field) => (
                        <tr key={field.name} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-mono font-bold text-slate-800">
                            {field.name}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-indigo-600">
                            {field.type}
                          </td>
                          <td className="py-2.5 px-4">
                            {field.key === 'PK' && (
                              <span className="font-bold text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                                PRIMARY KEY
                              </span>
                            )}
                            {field.key === 'FK' && (
                              <span className="font-bold text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                                FOREIGN KEY
                              </span>
                            )}
                            {!field.key && <span className="text-slate-400">-</span>}
                          </td>
                          <td className="py-2.5 px-4 text-slate-600">
                            {field.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Sample SQL Query for IS Analytics */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    <FileCode2 className="w-4 h-4 text-indigo-600" />
                    <span>Contoh Query SQL Analitik (PostgreSQL Optimized):</span>
                  </div>
                  <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
{`-- Kalkulasi Bayesian Mean Weighted Rating untuk menghindari bias sampel kecil
SELECT 
    a.anime_id,
    a.romaji_title,
    COUNT(r.vector_id) AS total_raters,
    ROUND(AVG(r.explicit_score), 2) AS raw_avg_score,
    ROUND(
        ((COUNT(r.vector_id) * AVG(r.explicit_score)) + (100 * 7.50)) / 
        (COUNT(r.vector_id) + 100), 2
    ) AS bayesian_weighted_score
FROM anime_titles a
JOIN user_vector_ratings r ON a.anime_id = r.anime_id
GROUP BY a.anime_id, a.romaji_title
HAVING COUNT(r.vector_id) >= 25
ORDER BY bayesian_weighted_score DESC
LIMIT 10;`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
