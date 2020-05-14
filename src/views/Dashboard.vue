<template>
    <div>
        <h1 class="text-bold ">Your IGSN</h1>
        <div class="rounded-md border-2 p-6 mb-6">
            <a href="" class="text-blue">CSTSTDOCO1</a>
            <router-link to="/editor/igsn-csiro-v3/CSTSTDOCO1" class="btn btn-blue text-xs">Edit</router-link>
        </div>
        
        <router-link to="/editor/igsn-csiro-v3" class="btn btn-blue">Create new IGSN CSIRO v3</router-link>
    </div>
</template>

<script>
export default {
    name: 'Dashboard'
}
</script>