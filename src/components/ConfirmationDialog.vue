<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="handleConfirm">Confirm</button>
      <button @click="handleCancel">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationDialog',
  props: ['isOpen', 'message', 'confirmAction', 'cancelAction'],
  methods: {
    handleConfirm() {
      this.confirmAction();
    },
    handleCancel() {
      this.cancelAction();
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>