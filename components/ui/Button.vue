<template>
    <button :class="`${props.disabled ? 'disabled pointer-events-none opacity-50' : ''} px-4 py-2 rounded-2xl bg-green-500 cursor-pointer hover:bg-green-600 focus:outline-2 text-white`">
        <span v-if="props.loading">
            Loading...
        </span>
        <slot v-else></slot>
    </button>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps(['loading', 'disabled'])
</script>