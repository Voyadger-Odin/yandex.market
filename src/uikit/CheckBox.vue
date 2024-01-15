<template>
  <input
      type="checkbox"
      class="checkbox"
      :id="id"
      ref="checkbox"
  />
  <div
      class="fake"
      :style="`width: ${size ? size : '20px'}; height: ${size ? size : '20px'};`"
      @click="click"
  >
    <div
        class="fake-active"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    checked: Boolean,
    id: String,
    size: String,
  },

  setup() {
    const checkbox = ref(null)
    return {
      checkbox,
    }
  },

  mounted() {
    this.checkbox.checked = this.checked ? this.checked : false
  },

  methods: {
    click(){
      this.checkbox.checked = !this.checkbox.checked
    },
  },
}
</script>

<style scoped>

.checkbox{
  display: none;
}

.fake{
  display: inline-block;
  background: #eee;
  box-shadow: inset 0 0 10px rgba(197, 197, 197, 0.5);
  position: relative;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
}

.fake-active{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #ffd500;
  position: absolute;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0;
  transition: .1s;
  transform: translateY(30%);
}

.checkbox:checked + .fake>.fake-active{
  opacity: 1;
  transform: translateY(0);
}

</style>