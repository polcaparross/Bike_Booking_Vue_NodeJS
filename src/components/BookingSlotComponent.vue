<script>
export default {
    props: ['bikeId', 'slotId', 'modelValue'],
    emits: ['update:modelValue'],
    data() {
        return {
            bgColor: '',
        }
    },
    watch: {

    },
    computed: {
        bgColorX() {
            if (this.bgColor == '' && this.modelValue) {
                this.bgColor = 'gray';
                return `background-color: ${this.bgColor}`;
            } else {
                return `background-color: ${this.bgColor}`;
            }

        },
        updateBgColor() {
            this.$emit('update:modelValue', false)
            if (this.bgColor == '') {
                this.bgColor = 'yellow';
                fetch(`http://localhost:3001/book?bikeId=${this.bikeId}&slotId=${this.slotId}`, {
                    method: 'GET',
                }).then(response => response.text())
                    .then(data => {
                        if (data == 'booked' && this.bgColor == 'yellow') {
                            this.bgColor = 'green';
                            this.$emit('update:modelValue', true)
                        }
                        if (data == 'rejected' && this.bgColor == 'yellow') {
                            this.bgColor = 'red';
                        }

                    }
                    );

            }
        },

    }
}
</script>

<template>
    <span :style="bgColorX" @click="updateBgColor">Bike:{{ this.bikeId }} Slot:{{ this.slotId }}</span>
</template>

<style></style>