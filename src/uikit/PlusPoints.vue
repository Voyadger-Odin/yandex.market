<template>
  <div class="points flex gap-2 items-center h-fit px-1 rounded-[100px] text-white font-bold">
    <svg class="_2RbHG" fill="#FFFFFF" height="16" aria-label="Кешбек:" data-auto="cashback-icon" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 28c7.732 0 14-6.268 14-14 0-.362-.014-.72-.04-1.076l-.006.024h-7.768l-1.771 8.453h-4.347l1.811-8.453H8.111l.845-4.025h7.768L18.48.733A13.983 13.983 0 0 0 14 0C6.268 0 0 6.268 0 14s6.268 14 14 14Zm8.36-25.23a14.041 14.041 0 0 1 4.691 6.153h-5.98l1.29-6.153Z"></path></svg>
    <slot/>
  </div>
</template>

<style scoped>
.points{
  background: radial-gradient(100% 283.68% at 0 100%,#fcab14 0,#fa6641 15.91%,#be40c0 40.21%,rgba(80,90,221,0) 100%),radial-gradient(107.24% 195.45% at 100% 0,#48cce0 0,#428beb 28.85%,#505add 60.18%);
}
</style>