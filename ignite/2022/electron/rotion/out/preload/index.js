"use strict";
const electron = require("electron");
const IPC = {
  DOCUMENTS: {
    FETCH_ALL: "documents: fetch-all",
    FETCH: "documents: fetch",
    CREATE: "documents: create",
    SAVE: "documents: save",
    DELETE: "documents: delete"
  }
};
const api = {
  fetchDocuments() {
    return electron.ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL);
  },
  fetchDocument(req) {
    return electron.ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req);
  },
  createDocument() {
    return electron.ipcRenderer.invoke(IPC.DOCUMENTS.CREATE);
  },
  saveDocument(req) {
    return electron.ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req);
  },
  deleteDocument(req) {
    return electron.ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req);
  },
  onNewDocumentRequest(callback) {
    electron.ipcRenderer.on("new-document", callback);
    return () => {
      electron.ipcRenderer.off("new-document", callback);
    };
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.api = api;
}
