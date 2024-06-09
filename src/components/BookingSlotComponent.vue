<script>
export default {
    props:['bikeId', 'slotId', 'modelValue'],
    emits:['update:modelValue'],
    data(){
        return{
            color: 'white'
        }
    },
    computed:{
        changeStyle(){
            if(this.modelValue && this.color == 'white'){
                this.color = 'grey'
            }
            return `background-color: ${this.color}`
        }

    },
    methods:{
        handleClick(){
            if(this.color == 'white'){
                this.color = 'yellow'
                fetch(`http://localhost:3001/book?bikeId=${this.bikeId}&slotId=${this.slotId}`,{
                    method: 'GET',
                }).then((res)=> res.text()).then((res1) =>{
                    if(res1 == 'booked'){
                        this.color = 'green'
                        this.$emit('update:modelValue', true)
                    }else if(res1 == 'rejected'){
                        this.color = 'red'
                    }
                })
            }
        }
    } 
    
}
</script>

<template>
    <span @click="handleClick" :style="changeStyle"> Bike:{{ bikeId }} Slot:{{ slotId }}</span>
</template>


<style></style>