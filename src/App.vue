<script>
import BookingSlotComponent from './components/BookingSlotComponent.vue';
export default{
  components: {BookingSlotComponent},
  data: () => {
    return {
      bikeBookedArray: [false, false, false, false, false]
    };
  },
}
</script>
<template>
    <table class="board">
      <tr>
        <th v-for="bikeIndex in 5" :key="bikeIndex">Bike {{bikeIndex}} slots</th>
      </tr>
      <tr v-for="slotIndex in 5" :key="slotIndex">
        <td v-for="(bikeIndex, index) in 5" :key="bikeIndex">
          <BookingSlotComponent 
            :bikeId="bikeIndex"
            :slotId="slotIndex"
            v-model="bikeBookedArray[index]"
          />
        </td>
      </tr>
    </table>
</template>

<style scoped>
  .board tr{
    border: 1px solid grey;
  }
</style>