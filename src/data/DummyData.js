import Note from "../models/note";
import Label from "../models/label";
import Folder from "../models/folder";
export const LABELS = [
  new Label("l6", "Personal things"),
  new Label("l7", "Work"),
  new Label("l8", "Study"),
  new Label("l9", "Shopping"),
  new Label("l10", "Fitness"),
];

export const FOLDERS = [new Folder("f1", "Week 1"), new Folder("f2", "Week 2")];

export const COLORS = [
  null,
  "lightseagreen",
  "skyblue",
  "lightcoral",
  "lightpink",
  "lightgreen",
  "lightblue",
  "orange",
  "palegreen",
];

export const NOTES = [
  new Note(
    "n8",
    null,
    ["l6", "l10"],
    "Morning jog",
    new Date("2024-05-20T07:00:00"),
    false,
    "f1"
  ),
  new Note(
    "n9",
    COLORS[3],
    ["l7", "l8"],
    "Prepare presentation slides",
    new Date("2024-05-21T09:00:00"),
    true,
    null
  ),
  new Note(
    "n10",
    COLORS[4],
    ["l9"],
    "Buy groceries",
    new Date("2024-05-22T14:00:00"),
    false,
    "f2"
  ),
  new Note(
    "n11",
    COLORS[5],
    ["l10"],
    "Gym session",
    new Date("2024-05-31T18:00:00"),
    true,
    null
  ),
];

export const TRASH = [
  new Note(
    "n12",
    COLORS[6],
    ["l7"],
    "This is a trashed work note",
    new Date("2024-05-20T12:00:00"),
    false,
    "f1"
  ),
  new Note(
    "n13",
    COLORS[7],
    ["l8"],
    "This is another trashed study note",
    new Date("2024-05-20T12:30:00"),
    false,
    "f2"
  ),
  new Note(
    "n14",
    COLORS[0],
    ["l6"],
    "This is a trashed personal note",
    new Date("2024-05-31T13:00:00"),
    false,
    null
  ),
];
