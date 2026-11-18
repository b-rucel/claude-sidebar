// The inputs of the MCP tools the session had connected when this mod
// was last saved, from each server's tools/list inputSchema.
// Merges into the engine's ToolCallInput (types/ McpToolInputs) so
// `e.tool === "mcp__<server>__<tool>"` narrows to the tool's arguments.
// Written again at a save of the mod with a server connected.
export {}
declare module 'claude-code' {
  interface McpToolInputs {
    /** Report every terminal pane's agent status in one read-only call: the agent's state, source, session and in-flight tool, its subagents, the bound IPC peer and its unread message count, pending approvals targeting the pane, git branch and changes, worktree task, and token usage. Results are keyed by surface_id; is_self marks the calling pane. surface_id also accepts a calyx-session ID in place of the raw surface UUID. */
    "mcp__calyx-ipc__agent_status": {
      /** Read each pane's git branch, changes and worktree task (default true) */
      include_git?: boolean
      /** Surface UUID or calyx-session ID of the one pane to report; omit to report every pane */
      surface_id?: string
    }
    /** Broadcast a message to all other peers */
    "mcp__calyx-ipc__broadcast": {
      /** Message content */
      content: string
      /** Sender peer ID */
      from: string
    }
    /** Get status information for a specific peer */
    "mcp__calyx-ipc__get_peer_status": {
      /** Peer ID to check */
      peer_id: string
    }
    /** List all registered peers */
    "mcp__calyx-ipc__list_peers": {}
    /** Dispatch multiple MCP-LSP tools in a single MCP round-trip. Each entry specifies the inner tool name and its argument object; results are returned as an ordered array of {tool, result|error} entries. */
    "mcp__calyx-ipc__lsp_batch": {
      /** Ordered list of inner tool invocations to dispatch. Nested 'lsp_batch' entries are rejected per-entry. Capped at 64 entries per batch. */
      requests: Array<{
        /** Argument payload forwarded verbatim to the inner tool */
        params: {}
        /** Name of the bridge tool to dispatch (e.g. 'lsp_hover') */
        tool: string
      }>
    }
    /** Get incoming calls for a CallHierarchyItem returned by lsp_call_hierarchy_prepare. */
    "mcp__calyx-ipc__lsp_call_hierarchy_incoming": {
      /** CallHierarchyItem returned by lsp_call_hierarchy_prepare */
      item: {}
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Get outgoing calls for a CallHierarchyItem returned by lsp_call_hierarchy_prepare. */
    "mcp__calyx-ipc__lsp_call_hierarchy_outgoing": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** CallHierarchyItem returned by lsp_call_hierarchy_prepare */
      item: {}
    }
    /** Prepare a call hierarchy at a position. Returns CallHierarchyItem entries to use with incoming/outgoing calls. */
    "mcp__calyx-ipc__lsp_call_hierarchy_prepare": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based UTF-16 column / character offset */
      column: number
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based line number */
      line: number
    }
    /** Return the server's static + dynamic capability snapshot for a workspace+language. Reads the session-resident CapabilityRegistry — no LSP request is sent. */
    "mcp__calyx-ipc__lsp_capabilities": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Report installation status of LSP servers (optionally for one languageId). */
    "mcp__calyx-ipc__lsp_check_installation": {
      /** Optional. If present, check only this languageId; otherwise check every registry entry. */
      language_id?: string
    }
    /** Request code actions (quick fixes, refactors) for a range in a file. */
    "mcp__calyx-ipc__lsp_code_action": {
      /** 0-based end line of the target range */
      end_line: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based start column of the target range */
      start_column: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** 0-based start line of the target range */
      start_line: number
      /** 0-based end column of the target range */
      end_column: number
      /** Absolute path or file:// URI of the target file */
      file: string
      /** Filter for action kinds the caller is interested in (e.g. ['quickfix','refactor.extract']). Forwarded into context.only. */
      only?: string[]
      /** Diagnostics overlapping the range. Forwarded into context.diagnostics so quickfix providers see the same set of problems the client surfaces. */
      diagnostics?: {}[]
      /** CodeActionTriggerKind: 1=Invoked, 2=Automatic. Forwarded into context.triggerKind. */
      trigger_kind?: number
    }
    /** Resolve the edit / command of a CodeAction returned by lsp_code_action (codeAction/resolve). */
    "mcp__calyx-ipc__lsp_code_action_resolve": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** CodeAction returned by lsp_code_action. Forwarded verbatim to codeAction/resolve. */
      code_action: {}
    }
    /** Get code lens entries (e.g. references, run/debug actions) for a document. */
    "mcp__calyx-ipc__lsp_code_lens": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Resolve the command / data of a code lens entry returned by lsp_code_lens. */
    "mcp__calyx-ipc__lsp_code_lens_resolve": {
      /** CodeLens object returned by lsp_code_lens. Forwarded verbatim to codeLens/resolve. */
      code_lens: {}
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Get textual color presentations (hex / rgba labels) for a color at a range. */
    "mcp__calyx-ipc__lsp_color_presentation": {
      /** LSP Color with red, green, blue, alpha doubles in the closed range [0, 1]. */
      color: {}
      /** 0-based end line of the target range */
      end_line: number
      /** 0-based end column of the target range */
      end_column: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** 0-based start line of the target range */
      start_line: number
      /** 0-based start column of the target range */
      start_column: number
      /** Absolute path or file:// URI of the target file */
      file: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Request code completion suggestions at a position. */
    "mcp__calyx-ipc__lsp_completion": {
      /** 0-based UTF-16 column / character offset */
      column: number
      /** Single character that triggered completion (only when trigger_kind == 2) */
      trigger_character?: string
      /** 0-based line number */
      line: number
      /** CompletionTriggerKind: 1=Invoked, 2=TriggerCharacter, 3=TriggerForIncompleteCompletions */
      trigger_kind?: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Resolve additional details (documentation, detail, additionalTextEdits) for a CompletionItem returned by lsp_completion (completionItem/resolve). */
    "mcp__calyx-ipc__lsp_completion_resolve": {
      /** CompletionItem returned by lsp_completion. Forwarded verbatim to completionItem/resolve. */
      completion_item: {}
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Resolve a definition that may live in a sibling workspace. Dispatches textDocument/definition in the requested workspace first; when empty, asks textDocument/moniker for a portable identifier and fans workspace/symbol across every warm LSPService session. */
    "mcp__calyx-ipc__lsp_cross_workspace_definition": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** 0-based UTF-16 column / character offset */
      column: number
    }
    /** Go to the declaration(s) of the symbol at a position. */
    "mcp__calyx-ipc__lsp_declaration": {
      /** 0-based UTF-16 column / character offset */
      column: number
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the target file */
      file: string
    }
    /** Go to the definition(s) of the symbol at a position. */
    "mcp__calyx-ipc__lsp_definition": {
      /** 0-based UTF-16 column / character offset */
      column: number
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Pull the current diagnostics for a file (textDocument/diagnostic). */
    "mcp__calyx-ipc__lsp_diagnostics": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Optional result id from a prior diagnostic response */
      previous_result_id?: string
      /** Optional server-side identifier from registration */
      identifier?: string
      /** Absolute path or file:// URI of the target file */
      file: string
    }
    /** Return the diagnostics that changed in a workspace since a previous snapshot id. Reads from the bridge-owned DiagnosticsStore — no LSP request is sent. */
    "mcp__calyx-ipc__lsp_diagnostics_diff": {
      /** LSP languageId — accepted for parity with other tools but not used by the diff (the store keys on workspace only). */
      language_id?: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Snapshot id previously issued by the store; the diff returns URIs whose diagnostics changed strictly after this id. */
      since_snapshot_id: number
    }
    /** Notify the server that files/folders have been created (workspace/didCreateFiles). Sent as an LSP notification — no response. */
    "mcp__calyx-ipc__lsp_did_create_files": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Array of file descriptors. Each entry carries the keys: uri */
      files: Array<{
        /** file:// URI for this file or folder */
        uri: string
      }>
    }
    /** Notify the server that files/folders have been deleted (workspace/didDeleteFiles). Sent as an LSP notification — no response. */
    "mcp__calyx-ipc__lsp_did_delete_files": {
      /** Array of file descriptors. Each entry carries the keys: uri */
      files: Array<{
        /** file:// URI for this file or folder */
        uri: string
      }>
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Notify the server that files/folders have been renamed (workspace/didRenameFiles). Sent as an LSP notification — no response. */
    "mcp__calyx-ipc__lsp_did_rename_files": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Array of file descriptors. Each entry carries the keys: oldUri, newUri */
      files: Array<{
        /** file:// URI for this file or folder */
        newUri: string
        /** file:// URI for this file or folder */
        oldUri: string
      }>
    }
    /** Get color references in a document for color presentation pickers. */
    "mcp__calyx-ipc__lsp_document_color": {
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Highlight every occurrence of the symbol at a position within the file. */
    "mcp__calyx-ipc__lsp_document_highlight": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** 0-based UTF-16 column / character offset */
      column: number
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Absolute path or file:// URI of the target file */
      file: string
    }
    /** Get document links (e.g. import paths, URLs) for a document. */
    "mcp__calyx-ipc__lsp_document_link": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Resolve the target / data of a DocumentLink returned by lsp_document_link. */
    "mcp__calyx-ipc__lsp_document_link_resolve": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** DocumentLink object returned by lsp_document_link. Forwarded verbatim to documentLink/resolve. */
      document_link: {}
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Return the symbol tree (classes, functions, etc.) for a single file. */
    "mcp__calyx-ipc__lsp_document_symbol": {
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Get folding ranges (regions, imports, comments) for a document. */
    "mcp__calyx-ipc__lsp_folding_range": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Absolute path or file:// URI of the target file */
      file: string
    }
    /** Format a whole document (textDocument/formatting). */
    "mcp__calyx-ipc__lsp_formatting": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** FormattingOptions object: { tabSize: int, insertSpaces: bool, trimTrailingWhitespace?: bool, insertFinalNewline?: bool, trimFinalNewlines?: bool } */
      options: {}
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the target file */
      file: string
    }
    /** Search for symbols across every cached LSP session (any workspace, any languageId). Fans `workspace/symbol` out across `LSPService.allSessions()` and concatenates the results. */
    "mcp__calyx-ipc__lsp_global_workspace_symbol": {
      /** Substring to match against symbol names */
      query: string
    }
    /** Get hover information (type signature, docs) at a position in a file. */
    "mcp__calyx-ipc__lsp_hover": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** 0-based line number */
      line: number
      /** 0-based UTF-16 column / character offset */
      column: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Absolute path or file:// URI of the target file */
      file: string
    }
    /** AI-friendly bundle of hover + definition + surrounding source for a position. Fans out textDocument/hover and textDocument/definition in parallel and surfaces them, along with a ±context_lines source snippet around the cursor, and (when discoverable) resolves up to 5 dependent type identifiers via workspace/symbol + follow-up hover lookups. */
    "mcp__calyx-ipc__lsp_hover_bundle": {
      /** 0-based UTF-16 column / character offset */
      column: number
      /** Lines of source context to include around (line, column) in surrounding_code. Default 10, min 0, max 100. */
      context_lines?: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Go to the implementation(s) of the symbol at a position. */
    "mcp__calyx-ipc__lsp_implementation": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based UTF-16 column / character offset */
      column: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based line number */
      line: number
    }
    /** Get inlay hints (inferred type / parameter labels) for a range in a document. */
    "mcp__calyx-ipc__lsp_inlay_hint": {
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based start column of the target range */
      start_column: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based end line of the target range */
      end_line: number
      /** 0-based start line of the target range */
      start_line: number
      /** 0-based end column of the target range */
      end_column: number
    }
    /** Resolve the tooltip / text edits / label parts of an InlayHint returned by lsp_inlay_hint. */
    "mcp__calyx-ipc__lsp_inlay_hint_resolve": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** InlayHint object returned by lsp_inlay_hint. Forwarded verbatim to inlayHint/resolve. */
      inlay_hint: {}
    }
    /** Get inline value hints for a range while a debugger is stopped at a frame. */
    "mcp__calyx-ipc__lsp_inline_value": {
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based end column of the target range */
      end_column: number
      /** 0-based start line of the target range */
      start_line: number
      /** 0-based end column of the stopped-location range. Defaults to end_column. */
      stopped_end_column?: number
      /** 0-based start column of the stopped-location range. Defaults to start_column. */
      stopped_start_column?: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** DAP stack frame id where execution has stopped. Defaults to 0. */
      frame_id?: number
      /** 0-based end line of the target range */
      end_line: number
      /** 0-based start line of the stopped-location range. Defaults to start_line. */
      stopped_start_line?: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based end line of the stopped-location range. Defaults to end_line. */
      stopped_end_line?: number
      /** 0-based start column of the target range */
      start_column: number
    }
    /** Auto-install the LSP server for a languageId. */
    "mcp__calyx-ipc__lsp_install": {
      /** If true, the installer is also allowed to install missing prerequisites (e.g. npm). */
      approve_prerequisites?: boolean
      /** Target languageId to install (e.g. 'typescript') */
      language_id: string
    }
    /** Return the current install status for a languageId. */
    "mcp__calyx-ipc__lsp_install_status": {
      /** Target languageId to query */
      language_id: string
    }
    /** Get linked editing ranges at a position (e.g. matching open/close tags). */
    "mcp__calyx-ipc__lsp_linked_editing_range": {
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the target file */
      file: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** 0-based UTF-16 column / character offset */
      column: number
    }
    /** Get monikers (cross-project symbol identifiers) at a position. */
    "mcp__calyx-ipc__lsp_moniker": {
      /** 0-based UTF-16 column / character offset */
      column: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Notify the server that a notebook document has changed (notebookDocument/didChange). Sent as an LSP notification — no response. */
    "mcp__calyx-ipc__lsp_notebook_did_change": {
      /** LSP notebook-document params payload. Shape matches DidOpenNotebookDocumentParams / DidChangeNotebookDocumentParams / DidCloseNotebookDocumentParams depending on the tool. */
      notebook: {}
      /** LSP languageId (e.g. 'typescript', 'python') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Notify the server that a notebook document has been closed (notebookDocument/didClose). Sent as an LSP notification — no response. */
    "mcp__calyx-ipc__lsp_notebook_did_close": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'python') */
      language_id: string
      /** LSP notebook-document params payload. Shape matches DidOpenNotebookDocumentParams / DidChangeNotebookDocumentParams / DidCloseNotebookDocumentParams depending on the tool. */
      notebook: {}
    }
    /** Notify the server that a notebook document has been opened (notebookDocument/didOpen). Sent as an LSP notification — no response. */
    "mcp__calyx-ipc__lsp_notebook_did_open": {
      /** LSP notebook-document params payload. Shape matches DidOpenNotebookDocumentParams / DidChangeNotebookDocumentParams / DidCloseNotebookDocumentParams depending on the tool. */
      notebook: {}
      /** LSP languageId (e.g. 'typescript', 'python') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Format around the character typed at a position (textDocument/onTypeFormatting). */
    "mcp__calyx-ipc__lsp_on_type_formatting": {
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based UTF-16 column where the character was typed */
      column: number
      /** 0-based line number where the character was typed */
      line: number
      /** FormattingOptions object: { tabSize: int, insertSpaces: bool, trimTrailingWhitespace?: bool, insertFinalNewline?: bool, trimFinalNewlines?: bool } */
      options: {}
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** The character that triggered on-type formatting (e.g. '}' or ';') */
      ch: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Check whether the symbol at a position can be renamed. */
    "mcp__calyx-ipc__lsp_prepare_rename": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** 0-based line number */
      line: number
      /** 0-based UTF-16 column / character offset */
      column: number
    }
    /** Format a range in a document (textDocument/rangeFormatting). */
    "mcp__calyx-ipc__lsp_range_formatting": {
      /** 0-based end column of the target range */
      end_column: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based start column of the target range */
      start_column: number
      /** 0-based start line of the target range */
      start_line: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** FormattingOptions object: { tabSize: int, insertSpaces: bool, trimTrailingWhitespace?: bool, insertFinalNewline?: bool, trimFinalNewlines?: bool } */
      options: {}
      /** 0-based end line of the target range */
      end_line: number
    }
    /** Find all references to the symbol at a position. */
    "mcp__calyx-ipc__lsp_references": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Whether to include the declaration site in the result */
      include_declaration?: boolean
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based line number */
      line: number
      /** 0-based UTF-16 column / character offset */
      column: number
    }
    /** Rename the symbol at a position across the workspace. */
    "mcp__calyx-ipc__lsp_rename": {
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** New name to apply to the symbol */
      new_name: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based UTF-16 column / character offset */
      column: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Get selection ranges for an array of positions in a document. */
    "mcp__calyx-ipc__lsp_selection_range": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Positions at which to compute selection ranges */
      positions: Array<{
        /** 0-based UTF-16 column / character offset */
        column: number
        /** 0-based line number */
        line: number
      }>
    }
    /** Get a delta of semantic tokens against a previous result id (textDocument/semanticTokens/full/delta). */
    "mcp__calyx-ipc__lsp_semantic_tokens_delta": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** resultId returned by a previous semanticTokens/full (or /delta) call */
      previous_result_id: string
      /** Absolute path or file:// URI of the target file */
      file: string
    }
    /** Get semantic tokens for a whole document (textDocument/semanticTokens/full). */
    "mcp__calyx-ipc__lsp_semantic_tokens_full": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Get semantic tokens for a range in a document (textDocument/semanticTokens/range). */
    "mcp__calyx-ipc__lsp_semantic_tokens_range": {
      /** 0-based end column of the target range */
      end_column: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** 0-based start column of the target range */
      start_column: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based end line of the target range */
      end_line: number
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based start line of the target range */
      start_line: number
    }
    /** Shut down a specific LSP session and forget it from the cache. */
    "mcp__calyx-ipc__lsp_session_shutdown": {
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** List every currently open LSP session. */
    "mcp__calyx-ipc__lsp_session_status": {}
    /** Pre-start an LSP session for a workspace + languageId pair. Optionally pre-opens an initial set of files so subsequent position/range/file tools can dispatch immediately. */
    "mcp__calyx-ipc__lsp_session_warmup": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Optional list of files (absolute paths or file:// URIs) to pre-open via textDocument/didOpen as soon as the session is running. Missing files are silently skipped. */
      files?: string[]
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Get signature help (parameter info) at a position. */
    "mcp__calyx-ipc__lsp_signature_help": {
      /** 0-based UTF-16 column / character offset */
      column: number
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** BFS a call or type hierarchy from a seed item. `kind` selects the walk direction: call_incoming (default) routes through callHierarchy/incomingCalls, call_outgoing through callHierarchy/outgoingCalls, type_supertypes / type_subtypes prepare via textDocument/prepareTypeHierarchy and then iterate typeHierarchy/{supertypes,subtypes}. Returns `{items: [{level, item, edge?}], depth_reached: Int}`. */
    "mcp__calyx-ipc__lsp_symbol_walk": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** BFS depth (number of hops to expand). Default 1, min 1, max 5 — a hard cap that guards against runaway server fan-out. */
      depth?: number
      /** Direction to walk. One of: call_incoming (default), call_outgoing, type_supertypes, type_subtypes. */
      kind?: string
      /** Seed item. For call_incoming / call_outgoing this is a CallHierarchyItem; for type_supertypes / type_subtypes a TypeHierarchyItem (structurally identical). Forwarded verbatim to the underlying LSP request. */
      item: {}
    }
    /** Go to the type definition(s) of the symbol at a position. */
    "mcp__calyx-ipc__lsp_type_definition": {
      /** 0-based line number */
      line: number
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** 0-based UTF-16 column / character offset */
      column: number
      /** Absolute path or file:// URI of the target file */
      file: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Prepare a type hierarchy at a position. Returns TypeHierarchyItem entries to use with supertypes/subtypes. */
    "mcp__calyx-ipc__lsp_type_hierarchy_prepare": {
      /** 0-based UTF-16 column / character offset */
      column: number
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Absolute path or file:// URI of the target file */
      file: string
      /** 0-based line number */
      line: number
    }
    /** Get subtypes for a TypeHierarchyItem returned by lsp_type_hierarchy_prepare. */
    "mcp__calyx-ipc__lsp_type_hierarchy_subtypes": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** TypeHierarchyItem returned by lsp_type_hierarchy_prepare */
      item: {}
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Get supertypes for a TypeHierarchyItem returned by lsp_type_hierarchy_prepare. */
    "mcp__calyx-ipc__lsp_type_hierarchy_supertypes": {
      /** TypeHierarchyItem returned by lsp_type_hierarchy_prepare */
      item: {}
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Notify the server of an impending file/folder creation (workspace/willCreateFiles). Returns an optional WorkspaceEdit the server wants applied before the create happens. */
    "mcp__calyx-ipc__lsp_will_create_files": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Array of file descriptors. Each entry carries the keys: uri */
      files: Array<{
        /** file:// URI for this file or folder */
        uri: string
      }>
    }
    /** Notify the server of an impending file/folder deletion (workspace/willDeleteFiles). Returns an optional WorkspaceEdit the server wants applied before the delete happens. */
    "mcp__calyx-ipc__lsp_will_delete_files": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Array of file descriptors. Each entry carries the keys: uri */
      files: Array<{
        /** file:// URI for this file or folder */
        uri: string
      }>
    }
    /** Notify the server of an impending file/folder rename (workspace/willRenameFiles). Returns an optional WorkspaceEdit the server wants applied before the rename happens. */
    "mcp__calyx-ipc__lsp_will_rename_files": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Array of file descriptors. Each entry carries the keys: oldUri, newUri */
      files: Array<{
        /** file:// URI for this file or folder */
        newUri: string
        /** file:// URI for this file or folder */
        oldUri: string
      }>
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Apply a WorkspaceEdit locally. Bridge-internal — no LSP request is sent. With commit:false, returns a dry-run failure; with commit:true, the minimal stub reports applied:true (the FS write is owned by a follow-up batch). */
    "mcp__calyx-ipc__lsp_workspace_apply_edit": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** If true, commit the edit. If false, perform a dry-run that reports applied:false / failureReason:'dry-run'. */
      commit: boolean
      /** Optional human-readable label for the edit (used by clients for undo UI). */
      label?: string
      /** WorkspaceEdit to apply (LSP WorkspaceEdit shape: changes / documentChanges / changeAnnotations). */
      edit: {}
    }
    /** Read a bridge-side workspace configuration value previously written with lsp_workspace_configuration_set. No LSP request is sent. */
    "mcp__calyx-ipc__lsp_workspace_configuration_get": {
      /** Configuration section identifier (e.g. 'editor.tabSize') */
      section: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
    }
    /** Write a bridge-side workspace configuration value visible to lsp_workspace_configuration_get. No LSP request is sent. */
    "mcp__calyx-ipc__lsp_workspace_configuration_set": {
      /** Value to store. Any JSON-shaped value is accepted and round-tripped verbatim. */
      value: unknown
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Configuration section identifier (e.g. 'editor.tabSize') */
      section: string
    }
    /** Pull workspace-wide diagnostics (workspace/diagnostic). */
    "mcp__calyx-ipc__lsp_workspace_diagnostic_pull": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Previously-known {uri, value} result ids. Optional; defaults to an empty list. */
      previous_result_ids?: Array<{
        /** Previous resultId from the server */
        value: string
        /** Document URI the prior result id belongs to */
        uri: string
      }>
      /** Optional server-side identifier from registration */
      identifier?: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Execute a server-side command (workspace/executeCommand). */
    "mcp__calyx-ipc__lsp_workspace_execute_command": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** Identifier of the command handler on the server */
      command: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
      /** Optional arguments forwarded verbatim to the server-side command handler. */
      arguments?: unknown[]
    }
    /** Search for symbols across the whole workspace by name. */
    "mcp__calyx-ipc__lsp_workspace_symbol": {
      /** Substring to match against symbol names */
      query: string
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Resolve the full location of a WorkspaceSymbol returned by lsp_workspace_symbol (workspaceSymbol/resolve). */
    "mcp__calyx-ipc__lsp_workspace_symbol_resolve": {
      /** Absolute path or file:// URI of the workspace root */
      workspace_root: string
      /** WorkspaceSymbol returned by lsp_workspace_symbol. Forwarded verbatim to workspaceSymbol/resolve. */
      workspace_symbol: {}
      /** LSP languageId (e.g. 'typescript', 'rust') */
      language_id: string
    }
    /** Execute a command-palette entry by its id. An unknown id is rejected with the list of currently available ids. Requires in-app user approval unless auto-approve is enabled; {"status":"denied"}, {"status":"approval_timeout"}, and {"status":"dismissed"} are normal results — after denied or dismissed, do not retry without new user intent. */
    "mcp__calyx-ipc__palette_execute": {
      /** The command-palette entry's id to execute */
      command_id: string
    }
    /** List every terminal pane across all open Calyx windows. Pane identity is split-tree leaf membership -- the same membership every other pane operation (pane_split, and pane_run/pane_send_keys once available) resolves against, so a pane this tool reports is guaranteed operable. */
    "mcp__calyx-ipc__pane_list": {}
    /** Run a command in a pane by pasting its text and pressing Return. surface_id also accepts a calyx-session ID in place of the raw surface UUID. Requires in-app user approval unless auto-approve is enabled; {"status":"denied"}, {"status":"approval_timeout"}, and {"status":"dismissed"} are normal results — after denied or dismissed, do not retry without new user intent. */
    "mcp__calyx-ipc__pane_run": {
      /** The command text to send */
      command: string
      /** Surface UUID or calyx-session ID of the pane to run the command in */
      surface_id: string
      /** Wait for completion of the command THIS call starts (start-time correlated via shell-integration tracking, never an unrelated already-running command); on untracked shells the wait times out */
      await?: boolean
      /** default 30000, clamped [0,55000] */
      timeout_ms?: number
    }
    /** Send raw text to a pane verbatim, with no Return appended. surface_id also accepts a calyx-session ID in place of the raw surface UUID. Requires in-app user approval unless auto-approve is enabled; {"status":"denied"}, {"status":"approval_timeout"}, and {"status":"dismissed"} are normal results — after denied or dismissed, do not retry without new user intent. */
    "mcp__calyx-ipc__pane_send_keys": {
      /** verbatim paste; NO Return appended; \u0003 = Ctrl-C; may be empty */
      text: string
      /** Surface UUID or calyx-session ID of the pane to send text to */
      surface_id: string
    }
    /** Split an existing pane, creating a new one alongside it. surface_id also accepts a calyx-session ID in place of the raw surface UUID. */
    "mcp__calyx-ipc__pane_split": {
      /** Surface UUID or calyx-session ID of the pane to split */
      surface_id: string
      /** Split direction: "right" or "down" */
      direction: string
    }
    /** Receive pending messages for this peer. Each returned message is removed from the inbox as part of this call, so it will not be returned again by a later call. */
    "mcp__calyx-ipc__receive_messages": {
      /** Your peer ID */
      peer_id: string
    }
    /** Register this Claude Code instance as a peer for IPC communication */
    "mcp__calyx-ipc__register_peer": {
      /** Peer role */
      role?: string
      /** Peer display name */
      name: string
    }
    /** Send a message to a specific peer */
    "mcp__calyx-ipc__send_message": {
      /** Message content */
      content: string
      /** Sender peer ID */
      from: string
      /** Target peer ID */
      to: string
    }
    /** Create a new tab, optionally in a named group and/or at a specific working directory. This visibly changes focus in the live app window -- the new tab becomes active immediately, an effect an MCP caller should know it's triggering. */
    "mcp__calyx-ipc__tab_create": {
      /** Working directory for the new tab's shell; must be an existing directory */
      cwd?: string
      /** Existing or new tab group name; defaults to the current window's active group */
      group_name?: string
    }
    /** Block until a running command finishes (or the timeout elapses) and return its record. surface_id also accepts a calyx-session ID. Omit command_id to wait on the surface's newest running command. On timeout the result is {"status": "timeout"} -- the caller should simply call terminal_await_command again to keep waiting. */
    "mcp__calyx-ipc__terminal_await_command": {
      /** The command's id to wait on; defaults to the surface's newest running command */
      command_id?: string
      /** Surface UUID or calyx-session ID to await a command on */
      surface_id: string
      /** Milliseconds to wait before giving up (default 30000, clamped to [0, 55000]) */
      timeout_ms?: number
    }
    /** List commands tracked for a terminal surface, oldest-first. surface_id also accepts a calyx-session ID in place of the raw surface UUID. Each entry carries output_total_rows/output_truncated metadata but never the captured text itself -- use terminal_read_output for that. */
    "mcp__calyx-ipc__terminal_list_commands": {
      /** Filter to one state: running, finished, or orphaned */
      state?: string
      /** Cap the result to the N most recently started commands */
      limit?: number
      /** Surface UUID or calyx-session ID to list commands for */
      surface_id: string
    }
    /** Read a specific command's captured output by its id (from terminal_list_commands / terminal_await_command). Alt-screen or zero-output commands return an empty text with total_rows 0. output_unavailable: true means capture was impossible (distinct from a genuinely empty capture). output_pending: true means the command has already finished and its output is merely still being redacted -- retry shortly. */
    "mcp__calyx-ipc__terminal_read_output": {
      /** The command's id, as returned by terminal_list_commands / terminal_await_command */
      command_id: string
    }
    /** Report Claude Code token usage as counted by Claude Code itself and received by Calyx, aggregated by the group_by dimensions (default model and effort). Each row carries input, cache read, cache creation and output token sums and the last timestamp; rows with unreported true are tokens Calyx knows were used but did not receive in detail. totals covers every matching row, also when limit cut the rows. Requires Settings > Agents > Usage Tracking. */
    "mcp__calyx-ipc__usage_report": {
      /** Only sessions whose project root is exactly this path */
      project?: string
      /** Only the last N local calendar days, today included (1 = today), from 1 to 100000. Not with since/until */
      days?: number
      /** Inclusive lower bound, YYYY-MM-DDTHH:MM:SS[.fff]Z (UTC) */
      since?: string
      /** Dimensions to group by, in key order: model, effort, thread, agent_type, day, project, session. Default ["model", "effort"]; [] gives the totals as at most two rows (recorded, unreported) */
      group_by?: Array<"model" | "effort" | "thread" | "agent_type" | "day" | "project" | "session">
      /** Only this Claude Code session; "current" is the session running in the calling pane */
      session_id?: string
      /** Maximum rows returned, 1 to 1000 (default 200) */
      limit?: number
      /** Only this thread: main, subagent or auxiliary */
      thread?: string
      /** Exclusive upper bound, YYYY-MM-DDTHH:MM:SS[.fff]Z (UTC) */
      until?: string
    }
    /** Returns the latest context reported by the MCP App views open in this terminal pane: one text block per view, holding that view's structured content as JSON. */
    "mcp__calyx-mcp__app_context": {}
    /** Create a doc, or apply several operations to one doc atomically. */
    mcp__claude_ai_Claude_Docs__batch: {
      batch?: unknown[]
      container?: {
        kind: string
        id?: string
        create?: {}
      }
      verbose?: boolean
      opId?: string
    }
    /** Create one object in a doc: a tab, its contents, a comment, an upload record. */
    mcp__claude_ai_Claude_Docs__create: {
      object: "file" | "node" | "utterance" | "enum" | "blob"
      engine?: string
      payload: {} | string
      container?: {
        kind: string
        id: string
        version?: string
      }
      verbose?: boolean
      opId?: string
      artifact?: string
    }
    /** Delete one object from a doc: a tab, its contents, a comment, an upload record. A doc keeps at least one tab (deleting its last refuses `last_tab`): to start over, rewrite that tab's contents with `update`, never delete and recreate the tab. */
    mcp__claude_ai_Claude_Docs__delete: {
      ref: {
        object: "project" | "file" | "node" | "utterance"
        id: string
      }
      engine?: string
      container?: {
        kind: string
        id: string
        version?: string
      }
      payload?: {} | string
      verbose?: boolean
      opId?: string
    }
    /** Export one tab inline as base64: pdf, docx, html, text, markdown or notion (Notion-flavored markdown, what notion-create-pages takes). To just keep the file in the doc's files, create a blob {from: {object: "file", id}, format} instead (no large result). */
    mcp__claude_ai_Claude_Docs__export: {
      container: {
        kind: string
        id: string
        version?: string
      }
      file: string
      format: "markdown" | "text" | "html" | "docx" | "pdf" | "notion"
      paper?: "letter" | "a4"
      maxBytes?: number
    }
    /** Docs guides: topic.instructions repeats the server instructions. Read it only if your client dropped them. Also topic.<name>, refusal.<code>. After a doc's birth → ["topic.index"]. */
    mcp__claude_ai_Claude_Docs__guide: {
      /** topic.<name> (instructions, index, editing, tabs, comments, charts, chart-definition, diagram, uploads, sharing, skill) or refusal.<code>; several per call is fine. */
      items?: unknown[]
    }
    /** List a tab's or a doc's comment history (threads, replies, resolves). */
    mcp__claude_ai_Claude_Docs__query: {
      container?: {
        kind: string
        id: string
        version?: string
      }
      object?: "utterance"
      payload?: {} | string
    }
    /** Read a doc (lists its tabs), a tab's contents, or a comment. A claude.ai/[code/]artifact/[<title>-]<id> link → `ref {"object":"project","id":"<id>"}` first; reads inside it take `container {"kind":"project","id":"<id>"}`. */
    mcp__claude_ai_Claude_Docs__read: {
      ref: {
        object: "project" | "file" | "node" | "utterance" | "enum" | "blob"
        id: string
      }
      engine?: string
      container?: {
        kind: string
        id: string
        version?: string
      }
      payload?: {} | string
    }
    /** Edit a tab's contents, rename a doc or tab, or change a stored value. */
    mcp__claude_ai_Claude_Docs__update: {
      ref: {
        object: "project" | "file" | "node" | "utterance" | "enum"
        id: string
      }
      engine?: string
      payload: {} | string
      container?: {
        kind: string
        id: string
        version?: string
      }
      verbose?: boolean
      opId?: string
      answering?: string
    }
    /** Opens a connection to a Google Colab browser session and unlocks notebook editing tools. Returns a boolean representing whether the connection attempt succeeded */
    "mcp__colab-mcp__open_colab_browser_connection": {}
    /** git merge --abort in a checkout left mid-merge by a conflicted integrate_worktree: the target worktree, or the original folder ("origin"). */
    mcp__hiveterm__abort_worktree_merge: {
      /** The checkout to abort in: a worktree id, or "origin" (default). */
      target_worktree_id?: string
      /** Hive of the original folder when target is "origin". Defaults to the caller's. */
      project_id?: string
    }
    /** Register a worktree that already exists on disk (created outside HiveTerm) so agents can run in it. It must be a linked worktree of the project's repository. */
    mcp__hiveterm__adopt_worktree: {
      /** Absolute path of the existing worktree. */
      path: string
      /** Hive it belongs to. Defaults to the caller's. */
      project_id?: string
    }
    /** Ask another hive agent in THEIR live session and wait for the reply here. Use this when you are CEO and want CTO's answer in this conversation: the question appears in the target's tab (the user sees it), they reply in that session, and this call returns their answer. `to` is a sidebar name ('CTO') or a bee id from list_bees. If they are stopped, HiveTerm starts/resumes them first. If they are mid-turn, the question interrupts and injects. Do NOT use write_input + read_output for this — you will not get a clean reply. Do NOT use send_message (that bus is for spawned helpers parked on read_inbox, not hive agents at a TUI prompt). */
    mcp__hiveterm__ask_agent: {
      /** Target sidebar name (e.g. 'CTO') or bee id from list_bees. */
      to: string
      /** Alias for `to`. */
      agent_id?: string
      /** Alias for `to`. */
      to_agent_id?: string
      /** The question / request for the other agent. */
      content: string
      /** Seconds to wait for their reply (default 180, max 600). On timeout the question is still in their session — they may still answer there. */
      timeout_s?: number
    }
    /** Block until the bee you messaged replies to a given messageId (or until timeout). Returns the structured reply. Replaces the fragile 'sleep N seconds then read_output and parse the terminal' pattern — you get the clean answer the instant it's sent. */
    mcp__hiveterm__await_reply: {
      /** The messageId returned by send_message. */
      message_id: string
      /** Max seconds to wait (default 120, max 300). */
      timeout_s?: number
    }
    /** Create an agent. Default: a PERMANENT hive agent, the same as the user's Add agent button — saved to hive.yml, listed under AGENTS with the unseen pin (the user's focus stays where it is), starts unless start=false, returns beeId `{projectId}/{name}`. With temporary=true: a helper that lives under Sub-agents (id queen/...) and is meant to die with the task; give it the work through `task` (first prompt) and `instructions` (persona), and it is nested under you. Duplicate names auto-increment (Claude → Claude 2). Omit command to use the user's configured Agent Tool. */
    mcp__hiveterm__create_agent: {
      /** Team for this hive agent; created if missing. Not supported for temporary helpers. */
      team?: string
      /** Sidebar name / hive.yml key (e.g. 'Reviewer', 'Claude'). Duplicate names auto-increment. */
      name: string
      /** Default false. True = a helper under Sub-agents (queen/ id) meant to die with the task, not saved to hive.yml. Accepts the helper-only fields task, wait_for_task, parent_id. */
      temporary?: boolean
      /** temporary=true only: the INITIAL TASK, delivered as the agent's first prompt (what it should DO). Distinct from instructions (who it IS). */
      task?: string
      /** temporary=true only, default true: with no task, a Claude helper waits on its inbox for the first send_message. */
      wait_for_task?: boolean
      /** temporary=true only: the bee to nest the helper under. Defaults to you. */
      parent_id?: string
      /** Which agent CLI runs it: 'claude', 'codex', 'grok', 'agy', 'gemini', 'kimi', 'opencode' (flags allowed, e.g. 'claude --model opus'). NOT a shell command — a process belongs in run_command. Omit to use the configured Agent Tool matching `name`. */
      agent?: string
      /** Alias of `agent`, kept for older prompts. Same rule: an agent CLI only. */
      command?: string
      /** Working directory (absolute path). Defaults to the caller's cwd. */
      working_dir?: string
      /** Execution context: a worktree id from list_worktrees, or "origin" for the project's original folder. Omitted: inherits YOUR worktree. With working_dir, that directory must be inside the worktree. */
      worktree_id?: string
      /** Hive to add the agent to. Defaults to the caller's. Another open hive works — a holding's agent creating into a brand's repository. */
      project_id?: string
      /** Optional system prompt / persona. Loaded natively so it survives context compaction. */
      instructions?: string
      /** Optional path to a file whose contents become the system prompt (live reference). Wins over instructions. */
      instructions_file?: string
      /** YOLO / bypass approval prompts (Claude --dangerously-skip-permissions, Codex --dangerously-bypass-approvals-and-sandbox, Grok --always-approve). */
      skip_permissions?: boolean
      /** Optional model pin (--model). Omit to use the agent's default. */
      model?: string
      /** Default true. When true, the CLI may rewrite the sidebar name from its terminal title (e.g. Claude Code session topic). */
      auto_rename?: boolean
      /** Default true. When true, the agent starts immediately so the user can talk to it. */
      start?: boolean
    }
    /** Create a scheduled hive routine — the same as the user's New routine button. It is saved, appears under Routines in the sidebar, and fires into a live hive-agent session (not a throwaway overlay). Default agent is you. schedule is daily | weekdays | weekly | every_n_hours | once (NOT cron); time is HH:MM in the user's timezone; `once` also needs date (YYYY-MM-DD) and runs a single time — perfect for 'do this tomorrow at 3pm'. When the user asks to do something every day/week, use this — do not promise to remember. Pass run_now:true to fire immediately (does not wait for the agent to finish). Scoped to your hive. */
    mcp__hiveterm__create_routine: {
      /** Sidebar name (e.g. 'Git standup'). */
      name: string
      /** The prompt injected into the agent's live session on every run. */
      task: string
      /** Hive agent to attach to (sidebar / hive.yml name, e.g. 'CTO'). Defaults to you. Must be an AGENTS bee, not a sub-agent. */
      agent?: string
      /** daily | weekdays | weekly | every_n_hours | once. Also accepts 'daily 09:00'. `once` needs `date`. */
      schedule?: string
      /** For schedule 'once': the local date, YYYY-MM-DD. */
      date?: string
      /** HH:MM 24h wall-clock time in tz (default 09:00). Ignored for every_n_hours. */
      time?: string
      /** For weekly: 1=Mon ... 7=Sun, or names like 'mon'. Required for weekly. */
      days?: Array<number | string>
      /** For every_n_hours: cadence in hours (1–24, default 4). */
      n?: number
      /** For every_n_hours: minute past the hour (0–59). */
      minute?: number
      /** IANA timezone. Defaults to the host timezone. */
      tz?: string
      /** Default true. false creates a paused routine. */
      enabled?: boolean
      /** If true, also start a manual run immediately. Returns runId without waiting for the agent to finish. */
      run_now?: boolean
      /** Optional model pin for the agent CLI. */
      model?: string
      /** Project directory. Defaults to your cwd. */
      working_dir?: string
      /** Worktree the runs execute in (an id from list_worktrees). Default: the project's original folder. */
      worktree_id?: string
      /** Hive to add the routine to. Defaults to yours. Cross-project is rejected. */
      project_id?: string
    }
    /** Create a worktree of the project on a new branch (or an existing, unused one), under HiveTerm's local worktrees folder, and prepare it (the project's recipe: copied files + preparation command, run as a visible command). Returns the worktree id to pass as worktree_id when creating agents. Two agents that should share files get ONE worktree; separate tasks get separate worktrees. */
    mcp__hiveterm__create_worktree: {
      /** Branch name to create (or to check out when from_existing=true). */
      branch: string
      /** Commit-ish the new branch starts from. Default: the original folder's HEAD (no fetch). */
      base?: string
      /** Default false. True checks out an existing branch that no worktree has. */
      from_existing?: boolean
      /** Default true. Run the project's preparation recipe after creating. */
      prepare?: boolean
      /** Hive to create in. Defaults to the caller's. */
      project_id?: string
      /** Idempotency key: a retry with the same id returns the worktree the first call created. */
      request_id?: string
    }
    /** Remove a bee for good — the sidebar's Remove: stops it and drops it from hive.yml / the sub-agents list, so it disappears from the sidebar. Not undoable. Another hive's agent works too, addressed by its full id from list_agents. Pass agent_id explicitly. */
    mcp__hiveterm__delete_agent: {
      /** The agent id to remove. */
      agent_id: string
    }
    /** Delete a routine in your hive by id or name, including its run history. */
    mcp__hiveterm__delete_routine: {
      name?: string
      id?: string
    }
    /** Create ANOTHER agent with the same configuration (tool, flags, model, instructions, team) in a worktree, so both can work at the same time. Nothing of the conversation is copied. Names auto-increment (Claude → Claude 2). */
    mcp__hiveterm__duplicate_agent: {
      /** The agent to copy. */
      agent_id: string
      /** Where the copy runs: a worktree id, or "origin". Default: the source agent's own context. */
      worktree_id?: string
      /** Name for the copy. Default: the source's name, auto-incremented. */
      name?: string
      /** Default true: start the copy right away. */
      start?: boolean
    }
    /** Get detailed status of a specific process. */
    mcp__hiveterm__get_agent_status: {
      /** The agent id */
      agent_id: string
    }
    /** The project's worktree recipe: files copied into a new worktree when absent (copy_files, relative to the original folder), the preparation commands per platform (prepare_unix / prepare_windows: one command per line, run in order, stopping at the first failure) and the environment for them and for agents there (env). */
    mcp__hiveterm__get_worktree_recipe: {
      /** Hive to read. Defaults to the caller's. */
      project_id?: string
    }
    /** Merge a worktree's branch into a target (default: the original folder) — fast-forward when possible, a merge commit otherwise. Refused (integration_blocked) while the target has uncommitted changes, an agent runs in it, or a merge is in progress; refused (preview_stale) when the branch no longer matches the commits you reviewed. Always call prepare_worktree_delivery first and pass its commit shas as expected_commits. A conflict leaves the target mid-merge: resolve it there, or abort_worktree_merge. */
    mcp__hiveterm__integrate_worktree: {
      /** The worktree whose branch is merged. */
      worktree_id: string
      /** Destination worktree id, or "origin" (default). */
      target_worktree_id?: string
      /** The commit shas prepare_worktree_delivery listed, newest first. The merge happens only if the branch still brings exactly these. */
      expected_commits: string[]
    }
    /** Interrupt what a bee is doing right now (Esc in its session) without stopping it — the closest thing to a pause. Its session stays open for the next prompt. Another hive's agent works too, addressed by its full id from list_agents. */
    mcp__hiveterm__interrupt_agent: {
      /** The agent id to interrupt. */
      agent_id: string
    }
    /** List the agents in your hive — and the command / terminal bees, told apart by `sidebar` (agents | sub-agents | commands | terminals). Each row has id, name, type, status, command. Hive agents (Add agent / create_agent) use `{projectId}/{name}` ids; temporary helpers use `queen/...`. */
    mcp__hiveterm__list_agents: {
      /** Default false (your own hive). True also lists the agents of every other open hive, for reaching one of them by its full id. */
      all_projects?: boolean
    }
    /** List routines in your hive: id, name, agent, schedule (plain English), enabled, next/last run. Use id or name with update_routine / delete_routine / run_routine. Scoped to your project. */
    mcp__hiveterm__list_routines: {
      /** Defaults to your hive. Cross-project is rejected. */
      project_id?: string
    }
    /** List the project's worktrees (execution contexts): id, path, branch, whether it is usable, and which agents run in it. The original folder is reported separately as `origin`. Use an id here as worktree_id in create_agent / run_command / move_agent_worktree. */
    mcp__hiveterm__list_worktrees: {
      /** Hive to list. Defaults to the caller's. */
      project_id?: string
    }
    /** Transfer a STOPPED agent to another worktree (or back to the original folder with "origin"), keeping its identity, instructions and the conversation it had in each context. Refused with agent_running while it runs — stop_agent first, then move, then start_agent / resume_agent. */
    mcp__hiveterm__move_agent_worktree: {
      /** The agent to move. */
      agent_id: string
      /** Destination worktree id, or "origin". */
      worktree_id: string
    }
    /** Send a desktop notification to the user. Use this to alert the user when a long-running task completes, when something needs attention, or to provide a status update. The notification appears as a native OS notification. */
    mcp__hiveterm__notify: {
      /** Notification title (e.g. 'Task Complete', 'Build Failed') */
      title: string
      /** Notification body with details */
      body: string
    }
    /** Run the project's preparation recipe in a worktree again: copy the recipe's files when absent and run its preparation command as a visible command bee. Returns whether it started, finished, or failed. */
    mcp__hiveterm__prepare_worktree: {
      /** The worktree to prepare. */
      worktree_id: string
    }
    /** Produce the review of what a worktree's branch would bring into a target (default: the original folder): the commits, and every blocker (uncommitted changes, running agents, a merge in progress). This never merges. To merge, pass the commit shas it returned to integrate_worktree; the desktop's Worktrees tab shows the same review to the user. */
    mcp__hiveterm__prepare_worktree_delivery: {
      /** The worktree whose branch is delivered. */
      worktree_id: string
      /** Destination worktree id, or "origin" (default). */
      target_worktree_id?: string
    }
    /** Read YOUR inbox — structured messages from send_message/reply. Messages are leased until this tool result is delivered (auto-acked by Queen); if delivery fails they reappear for the next call — so prefer wait_s and retry WHILE you are still expecting a message. Returns { messages, timedOut?, leaseId? }. Pass wait_s to BLOCK until a message arrives (use right after spawn for your first task). Once your exchange is done, STOP — do not sit in a read_inbox loop; the sender delivers follow-ups (send_message, ask_bee). */
    mcp__hiveterm__read_inbox: {
      /** Block up to N seconds for a message to arrive (max 300). Keep it ≤50: an MCP client typically times out a single tool call around 60s, so a longer wait just errors at that ceiling and wastes a turn. Retry while you are still waiting for an expected message; once the exchange is done, stop instead of polling. Omit to return immediately. */
      wait_s?: number
    }
    /** Read recent PTY output from a process. Returns up to 256KB of buffered output. Use encoding="screen" for full-screen TUI agents (Antigravity, interactive Codex, k9s, ...): the raw byte stream is replayed through a virtual VT100 and the final visible screen is returned as plain text — strips ANSI / cursor moves / OSC color polls that would otherwise dominate the buffer. utf8 returns the raw byte stream (lossy-decoded), base64 returns it verbatim. */
    mcp__hiveterm__read_output: {
      /** The agent id */
      agent_id: string
      /** Only return the last N bytes */
      last_n_bytes?: number
      /** Output encoding (default: utf8). "screen" renders the bytes through a virtual VT100 and returns the visible terminal contents. */
      encoding?: "utf8" | "base64" | "screen"
      /** Virtual screen width for encoding="screen" (default 200, max 1000). */
      cols?: number
      /** Virtual screen height for encoding="screen" (default 50, max 1000). */
      rows?: number
    }
    /** Remove a worktree's folder through git. The conversations agents had there survive; the branch too unless delete_branch=true. Refused (removal_blocked) on uncommitted changes, a running agent, a lock or a merge in progress; ignored files (.env, node_modules) need force_ignored=true. Agents bound to it keep their binding and show "destination removed" until they are moved (move_agent_worktree) or deleted. */
    mcp__hiveterm__remove_worktree: {
      /** The worktree to remove. */
      worktree_id: string
      /** Default false. True removes even when ignored files would be lost. */
      force_ignored?: boolean
      /** Default false. True also deletes the branch, with git's safe delete: refused (branchDeleted=false in the result) while it has commits the original folder's branch lacks. worktree_removal_preview says whether it is integrated. */
      delete_branch?: boolean
    }
    /** Reply to a message you received (by its id). The answer is routed back to the sender and correlated: if they are blocked in wait_for_reply/await_reply it returns there immediately; otherwise a one-line pointer is typed into their live session so they read it from their inbox (nudge:false = inbox only). The result's delivery field says which ('inbox' | 'session' | 'queued'). This is also how the sender knows you FINISHED — no need for them to wait/poll. */
    mcp__hiveterm__reply: {
      /** The id of the message you're answering (from read_inbox). */
      reply_to: string
      /** Your reply body. */
      content: string
    }
    /** Restart a bee by ID — the sidebar's Restart (stop + start with the same configuration). */
    mcp__hiveterm__restart_agent: {
      /** The agent id to restart */
      agent_id: string
    }
    /** Start a stopped agent and CONTINUE its last conversation — the sidebar's Resume (claude --resume, codex resume, ...). Errors when no resumable session was recorded; start_agent is the clean-session one. Another hive's agent works too, addressed by its full id from list_agents. */
    mcp__hiveterm__resume_agent: {
      /** The agent id to resume (from list_bees). */
      agent_id: string
    }
    /** Run a shell command as a bee — a dev server, a build, a watcher, a script — listed under COMMANDS in the sidebar with its own terminal, so the user can see it and stop it. Not for agents: use create_agent (temporary=true for a helper). */
    mcp__hiveterm__run_command: {
      /** Display name for the process */
      name: string
      /** Shell command to run. For agents, omit to use the configured Agent Tool command. To pass an initial task: claude --dangerously-skip-permissions "task description" (do NOT use -p, it exits after one response). For Antigravity use 'agy "task"' — it only accepts a task inline at spawn (no bus / no write_input). */
      command?: string
      /** Working directory (absolute path) */
      working_dir?: string
      /** Execution context: a worktree id from list_worktrees, or "origin" for the project's original folder. Omitted: inherits YOUR worktree. With working_dir, that directory must be inside the worktree. */
      worktree_id?: string
      /** agent id of the parent agent. ALWAYS pass $HIVETERM_BEE_ID from your environment to create the correct tree hierarchy in the sidebar. */
      parent_id?: string
      /** Project ID to add the bee to. If omitted, auto-detects from working_dir or uses 'queen'. */
      project_id?: string
      /** Environment variables */
      env?: {}
      /** Default 'command'. 'agent' is accepted for old callers only — create_agent(temporary:true) is the listed way to spawn a helper. */
      type?: "command" | "agent"
      /** Spawn the agent in YOLO / bypass mode (no approval prompts) so agent-to-agent work doesn't stall on 'Allow tool?'. Injects the agent-appropriate flag automatically (Claude --dangerously-skip-permissions, Codex --dangerously-bypass-approvals-and-sandbox). Use this when orchestrating, especially for spawned participants that must reply via tools. */
      skip_permissions?: boolean
      /** Optional model to start the agent on (injected as --model). Use the chosen CLI's own model name (e.g. Claude 'opus'/'sonnet'/'haiku', Codex its model ids). Omit to use the agent's default and let it pick the best model for the task. */
      model?: string
      /** Optional system-prompt / persona for an agent sub-agent. Loaded natively (Claude --append-system-prompt-file) so it survives context compaction — NOT typed into the chat. Persisted with the sub-agent. Only applies to type=agent. NOTE: a system prompt is INERT until a turn starts — to make the agent actually DO something on boot, use `task` (or send_message after spawn), not instructions. */
      instructions?: string
      /** Optional path to a file whose contents become the agent's system prompt (live reference, re-read on each start). Wins over 'instructions'. Relative paths resolve against working_dir. Only applies to type=agent. */
      instructions_file?: string
      /** Optional INITIAL TASK delivered as the agent's first user turn (the inline prompt the CLI runs on boot) — distinct from `instructions` (the persona, which doesn't trigger any action). PREFERRED way to brief a sub-agent: pass the task here instead of hand-quoting it into `command`. For Antigravity / kimi it is routed through their per-CLI flag automatically. Only applies to type=agent. */
      task?: string
      /** Default true. When no `task` is given, a Claude agent is auto-kicked to wait for its first task on the message bus (read_inbox, wait_s=50 — under the ~60s MCP tool-call ceiling), so a send_message sent right after spawn is received reliably (no PTY-nudge race against a still-booting REPL). It handles that first message, replies, and STOPS — it does not poll read_inbox in a loop. Deliver later work with another send_message (nudge:true to wake it) or ask_bee. Set false to spawn an idle, manually-driven agent. Only applies to type=agent. */
      wait_for_task?: boolean
    }
    /** Run a routine now (the sidebar Run now button). Injects into the live hive agent and returns runId immediately — does not wait for the agent to finish. The user sees it in that bee's tab. */
    mcp__hiveterm__run_routine: {
      name?: string
      id?: string
    }
    /** Send a STRUCTURED message to another agent — the clean way for agents to talk. Unlike write_input (raw text into the target's terminal), this lands in the target's inbox as clean JSON (read_inbox) and is answered with reply. Delivery: if the recipient is waiting on read_inbox it receives it right away; otherwise a one-line pointer is typed into its live session so it reads the inbox now (Claude, Codex, Grok, Antigravity). Pass nudge:false to leave it inbox-only (participants that loop on read_inbox). The result says which happened: delivery = 'inbox' | 'session' | 'queued' (queued = stored only; the recipient is not running or cannot be typed into — tell the user, it will NOT see it until it calls read_inbox). To get a round-trip in ONE call, pass wait_for_reply: true — it blocks and returns the reply here. If you do not wait, the reply reaches you the same way: as a pointer typed into your session (read it with read_inbox). Returns a messageId (and, with wait_for_reply, the reply + timedOut). */
    mcp__hiveterm__send_message: {
      /** The recipient agent id (same project). */
      to_agent_id: string
      /** The message body (plain text or markdown). */
      content: string
      /** Optional — group a multi-turn exchange. Defaults to a new conversation. Pass the SAME conversation_id across a debate's turns. */
      conversation_id?: string
      /** Default 'message'. Use 'summary' for your FINAL wrap-up as the orchestrator — a debate verdict, a final plan, a review summary. Post it with the discussion's conversation_id (to_agent_id can be your own id) so it caps the thread. */
      kind?: "message" | "summary"
      /** Optional label for a 'summary' — name it for the task ('Verdict', 'Final plan', 'Review summary', 'Decision'). Defaults to a generic 'Summary' if omitted. */
      title?: string
      /** Default false. Only set true to WAKE an idle, already-running Claude that is NOT looping on read_inbox — it injects a one-line pointer into that agent's terminal input (Claude only; it shows in its input line). Leave false for the normal pull flow (no terminal pollution). */
      nudge?: boolean
      /** Default false. When true, BLOCK and return the recipient's reply in this same call (the recipient must read_inbox + reply). Use this for a request/response round-trip instead of send_message + a separate await_reply. Returns reply + timedOut. */
      wait_for_reply?: boolean
      /** With wait_for_reply: max seconds to block (default 120, max 300). */
      timeout_s?: number
    }
    /** Set YOUR sidebar avatar from a local image file (png/jpeg/webp). Generate or pick an image, save it to disk, then call this with its absolute path — the user sees it on your row immediately. The image is downscaled to 256px and stored by HiveTerm (the source file can be deleted afterwards). Pass agent_id to set another bee's avatar (same project). */
    mcp__hiveterm__set_avatar: {
      /** Absolute path to the image file (png/jpeg/webp, ≤10MB). */
      path: string
      /** Target bee id (from list_bees, same project). Defaults to you, the calling bee. */
      agent_id?: string
    }
    /** Set YOUR system prompt / persona (the 'Instructions' box in your settings panel), or another bee's with agent_id — same project. This is THE way to give an agent instructions: it persists to the agent's configuration and shows in the UI. Pass the text in `instructions`, or a prompt file in `instructions_file` (relative to the project, or absolute) to make the agent read from that file. If the agent already reads its prompt from a file, new text is written into that file. Do NOT write CLAUDE.md, AGENTS.md or hive.yml for that. Loads on the agent's next start or restart; the current session keeps its prompt. */
    mcp__hiveterm__set_instructions: {
      /** The full instructions text (replaces the current one; 1-20000 characters, markdown welcome). Mutually exclusive with instructions_file. */
      instructions?: string
      /** Path of a prompt file the agent should load its instructions from (relative to the project, or absolute). Mutually exclusive with instructions. */
      instructions_file?: string
      /** Target bee id (from list_bees, same project). Defaults to you, the calling bee. */
      agent_id?: string
    }
    /** Rename YOUR sidebar label (or another bee's, with agent_id — same project). This is THE way to rename an agent: it persists the display name and updates the UI live. Do NOT edit hive.yml to rename a bee. */
    mcp__hiveterm__set_name: {
      /** The new display name (1-60 characters). */
      name: string
      /** Target bee id (from list_bees, same project). Defaults to you, the calling bee. */
      agent_id?: string
    }
    /** Change the project's worktree recipe. Only the fields you pass change; pass null to clear a command. copy_files are relative paths inside the project (never absolute, never ..). */
    mcp__hiveterm__set_worktree_recipe: {
      /** Files copied into a new worktree when absent, e.g. [".env", "config/local.json"]. Replaces the list. */
      copy_files?: string[]
      /** Preparation commands on macOS/Linux, one per line, e.g. "npm install\nnpm run db:migrate". Run in order; the first failure stops the rest. */
      prepare_unix?: string | null
      /** Preparation commands on Windows, one per line. */
      prepare_windows?: string | null
      /** Environment for the preparation and for agents in worktrees. Replaces the map. */
      env?: {}
      /** Hive to change. Defaults to the caller's. */
      project_id?: string
    }
    /** Start a stopped bee from its saved configuration — the sidebar's Start. An agent starts a CLEAN conversation; its saved session is kept but not continued. To continue it use resume_agent. Another hive's agent works too, addressed by its full id from list_agents. */
    mcp__hiveterm__start_agent: {
      /** The agent id to start (from list_bees). */
      agent_id: string
    }
    /** Stop a running bee — the sidebar's Stop. The bee stays listed as stopped, its session kept: start_agent gives it a clean conversation, resume_agent continues that one. To remove it for good use delete_bee. Another hive's agent works too, addressed by its full id from list_agents. */
    mcp__hiveterm__stop_agent: {
      /** The agent id to stop. */
      agent_id: string
    }
    /** Stop a running command bee (from run_command) — the sidebar's Stop under COMMANDS. It stays listed and can be started again with start_agent. Another hive's agent works too, addressed by its full id from list_agents. */
    mcp__hiveterm__stop_command: {
      /** The command's id (from list_agents, kind 'command'). */
      agent_id: string
    }
    /** Patch a routine in your hive by id or name: task, schedule, time, days, agent, enabled (pause/activate), tz, model, new_name. Recomputes the next run. Does not wait for a run. */
    mcp__hiveterm__update_routine: {
      /** Current sidebar name (lookup). To rename, pass new_name — or look up by id and pass name as the new title. */
      name?: string
      /** Routine id from list_routines. Preferred when two routines share a name. */
      id?: string
      /** Rename the routine. */
      new_name?: string
      /** New prompt. */
      task?: string
      /** Move the routine onto another hive agent. */
      agent?: string
      /** daily | weekdays | weekly | every_n_hours | once. */
      schedule?: string
      /** For schedule 'once': the local date, YYYY-MM-DD. */
      date?: string
      /** HH:MM. */
      time?: string
      days?: Array<number | string>
      n?: number
      minute?: number
      tz?: string
      /** false pauses, true activates (next slot, not immediately). */
      enabled?: boolean
      model?: string
    }
    /** What removing a worktree would touch: uncommitted changes, ignored files (.env, node_modules), agents bound to it and running in it, a lock or an operation in progress — the blockers remove_worktree would refuse on. Read it before removing. */
    mcp__hiveterm__worktree_removal_preview: {
      /** The worktree to inspect. */
      worktree_id: string
    }
    /** Send a prompt to a running bee's live session and submit it. Works for Claude, Grok, Codex, and Antigravity (each TUI gets the inject sequence it actually submits on). Newlines inside the text stay in the draft; the tool submits at the end — you do not need a trailing \n. Control-only payloads (a bare \r / Enter) are written raw without sweeping the input. Prefer this to talk to an existing hive agent from list_bees. To ASK another agent and wait for their reply in THIS conversation, use ask_bee instead. */
    mcp__hiveterm__write_input: {
      /** The agent id */
      agent_id: string
      /** Text to send to stdin */
      data: string
      /** Alias for data — text to send to stdin */
      input?: string
    }
    /** Perform click on a web page */
    mcp__playwright__browser_click: {
      /** Human-readable element description used to obtain permission to interact with the element */
      element?: string
      /** Exact target element reference from the page snapshot, or a unique element selector */
      target: string
      /** Whether to perform a double click instead of a single click */
      doubleClick?: boolean
      /** Button to click, defaults to left */
      button?: "left" | "right" | "middle"
      /** Modifier keys to press */
      modifiers?: Array<"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift">
    }
    /** Close the page */
    mcp__playwright__browser_close: {}
    /** Returns all console messages */
    mcp__playwright__browser_console_messages: {
      /** Level of the console messages to return. Each level includes the messages of more severe levels. Defaults to "info". */
      level: "error" | "warning" | "info" | "debug"
      /** Return all console messages since the beginning of the session, not just since the last navigation. Defaults to false. */
      all?: boolean
      /** File name to save the console messages to. Relative file names are resolved against the workspace root. If not provided, messages are returned as text. */
      filename?: string
    }
    /** Perform drag and drop between two elements */
    mcp__playwright__browser_drag: {
      /** Human-readable source element description used to obtain the permission to interact with the element */
      startElement?: string
      /** Exact target element reference from the page snapshot, or a unique element selector */
      startTarget: string
      /** Human-readable target element description used to obtain the permission to interact with the element */
      endElement?: string
      /** Exact target element reference from the page snapshot, or a unique element selector */
      endTarget: string
    }
    /** Drop files or MIME-typed data onto an element, as if dragged from outside the page. At least one of "paths" or "data" must be provided. */
    mcp__playwright__browser_drop: {
      /** Human-readable element description used to obtain permission to interact with the element */
      element?: string
      /** Exact target element reference from the page snapshot, or a unique element selector */
      target: string
      /** Absolute paths to files to drop onto the element. */
      paths?: string[]
      /** Data to drop, as a map of MIME type to string value (e.g. {"text/plain": "hello", "text/uri-list": "https://example.com"}). */
      data?: {}
    }
    /** Emulate CSS media features for the page, for example switch between the light and dark color scheme. Omitted parameters are left unchanged; null clears an override. */
    mcp__playwright__browser_emulate_media: {
      /** Emulates the prefers-color-scheme media feature */
      colorScheme?: "light" | "dark" | null
      /** Emulates the prefers-reduced-motion media feature */
      reducedMotion?: "reduce" | "no-preference" | null
      /** Emulates the forced-colors media feature */
      forcedColors?: "active" | "none" | null
      /** Emulates the prefers-contrast media feature */
      contrast?: "more" | "no-preference" | null
      /** Changes the CSS media type of the page */
      media?: "screen" | "print" | null
    }
    /** Evaluate JavaScript expression on page or element */
    mcp__playwright__browser_evaluate: {
      /** Human-readable element description used to obtain permission to interact with the element */
      element?: string
      /** Exact target element reference from the page snapshot, or a unique element selector */
      target?: string
      /** () => { /* code * / } or (element) => { /* code * / } when element is provided */
      function: string
      /** File name to save the result to. Relative file names are resolved against the workspace root. If not provided, result is returned as text. */
      filename?: string
    }
    /** Upload one or multiple files */
    mcp__playwright__browser_file_upload: {
      /** The absolute paths to the files to upload. Can be single file or multiple files. If omitted, file chooser is cancelled. */
      paths?: string[]
    }
    /** Fill multiple form fields */
    mcp__playwright__browser_fill_form: {
      /** Fields to fill in */
      fields: Array<{
        /** Human-readable element description used to obtain permission to interact with the element */
        element?: string
        /** Exact target element reference from the page snapshot, or a unique element selector */
        target: string
        /** Human-readable field name */
        name: string
        /** Type of the field */
        type: "textbox" | "checkbox" | "radio" | "combobox" | "slider"
        /** Value to fill in the field. If the field is a checkbox, the value should be `true` or `false`. If the field is a combobox, the value should be the text of the option. */
        value: string
      }>
    }
    /** Search the accessibility snapshot of the current page for text or a regular expression. Returns matching snapshot nodes with a few lines of surrounding context (like search snippets), each shown under its path from the root of the tree, which is cheaper than capturing the whole snapshot when you only need to locate an element and its ref. */
    mcp__playwright__browser_find: {
      /** Plain text to search for in the page snapshot (case-insensitive substring match). Provide either text or regex, not both. */
      text?: string
      /** Regular expression to search for in the page snapshot. Matching is case-sensitive by default; wrap the pattern in slashes to add flags, e.g. "/error/i" for case-insensitive. Provide either text or regex, not both. */
      regex?: string
      /** Save results to a file instead of returning them in the response. Relative file names are resolved against the workspace root. */
      filename?: string
    }
    /** Handle a dialog */
    mcp__playwright__browser_handle_dialog: {
      /** Whether to accept the dialog. */
      accept: boolean
      /** The text of the prompt in case of a prompt dialog. */
      promptText?: string
    }
    /** Hover over element on page */
    mcp__playwright__browser_hover: {
      /** Human-readable element description used to obtain permission to interact with the element */
      element?: string
      /** Exact target element reference from the page snapshot, or a unique element selector */
      target: string
    }
    /** Navigate to a URL */
    mcp__playwright__browser_navigate: {
      /** The URL to navigate to */
      url: string
    }
    /** Go back to the previous page in the history */
    mcp__playwright__browser_navigate_back: {}
    /** Returns full details (headers and body) of a single network request, or a single part if `part` is set. Use the number from browser_network_requests. */
    mcp__playwright__browser_network_request: {
      /** 1-based index of the request, as printed by browser_network_requests. */
      index: number
      /** Return only this part of the request. Omit to return full details. */
      part?: "request-headers" | "request-body" | "response-headers" | "response-body"
      /** File name to save the result to. Relative file names are resolved against the workspace root. If not provided, output is returned as text. */
      filename?: string
    }
    /** Returns a numbered list of network requests since loading the page. Use browser_network_request with the number to get full details. */
    mcp__playwright__browser_network_requests: {
      /** Whether to include successful static resources like images, fonts, scripts, etc. Defaults to false. */
      static: boolean
      /** Only return requests whose URL matches this regexp (e.g. "/api/.*user"). */
      filter?: string
      /** File name to save the network requests to. Relative file names are resolved against the workspace root. If not provided, requests are returned as text. */
      filename?: string
    }
    /** Press a key on the keyboard */
    mcp__playwright__browser_press_key: {
      /** Name of the key to press or a character to generate, such as `ArrowLeft` or `a` */
      key: string
    }
    /** Resize the browser window */
    mcp__playwright__browser_resize: {
      /** Width of the browser window */
      width: number
      /** Height of the browser window */
      height: number
    }
    /** Run a Playwright code snippet. Unsafe: executes arbitrary JavaScript in the Playwright server process and is RCE-equivalent. */
    mcp__playwright__browser_run_code_unsafe: {
      /** A JavaScript function containing Playwright code to execute. It will be invoked with a single argument, page, which you can use for any page interaction. For example: `async (page) => { await page.getByRole('button', { name: 'Submit' }).click(); return await page.title(); }` */
      code?: string
      /** Load code from the specified file. Relative file names are resolved against the workspace root. If both code and filename are provided, code will be ignored. */
      filename?: string
    }
    /** Select an option in a dropdown */
    mcp__playwright__browser_select_option: {
      /** Human-readable element description used to obtain permission to interact with the element */
      element?: string
      /** Exact target element reference from the page snapshot, or a unique element selector */
      target: string
      /** Array of values to select in the dropdown. This can be a single value or multiple values. */
      values: string[]
    }
    /** Capture accessibility snapshot of the current page, this is better than screenshot */
    mcp__playwright__browser_snapshot: {
      /** Exact target element reference from the page snapshot, or a unique element selector */
      target?: string
      /** Save snapshot to a file instead of returning it in the response. Relative file names are resolved against the workspace root. */
      filename?: string
      /** Limit the depth of the snapshot tree */
      depth?: number
      /** Include each element's bounding box as [box=x,y,width,height] in the snapshot. Coordinates are viewport-relative, in CSS pixels (Element.getBoundingClientRect) */
      boxes?: boolean
    }
    /** List, create, close, or select a browser tab. */
    mcp__playwright__browser_tabs: {
      /** Operation to perform */
      action: "list" | "new" | "close" | "select"
      /** Tab index, used for close/select. If omitted for close, current tab is closed. */
      index?: number
      /** URL to navigate to in the new tab, used for new. */
      url?: string
    }
    /** Take a screenshot of the current page. You can't perform actions based on the screenshot, use browser_snapshot for actions. */
    mcp__playwright__browser_take_screenshot: {
      /** Human-readable element description used to obtain permission to interact with the element */
      element?: string
      /** Exact target element reference from the page snapshot, or a unique element selector */
      target?: string
      /** Image format for the screenshot. If unset, inferred from the filename extension, otherwise png. */
      type?: "png" | "jpeg" | "webp"
      /** File name to save the screenshot to. Relative file names are resolved against the workspace root. If not specified, the screenshot is saved into the output directory as `page-{timestamp}.{png|jpeg|webp}`. */
      filename?: string
      /** When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Cannot be used with element screenshots. */
      fullPage?: boolean
      /** Image resolution scale. "css" produces a screenshot sized in CSS pixels (smaller, consistent across devices). "device" produces a high-resolution screenshot using device pixels (larger, accounts for the device pixel ratio). Default is css. */
      scale: "css" | "device"
    }
    /** Type text into editable element */
    mcp__playwright__browser_type: {
      /** Human-readable element description used to obtain permission to interact with the element */
      element?: string
      /** Exact target element reference from the page snapshot, or a unique element selector */
      target: string
      /** Text to type into the element */
      text: string
      /** Whether to submit entered text (press Enter after) */
      submit?: boolean
      /** Whether to type one character at a time. Useful for triggering key handlers in the page. By default entire text is filled in at once. */
      slowly?: boolean
    }
    /** Wait for text to appear or disappear or a specified time to pass */
    mcp__playwright__browser_wait_for: {
      /** The time to wait in seconds, at most 30 */
      time?: number
      /** The text to wait for */
      text?: string
      /** The text to wait for to disappear */
      textGone?: string
    }
  }
}
