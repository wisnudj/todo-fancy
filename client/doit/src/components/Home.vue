<template lang="html">
  <div class="">
    <Header></Header>
    <div class="container">
      <div class="row">
        <belum></belum>
        <selesai></selesai>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import selesai from '@/components/selesai'
import belum from '@/components/belum'
export default {
  name: 'Home',
  components: {
    Header,
    selesai,
    belum
  }
}
</script>

<style lang="css">
</style>
