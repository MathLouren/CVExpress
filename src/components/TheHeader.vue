<template>
    <header>
        <nav>
            <router-link to="/" class="logo"><img src="../assets/logo.png" alt="logo"><span>CVExpress</span></router-link> 
        </nav>
    </header>
</template>

<script>
    export default {
        name: "TheHeader"
    }
</script>

<style scoped>

header{
    padding: 5px 20px;
    box-shadow: 0 2px 4px rgba(30, 60, 90, 0.4);
}

nav{
    width: 100%;
    max-width: 1400px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    
}

.logo{
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

img{
    width: 60px;
}

</style>