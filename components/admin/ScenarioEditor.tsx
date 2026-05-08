'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useState, useEffect, useCallback } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Link as LinkIcon,
  Table as TableIcon,
  Save,
  Zap,
  Clock,
  ChevronRight,
  AlertTriangle,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ScenarioEditorProps {
  scenario: any;
}

export default function ScenarioEditor({ scenario }: ScenarioEditorProps) {
  const [activeTab, setActiveTab] = useState('anamnes');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Placeholder.configure({ placeholder: 'Skriv kliniskt innehåll här...' }),
    ],
    content: scenario[`draft_${activeTab}`] || scenario[activeTab === 'status' ? 'status_section' : activeTab] || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[500px] max-w-none p-8',
      },
    },
    onUpdate: ({ editor }) => {
      debouncedSave(activeTab, editor.getHTML());
    },
  });

  // Debounced save logic
  const debouncedSave = useCallback(
    async (field: string, content: string) => {
      setIsSaving(true);
      setError(null);
      try {
        const fieldName = field === 'status' ? 'draft_status' : `draft_${field}`;
        const res = await fetch(`/api/admin/scenarios/${scenario.id}/draft`, {
          method: 'PATCH',
          body: JSON.stringify({ [fieldName]: content }),
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (!res.ok) throw new Error('Kunde inte spara utkast');
        
        setLastSaved(new Date());
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsSaving(false);
      }
    },
    [scenario.id]
  );

  // Switch tabs
  useEffect(() => {
    if (editor) {
      const content = scenario[`draft_${activeTab}`] || scenario[activeTab === 'status' ? 'status_section' : activeTab] || '';
      editor.commands.setContent(content);
    }
  }, [activeTab, editor, scenario]);

  const handlePublish = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/scenarios/${scenario.id}/publish`, {
        method: 'POST',
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Publicering misslyckades');
      
      router.refresh();
      alert('Scenario publicerat!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="flex gap-8 h-[calc(100vh-160px)]">
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-[var(--border-light)] overflow-hidden shadow-xl shadow-[var(--neutral)]/50">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-[var(--border-light)] flex items-center justify-between bg-[var(--neutral)]/30">
          <div className="flex items-center gap-1">
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleBold().run()} 
              active={editor.isActive('bold')}
              icon={Bold}
            />
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleItalic().run()} 
              active={editor.isActive('italic')}
              icon={Italic}
            />
            <div className="w-px h-4 bg-[var(--border-light)] mx-2" />
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleBulletList().run()} 
              active={editor.isActive('bulletList')}
              icon={List}
            />
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleOrderedList().run()} 
              active={editor.isActive('orderedList')}
              icon={ListOrdered}
            />
            <div className="w-px h-4 bg-[var(--border-light)] mx-2" />
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleBlockquote().run()} 
              active={editor.isActive('blockquote')}
              icon={Quote}
            />
            <ToolbarButton 
              onClick={() => {
                const url = window.prompt('URL:');
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }} 
              active={editor.isActive('link')}
              icon={LinkIcon}
            />
            <ToolbarButton 
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} 
              icon={TableIcon}
            />
          </div>

          <div className="flex items-center gap-2">
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={Undo} />
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={Redo} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--border-light)] px-6 bg-[var(--neutral)]/10">
          {['anamnes', 'status', 'behandling', 'debitering'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2",
                activeTab === tab 
                  ? "border-[var(--sidebar-text-active)] text-[var(--sidebar-text-active)] bg-white" 
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Editor Canvas */}
        <div className="flex-1 overflow-y-auto bg-white/50 backdrop-blur-sm">
          <EditorContent editor={editor} />
        </div>

        {/* Status Bar */}
        <div className="px-8 py-4 border-t border-[var(--border-light)] bg-[var(--neutral)]/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isSaving ? (
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest">
                <div className="w-2 h-2 bg-[var(--sidebar-text-active)] rounded-full animate-ping" />
                Sparar utkast...
              </div>
            ) : lastSaved ? (
              <div className="flex items-center gap-2 text-[var(--status-online)] text-[10px] font-bold uppercase tracking-widest">
                <Save className="w-3 h-3" />
                Senast sparad: {lastSaved.toLocaleTimeString()}
              </div>
            ) : null}
            
            {error && (
              <div className="flex items-center gap-2 text-[var(--status-danger)] text-[10px] font-bold uppercase tracking-widest">
                <AlertTriangle className="w-3 h-3" />
                {error}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              {editor.storage.characterCount?.characters?.() || 0} tecken
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="w-80 flex flex-col gap-6">
        {/* Publish Card */}
        <div className="bg-[var(--text-primary)] text-white rounded-[2rem] p-8 shadow-xl shadow-[var(--text-primary)]/20">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--sidebar-text-active)]" />
            Publicering
          </h4>
          <p className="text-xs opacity-60 leading-relaxed mb-6">
            Publicering skapar en permanent version och gör ändringarna synliga för användare.
          </p>
          
          <button 
            onClick={handlePublish}
            disabled={isSaving}
            className="w-full py-4 bg-[var(--sidebar-text-active)] rounded-2xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-[var(--sidebar-text-active)]/40"
          >
            Publicera Live
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-[2rem] border border-[var(--border-light)] p-8 flex-1">
          <h4 className="font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <History className="w-4 h-4 text-[var(--sidebar-text-active)]" />
            Versionshistorik
          </h4>
          
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-[var(--neutral)]">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--sidebar-text-active)] border-4 border-white shadow-md" />
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Nuvarande (Utkast)</p>
              <p className="text-xs font-bold text-[var(--text-primary)] mt-1">Du redigerar...</p>
            </div>
            
            <div className="relative pl-6 border-l-2 border-[var(--neutral)] opacity-50">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--neutral)] border-4 border-white" />
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Publicerad</p>
              <p className="text-xs font-bold text-[var(--text-primary)] mt-1">Version 1.4</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1">2 timmar sedan • Admin</p>
            </div>
            
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-version-history'))}
              className="text-xs font-bold text-[var(--sidebar-text-active)] hover:underline mt-4 flex items-center gap-1"
            >
              Visa alla versioner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ onClick, active, icon: Icon }: { onClick: () => void, active?: boolean, icon: any }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-lg transition-all",
        active 
          ? "bg-[var(--sidebar-text-active)] text-white shadow-inner" 
          : "text-[var(--text-muted)] hover:bg-white hover:text-[var(--text-primary)]"
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
