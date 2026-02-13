import { useState } from 'react';
import { FaCheck, FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';

const DEFAULT_CHECKLIST = {
  name: 'Pre-Trade Checklist',
  isDefault: true,
  tasks: [
    'Analyzed chart on multiple timeframes',
    'Identified support/resistance zones',
    'Set Stop Loss correctly',
    'Calculated Risk/Reward ratio (min 1:2)',
    'Checked economic calendar',
    'Am calm and focused',
    'Verified lot size',
    'Defined clear exit plan',
  ],
};

const ChecklistPage = () => {
  const [checklists, setChecklists] = useState([DEFAULT_CHECKLIST]);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTasks, setEditTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createTasks, setCreateTasks] = useState([]);
  const [createNewTask, setCreateNewTask] = useState('');

  const startEdit = (idx) => {
    setEditingIdx(idx);
    setEditName(checklists[idx].name);
    setEditTasks([...checklists[idx].tasks]);
    setNewTaskText('');
  };

  const saveEdit = () => {
    if (!editName.trim()) return;
    setChecklists(prev => prev.map((c, i) => i === editingIdx ? { ...c, name: editName.trim(), tasks: editTasks } : c));
    setEditingIdx(null);
  };

  const addTaskToEdit = () => {
    if (!newTaskText.trim()) return;
    setEditTasks(prev => [...prev, newTaskText.trim()]);
    setNewTaskText('');
  };

  const removeTaskFromEdit = (taskIdx) => {
    setEditTasks(prev => prev.filter((_, i) => i !== taskIdx));
  };

  const deleteChecklist = (idx) => {
    setChecklists(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCreate = () => {
    if (!createName.trim() || createTasks.length === 0) return;
    const isFirst = checklists.length === 0;
    setChecklists(prev => [...prev, { name: createName.trim(), isDefault: isFirst, tasks: createTasks }]);
    setCreateName('');
    setCreateTasks([]);
    setCreateNewTask('');
    setShowCreate(false);
  };

  const setAsDefault = (idx) => {
    setChecklists(prev => prev.map((c, i) => ({ ...c, isDefault: i === idx })));
  };

  const inputClass = "w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-kmf-text-primary text-sm placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent transition-all";

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
            <FaCheck className="text-kmf-accent text-lg" />
          </div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Checklist</h1>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="w-10 h-10 rounded-lg bg-kmf-accent text-white flex items-center justify-center hover:bg-kmf-accent-bright transition-all">
          <FaPlus size={14} />
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <p className="text-sm font-semibold text-kmf-text-primary">Checklist Templates</p>
          <p className="text-xs text-kmf-text-tertiary">Create your own checklists. The default template will appear in Add Trade.</p>
        </div>
      </div>

      {/* Checklist Templates */}
      {checklists.map((checklist, idx) => (
        <div key={idx} className="bg-kmf-panel rounded-xl border-2 border-kmf-accent/20 overflow-hidden">
          {editingIdx === idx ? (
            <div className="p-5 space-y-3">
              <input type="text" className={inputClass} placeholder="Checklist name..." value={editName} onChange={(e) => setEditName(e.target.value)} />
              <div className="space-y-2">
                {editTasks.map((task, ti) => (
                  <div key={ti} className="flex items-center gap-2 bg-kmf-surface/50 rounded-lg p-2.5">
                    <span className="w-2 h-2 rounded-full bg-kmf-accent flex-shrink-0"></span>
                    <span className="flex-1 text-sm text-kmf-text-primary">{task}</span>
                    <button onClick={() => removeTaskFromEdit(ti)} className="p-1 text-kmf-text-tertiary hover:text-kmf-loss"><FaTimes size={11} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" className={`${inputClass} flex-1`} placeholder="Add new task..." value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTaskToEdit()} />
                <button onClick={addTaskToEdit} disabled={!newTaskText.trim()} className="px-3 py-2 rounded-lg bg-kmf-accent text-white text-sm disabled:opacity-50"><FaPlus size={12} /></button>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button onClick={() => setEditingIdx(null)} className="px-4 py-2 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary text-sm">Cancel</button>
                <button onClick={saveEdit} className="px-4 py-2 rounded-lg bg-kmf-accent text-white text-sm font-medium"><FaSave size={12} className="inline mr-1" />Save</button>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-base font-bold text-kmf-text-primary flex-1">{checklist.name}</h3>
                {checklist.isDefault && (
                  <span className="text-xs px-2 py-0.5 rounded bg-kmf-accent/20 text-kmf-accent font-medium">DEFAULT</span>
                )}
                <button onClick={() => startEdit(idx)} className="p-2 rounded-lg text-kmf-accent hover:bg-kmf-accent/10 transition-all"><FaEdit size={13} /></button>
                <button onClick={() => deleteChecklist(idx)} className="p-2 rounded-lg text-kmf-loss hover:bg-kmf-loss/10 transition-all"><FaTrash size={13} /></button>
              </div>
              <p className="text-xs text-kmf-text-tertiary mb-3">{checklist.tasks.length} tasks</p>
              <div className="space-y-1.5">
                {checklist.tasks.slice(0, 3).map((task, ti) => (
                  <div key={ti} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-kmf-accent flex-shrink-0"></span>
                    <span className="text-sm text-kmf-text-secondary">{task}</span>
                  </div>
                ))}
                {checklist.tasks.length > 3 && (
                  <p className="text-xs text-kmf-accent ml-3.5">+{checklist.tasks.length - 3} more...</p>
                )}
              </div>
              {!checklist.isDefault && (
                <button onClick={() => setAsDefault(idx)} className="mt-3 text-xs text-kmf-accent hover:text-kmf-accent-bright transition-all">
                  Set as default
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {checklists.length === 0 && (
        <div className="bg-kmf-panel rounded-xl p-12 border border-kmf-accent/10 text-center">
          <FaCheck className="text-kmf-accent text-3xl mx-auto mb-3" />
          <p className="text-kmf-text-tertiary text-sm">No checklists yet. Create one to get started!</p>
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/30 max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-4">Create Checklist</h3>
            <div className="space-y-3">
              <input type="text" className={inputClass} placeholder="Checklist name..." value={createName} onChange={(e) => setCreateName(e.target.value)} />
              <div className="space-y-2">
                {createTasks.map((task, ti) => (
                  <div key={ti} className="flex items-center gap-2 bg-kmf-surface/50 rounded-lg p-2.5">
                    <span className="w-2 h-2 rounded-full bg-kmf-accent flex-shrink-0"></span>
                    <span className="flex-1 text-sm text-kmf-text-primary">{task}</span>
                    <button onClick={() => setCreateTasks(prev => prev.filter((_, i) => i !== ti))} className="p-1 text-kmf-text-tertiary hover:text-kmf-loss"><FaTimes size={11} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" className={`${inputClass} flex-1`} placeholder="Add task..." value={createNewTask}
                  onChange={(e) => setCreateNewTask(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && createNewTask.trim()) { setCreateTasks(prev => [...prev, createNewTask.trim()]); setCreateNewTask(''); } }} />
                <button onClick={() => { if (createNewTask.trim()) { setCreateTasks(prev => [...prev, createNewTask.trim()]); setCreateNewTask(''); } }}
                  disabled={!createNewTask.trim()} className="px-3 py-2 rounded-lg bg-kmf-accent text-white text-sm disabled:opacity-50"><FaPlus size={12} /></button>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary text-sm">Cancel</button>
                <button onClick={handleCreate} disabled={!createName.trim() || createTasks.length === 0}
                  className="px-4 py-2 rounded-lg bg-kmf-accent text-white text-sm font-medium disabled:opacity-50">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistPage;
