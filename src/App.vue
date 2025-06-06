<template>
	<div id="app">
		<p>Has hecho click en {{ province }}</p>
		<SpainProvincesMap @mapClick="onMapClick" />
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import SpainProvincesMap from "./components/SpainProvincesMap/index.vue";

	const province = ref("[none]");

	const onMapClick = (e) => {
		province.value = e.title;
	};
</script>

<style></style>