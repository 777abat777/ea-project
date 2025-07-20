<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/incomes">incomes</RouterLink>
        <RouterLink to="/orders">orders</RouterLink>
        <RouterLink to="/sales">sales</RouterLink>
        <RouterLink to="/stocks">stocks</RouterLink>
      </nav>
      <div class="main">
            <RouterView />
      </div>
</template>

<style scoped>

.nav{
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background: var(--vt-c-black);
    display: flex;
    column-gap: 20px;
}
.nav a{
    color: var(--vt-c-white);
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: 0.3s;
}
.nav a:hover{
    text-shadow: 0px 0px 5px aquamarine;
    transform: scale(1.1);

}
.main{
    padding-top: 20px;
     max-width: 1300px;
    width: 100%;
    margin: 0 auto;
}
</style>
