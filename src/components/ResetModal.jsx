import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ResetModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="reset-modal-title">
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-badge">
            <AlertTriangle size={28} className="text-warning" />
          </div>
          <div>
            <span className="badge badge-warning">Caution</span>
            <h3 id="reset-modal-title" style={{ marginTop: '0.25rem' }}>Reset Training Progress?</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
            Are you sure you want to reset all training progress? This action will permanently clear:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <li>Completed learning modules</li>
            <li>Simulation laboratory scenario investigations and scores</li>
            <li>Knowledge Assessment test attempts and scores</li>
            <li>Earned achievement badges and checklist items</li>
          </ul>
          <p style={{ marginTop: '0.75rem', fontSize: '0.88rem', color: '#94a3b8' }}>
            This cannot be undone. You will restart at 0% course progress as a Cyber Recruit.
          </p>
        </div>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}
