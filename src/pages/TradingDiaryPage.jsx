import { useState } from 'react';
import { useTrades } from '../contexts/TradesContext';
import { EmotionMeta, createDiaryEntry } from '../data/models';
import { FaBook, FaPlus, FaEdit, FaTrashAlt, FaTimes, FaSave, FaSmile } from 'react-icons/fa';

const MOOD_LABELS = ['😞', '😕', '😐', '🙂', '😄'];

const inputClass = "w-full bg-kmf-surface border border-kmf-accent/15 rounded-xl px-4 py-2.5 text-sm text-kmf-text-primary placeholder:text-kmf-text-tertiary/40 focus:outline-none focus:border-kmf-accent focus:shadow-[0_0_0_3px_rgba(79,195,247,0.1)] transition-all input-glow";

const TradingDiaryPage = () => {
  const { diaryEntries, saveDiaryEntry, removeDiaryEntry, syncing } = useTrades();
  const [showEditor, setShowEditor] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState(createDiaryEntry());

  const openNewEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const existing = diaryEntries.find(e => e.date === today);
    if (existing) {
      setEditingEntry(existing);
      setForm({ ...existing });
    } else {
      setEditingEntry(null);
      setForm(createDiaryEntry());
    }
    setShowEditor(true);
  };

  const openEditEntry = (entry) => {
    setEditingEntry(entry);
    setForm({ ...entry });
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (!form.preMarketNotes.trim() && !form.postMarketNotes.trim() && !form.lessonsLearned.trim()) return;
    try {
      await saveDiaryEntry(form);
      setShowEditor(false);
    } catch (err) {
      console.error('[KMF] Diary save error:', err);
    }
  };

  const handleDelete = async (entry) => {
    try {
      await removeDiaryEntry(entry.id);
      setDeleteConfirm(null);
    } catch (err) {
      console.error('[KMF] Diary delete error:', err);
    }
  };

  const formatDisplayDate = (dateStr) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    const today = new Date();
    const isToday = dt.toDateString() === today.toDateString();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = dt.toDateString() === yesterday.toDateString();
    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';
    return dt.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 stagger-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20">
            <FaBook className="text-indigo-400 text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-kmf-text-primary">Trading Diary</h1>
            <p className="text-xs text-kmf-text-tertiary">{diaryEntries.length} entries</p>
          </div>
        </div>
        <button onClick={openNewEntry}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-primary text-sm font-bold hover-scale">
          <FaPlus size={12} /> New Entry
        </button>
      </div>

      {/* Entries */}
      {diaryEntries.length === 0 && !showEditor ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📖</p>
          <p className="text-kmf-text-tertiary text-sm mb-4">No diary entries yet. Start journaling your trading day!</p>
          <button onClick={openNewEntry} className="px-5 py-2.5 rounded-xl btn-primary text-white text-sm font-bold">
            Write First Entry
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {diaryEntries.map((entry) => (
            <div key={entry.id} className="glass-card rounded-2xl p-4 hover-glow transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{MOOD_LABELS[entry.mood - 1] || '😐'}</span>
                  <div>
                    <p className="text-sm font-bold text-kmf-text-primary">{formatDisplayDate(entry.date)}</p>
                    <p className="text-[10px] text-kmf-text-tertiary">{entry.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {entry.emotionState && EmotionMeta[entry.emotionState] && (
                    <span className="text-xs px-2 py-0.5 rounded-lg" style={{ backgroundColor: `${EmotionMeta[entry.emotionState].color}15`, color: EmotionMeta[entry.emotionState].color }}>
                      {EmotionMeta[entry.emotionState].icon} {EmotionMeta[entry.emotionState].label}
                    </span>
                  )}
                  <button onClick={() => openEditEntry(entry)}
                    className="p-1.5 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all">
                    <FaEdit size={12} />
                  </button>
                  <button onClick={() => setDeleteConfirm(entry)}
                    className="p-1.5 rounded-lg text-kmf-text-tertiary hover:text-kmf-loss hover:bg-kmf-loss/10 transition-all">
                    <FaTrashAlt size={12} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {entry.preMarketNotes && (
                  <div className="bg-kmf-surface/50 rounded-lg p-2.5">
                    <p className="text-[10px] text-kmf-accent uppercase tracking-wider mb-1">Pre-Market</p>
                    <p className="text-xs text-kmf-text-secondary leading-relaxed">{entry.preMarketNotes}</p>
                  </div>
                )}
                {entry.postMarketNotes && (
                  <div className="bg-kmf-surface/50 rounded-lg p-2.5">
                    <p className="text-[10px] text-kmf-profit uppercase tracking-wider mb-1">Post-Market</p>
                    <p className="text-xs text-kmf-text-secondary leading-relaxed">{entry.postMarketNotes}</p>
                  </div>
                )}
                {entry.lessonsLearned && (
                  <div className="bg-kmf-surface/50 rounded-lg p-2.5">
                    <p className="text-[10px] text-yellow-400 uppercase tracking-wider mb-1">Lessons Learned</p>
                    <p className="text-xs text-kmf-text-secondary leading-relaxed">{entry.lessonsLearned}</p>
                  </div>
                )}
                {entry.gratitude && (
                  <div className="bg-kmf-surface/50 rounded-lg p-2.5">
                    <p className="text-[10px] text-purple-400 uppercase tracking-wider mb-1">Gratitude</p>
                    <p className="text-xs text-kmf-text-secondary leading-relaxed">{entry.gratitude}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Dialog */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop" onClick={() => setShowEditor(false)}>
          <div className="glass-card rounded-2xl p-5 w-full max-w-lg max-h-[90vh] overflow-y-auto modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-kmf-text-primary">
                {editingEntry ? 'Edit Entry' : 'New Diary Entry'}
              </h3>
              <button onClick={() => setShowEditor(false)} className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent transition-all">
                <FaTimes size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-1 block">Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                  className={`${inputClass} cursor-pointer`} />
              </div>

              {/* Mood */}
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-2 block">
                  <FaSmile className="inline mr-1" /> Mood
                </label>
                <div className="flex gap-2 justify-center">
                  {MOOD_LABELS.map((emoji, i) => (
                    <button key={i} type="button" onClick={() => setForm(prev => ({ ...prev, mood: i + 1 }))}
                      className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                        form.mood === i + 1
                          ? 'bg-kmf-accent/15 border-2 border-kmf-accent/50 scale-110 shadow-[0_0_12px_rgba(79,195,247,0.2)]'
                          : 'bg-kmf-surface/50 border border-transparent hover:border-kmf-accent/20 hover:scale-105'
                      }`}>
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emotion State */}
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-2 block">Emotional State</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {Object.entries(EmotionMeta).map(([key, meta]) => (
                    <button key={key} type="button" onClick={() => setForm(prev => ({ ...prev, emotionState: prev.emotionState === key ? null : key }))}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-all ${
                        form.emotionState === key
                          ? 'border-2 shadow-[0_0_12px_rgba(79,195,247,0.15)]'
                          : 'bg-kmf-surface/50 border border-transparent hover:border-kmf-accent/20'
                      }`}
                      style={form.emotionState === key ? { borderColor: meta.color, backgroundColor: `${meta.color}15` } : {}}>
                      <span className="text-lg">{meta.icon}</span>
                      <span className={form.emotionState === key ? 'text-kmf-text-primary' : 'text-kmf-text-tertiary'}>{meta.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pre-Market Notes */}
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-1 block">Pre-Market Notes</label>
                <textarea className={`${inputClass} min-h-[70px] resize-y`} placeholder="What's your game plan today? What setups are you watching?"
                  value={form.preMarketNotes} onChange={(e) => setForm(prev => ({ ...prev, preMarketNotes: e.target.value }))} rows={3} />
              </div>

              {/* Post-Market Notes */}
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-1 block">Post-Market Notes</label>
                <textarea className={`${inputClass} min-h-[70px] resize-y`} placeholder="How did the day go? Did you follow your plan?"
                  value={form.postMarketNotes} onChange={(e) => setForm(prev => ({ ...prev, postMarketNotes: e.target.value }))} rows={3} />
              </div>

              {/* Lessons Learned */}
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-1 block">Lessons Learned</label>
                <textarea className={`${inputClass} min-h-[60px] resize-y`} placeholder="Key takeaways from today..."
                  value={form.lessonsLearned} onChange={(e) => setForm(prev => ({ ...prev, lessonsLearned: e.target.value }))} rows={2} />
              </div>

              {/* Gratitude */}
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-1 block">Gratitude</label>
                <textarea className={`${inputClass} min-h-[60px] resize-y`} placeholder="What are you grateful for today?"
                  value={form.gratitude} onChange={(e) => setForm(prev => ({ ...prev, gratitude: e.target.value }))} rows={2} />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowEditor(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-kmf-text-secondary text-sm font-medium hover-scale transition-all">
                Cancel
              </button>
              <button onClick={handleSave} disabled={syncing}
                className="flex-1 py-3 rounded-xl btn-primary text-sm font-bold disabled:opacity-50 hover-scale flex items-center justify-center gap-2">
                <FaSave size={12} /> {syncing ? 'Saving...' : 'Save Entry'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="glass-card rounded-2xl p-5 w-full max-w-sm modal-content border-kmf-loss/20" style={{ borderWidth: 1 }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-1">Delete Entry?</h3>
            <p className="text-xs text-kmf-text-tertiary mb-2">{deleteConfirm.date}</p>
            <p className="text-sm text-kmf-text-secondary mb-4">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-kmf-text-secondary text-sm font-medium hover-scale transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-kmf-loss/15 border border-kmf-loss/30 text-kmf-loss text-sm font-bold hover:bg-kmf-loss/25 hover-scale transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingDiaryPage;
