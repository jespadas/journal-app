import React from "react";
import { NotesScreen } from "../notes/NotesScreen";
/* import { NothingSelected } from "./NothingSelected"; */
import { Sidebar } from "./Sidebar";

export const JournalScreen = () => {
  return (
    <div className="journal__main-content">
      <Sidebar />
      <main>
        {/* <NothingSelected /> */ }
        <NotesScreen />
      </main>
    </div>
  );
};
