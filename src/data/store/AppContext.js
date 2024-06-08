import { useContext, useReducer } from "react";
import React from "react";
import { NOTES, TRASH, COLORS, LABELS, FOLDERS } from "../DummyData";

const NotesContext = React.createContext({
  notes: NOTES,
  trash: TRASH,
  colors: COLORS,
  labels: LABELS,
  folders: FOLDERS,

  addNote: ({ content, updateAt, folderId }) => {},
  updateNote: (
    id,
    { color, labels, content, updateAt, isBookmarked, folder }
  ) => {},
  deleteNote: (id) => {},
  restoreNote: (id) => {},
  trashNote: (id) => {},

  updateTrash: (
    id,
    { color, labels, content, updateAt, isBookmarked, folder }
  ) => {},
  addFolder: ({ name }) => {},
  updateFolder: (id, { name }) => {},

  addLabel: ({ label }) => {},
  updateLabel: (id, { label }) => {},
  deleteLabel: (id) => {},
  emptyTrash: () => {},
});

function notesReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: new Date().toISOString() + Math.random(),
            color: null,
            labelIds: [],
            content: action.payload.content,
            updatedAt: action.payload.updatedAt,
            isBookmarked: false,
            folderId: action.payload.folderId,
          },
        ],
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            return {
              ...note,
              color: action.payload.color,
              labelIds: action.payload.labelIds,
              content: action.payload.content,
              updatedAt: action.payload.updatedAt,
              isBookmarked: action.payload.isBookmarked,
              folderId: action.payload.folderId,
            };
          }
          return note;
        }),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
        trash: [
          ...state.trash,
          state.notes.find((note) => note.id === action.payload.id),
        ],
      };
    case "RESTORE_NOTE":
      return {
        ...state,
        trash: state.trash.filter((note) => note.id !== action.payload.id),
        notes: [
          ...state.notes,
          state.trash.find((note) => note.id === action.payload.id),
        ],
      };
    case "TRASH_NOTE":
      return {
        ...state,
        trash: state.trash.filter((note) => note.id !== action.payload.id),
      };
    case "ADD_FOLDER":
      return {
        ...state,
        folders: [
          ...state.folders,
          {
            id: new Date().toISOString() + Math.random(),
            name: action.payload.name,
          },
        ],
      };
    case "UPDATE_FOLDER":
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (folder.id === action.payload.id) {
            return {
              ...folder,
              name: action.payload.name,
            };
          }
          return folder;
        }),
      };
    case "ADD_LABEL":
      return {
        ...state,
        labels: [
          ...state.labels,
          {
            id: new Date().toISOString() + Math.random(),
            label: action.payload.label,
          },
        ],
      };
    case "UPDATE_LABEL":
      return {
        ...state,
        labels: state.labels.map((label) => {
          if (label.id === action.payload.id) {
            return {
              ...label,
              label: action.payload.label,
            };
          }
          return label;
        }),
      };
    case "DELETE_LABEL":
      return {
        ...state,
        labels: state.labels.filter((label) => label.id !== action.payload.id),
      };
    case "UPDATE_TRASH":
      return {
        ...state,
        trash: state.trash.map((note) => {
          if (note.id === action.payload.id) {
            return {
              ...note,
              color: action.payload.color,
              labelIds: action.payload.labelIds,
              content: action.payload.content,
              updatedAt: action.payload.updatedAt,
              isBookmarked: action.payload.isBookmarked,
              folder: action.payload.folder,
            };
          }
          return note;
        }),
      };
    case "EMPTY_TRASH":
      return {
        ...state,
        trash: [],
      };
    default:
      return state;
  }
}
function NotesProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: NOTES,
    trash: TRASH,
    colors: COLORS,
    labels: LABELS,
    folders: FOLDERS,
  });

  const addNoteHandler = ({ content, updatedAt, folderId }) => {
    dispatch({ type: "ADD_NOTE", payload: { content, updatedAt, folderId } });
  };

  const updateNoteHandler = (id, note) => {
    dispatch({ type: "UPDATE_NOTE", payload: { id, ...note } });
  };

  const deleteNoteHandler = (id) => {
    dispatch({ type: "DELETE_NOTE", payload: { id } });
  };

  const restoreNoteHandler = (id) => {
    dispatch({ type: "RESTORE_NOTE", payload: { id } });
  };

  const trashNoteHandler = (id) => {
    dispatch({ type: "TRASH_NOTE", payload: { id } });
  };

  const updateTrashHandler = (id, note) => {
    dispatch({ type: "UPDATE_TRASH", payload: { id, ...note } });
  };
  const addFolderHandler = (folder) => {
    dispatch({ type: "ADD_FOLDER", payload: folder });
  };

  const updateFolderHandler = (id, folder) => {
    dispatch({ type: "UPDATE_FOLDER", payload: { id, ...folder } });
  };

  const addLabelHandler = (label) => {
    dispatch({ type: "ADD_LABEL", payload: label });
  };

  const updateLabelHandler = (id, label) => {
    dispatch({ type: "UPDATE_LABEL", payload: { id, ...label } });
  };

  const deleteLabelHandler = (id) => {
    dispatch({ type: "DELETE_LABEL", payload: { id } });
  };
  const emptyTrashHandler = () => {
    dispatch({ type: "EMPTY_TRASH" });
  };

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        trash: state.trash,
        colors: state.colors,
        labels: state.labels,
        folders: state.folders,
        addNote: addNoteHandler,
        updateNote: updateNoteHandler,
        deleteNote: deleteNoteHandler,
        restoreNote: restoreNoteHandler,
        trashNote: trashNoteHandler,
        addFolder: addFolderHandler,
        updateFolder: updateFolderHandler,
        addLabel: addLabelHandler,
        updateLabel: updateLabelHandler,
        deleteLabel: deleteLabelHandler,
        updateTrash: updateTrashHandler,
        emptyTrash: emptyTrashHandler,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export { NotesProvider, NotesContext };
