<template>
  <div>

    <h1 class="text-2xl font-bold mb-4">Edit Note</h1>
    <div>
      <input type="text" v-model="note.title" class="mb-2 border border-gray-300 rounded px-2 py-1">
    </div>
    <button @click="saveChanges" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">
      Save Changes
    </button>
    <button @click="confirmUndoEditing" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">
      Undo Editing
    </button>
    <button @click="confirmRedoEditing" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">
      Redo Editing
    </button>
    <button @click="confirmDelete" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
      Delete Note
    </button>
    <div>
      <h2>Todo List</h2>
      <div v-for="(item, index) in note.todos" :key="index">
        <input type="checkbox" v-model="item.completed">
        <input type="text" v-model="item.text">
        <button @click="deleteTodo(index)">Delete</button>
      </div>
      <button @click="addTodo">Add Todo</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      note: {},
      originalNote: {}, // To store the original note data for undoing changes
      undoStack: [], // Stack to store previous states for undoing changes
      redoStack: [] // Stack to store undone states for redoing changes
    };
  },
  mounted() {
    this.fetchNote();
  },
  methods: {
    async fetchNote() {
      try {
        const noteId = this.$route.params.id;
        const response = await axios.get(`http://laravel.ddev.site/api/notes/${noteId}`);
        this.note = response.data;
        // Save a copy of the original note data
        this.originalNote = { ...this.note };
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    },
    async saveChanges() {
      try {
        const response = await axios.put(`http://laravel.ddev.site/api/notes/${this.note.id}`, this.note);
        console.log('Changes saved:', response.data);
        // Update the original note data after saving changes
        this.originalNote = { ...this.note };
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    },
    confirmUndoEditing() {
      if (confirm('Are you sure you want to undo editing? This will revert the changes to the original state.')) {
        this.undoEditing();
      }
    },
    undoEditing() {
      // Restore the original note data
      this.note = { ...this.originalNote };
    },
    confirmRedoEditing() {
      if (confirm('Are you sure you want to redo undone changes?')) {
        this.redoEditing();
      }
    },
    redoEditing() {
      // Push current note state to undo stack before redoing changes
      this.undoStack.push({ ...this.note });
      // Pop undone state from redo stack and restore the note data
      this.note = this.redoStack.pop();
    },
    confirmDelete() {
      if (confirm('Are you sure you want to delete this note?')) {
        this.$router.push({ name: 'Home' });
        this.deleteNote();
      }
    },
    async deleteNote() {
      try {
        const response = await axios.delete(`http://laravel.ddev.site/api/notes/${this.note.id}`);
        console.log('Note deleted:', response.data);
        // Redirect to the home page or another appropriate page after deletion
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    },
    addTodo() {
      this.note.todos.push({ text: '', completed: false });
    },
    deleteTodo(index) {
      this.note.todos.splice(index, 1);
      this.saveChanges();
    }
  }
};
</script>