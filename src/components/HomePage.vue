
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Notes</h1>
    <div class="mb-4">
      <button @click="createNote" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create New Note
      </button>
    </div>
    <div v-if="notes.length === 0" class="text-gray-500">No notes available. Click 'Create New Note' to add one.</div>
    <div v-else>
      <div v-for="note in notes" :key="note.id" class="mb-4">
        <h2> <router-link :to="{ name: 'EditNote', params: { id: note.id }}">{{ note.title }}</router-link> </h2>
        <ul>
          <li v-for="(todo, index) in note.todos" :key="index" class="flex items-center">
            <input disabled type="checkbox" v-model="todo.completed">
            <span :class="{ 'line-through': todo.completed }">{{ todo.text }}</span>
          </li>
        </ul>
        <div class="mt-2">
          <button @click="editNote(note.id)" class="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
            Edit
          </button>
          <button @click="confirmDelete(note.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';


export default {
  data() {
    return {
      notes: []
    };
  },
  mounted() {
    this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/notes`);
        this.notes = response.data;
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    },
    async createNote() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/notes`, {
          title: 'New Note',
          todos: []
        });
        this.notes.push(response.data);
      } catch (error) {
        console.error('Error creating note:', error);
      }
    },
    editNote(noteId) {
      this.$router.push({ name: 'EditNote', params: { id: noteId } });
    },
    async confirmDelete(noteId) {
      if (confirm("Are you sure you want to delete this note?")) {
        try {
          await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/notes/${noteId}`);
          this.notes = this.notes.filter(note => note.id !== noteId);
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      }
    }
  }
};

</script>
