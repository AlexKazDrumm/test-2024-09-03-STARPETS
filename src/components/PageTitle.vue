<template>
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>