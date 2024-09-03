<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  top: -150px;
}

.loader {
  border: 6px solid rgba(255, 165, 0, 0.2);
  border-left-color: #FFA500;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>