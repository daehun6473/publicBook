<template>
    <div>
        <searchbar />
        <div class="main-container">
            <bookTable />
            <!-- <bookDetail /> -->
        </div>
    </div>
</template>

<script setup>
import searchbar from './content/searchbar.vue';
import bookTable from './content/bookTable.vue';
// import bookDetail from './content/bookDetail.vue';
</script>

<style>
.main-container{
    display: flex;
}
</style>