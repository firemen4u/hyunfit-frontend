<script setup></script>

<template>
  <svg id="completion" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 101">
    <g id="configurator">
      <g id="configurator_completion">
        <g id="stars">
          <circle id="Oval" class="st0" cx="14" cy="18" r="1" />
          <circle id="Oval-Copy-4" class="st0" cx="27" cy="20" r="1" />
          <circle id="Oval-Copy-10" class="st0" cx="76" cy="20" r="1" />
          <circle id="Oval-Copy-2" class="st0" cx="61.5" cy="12.5" r="1.5" />
          <circle id="Oval-Copy-9" class="st0" cx="94" cy="53" r="1" />
          <circle id="Oval-Copy-6" class="st0" cx="88" cy="14" r="1" />
          <circle id="Oval-Copy-7" class="st0" cx="59" cy="1" r="1" />
          <circle id="Oval_1_" class="st0" cx="43" cy="9" r="2" />
          <path
            id="ster-01"
            class="st0"
            d="M28.5 3.8L26 6l2.2-2.5L26 1l2.5 2.2L31 1l-2.2 2.5L31 6z"
          />
          <path
            id="ster-01"
            class="st0"
            d="M3.5 50.9l-2.1 2.4 1.7-2.7-2.9-1.2 3.1.8.2-3.2.2 3.2 3.1-.8-2.9 1.2 1.7 2.7z"
          />
          <path
            id="ster-01"
            class="st0"
            d="M93.5 27.8L91 30l2.2-2.5L91 25l2.5 2.2L96 25l-2.2 2.5L96 30z"
          />
          <circle id="Oval-Copy-5" class="st0" cx="91" cy="40" r="2" />
          <circle id="Oval-Copy-3" class="st0" cx="7" cy="36" r="2" />
          <circle id="Oval-Copy-8" class="st0" cx="7.5" cy="5.5" r=".5" />
        </g>
      </g>
    </g>
    <g id="cirkel">
      <g id="Mask">
        <path
          id="path-1_1_"
          class="st1"
          d="M49 21c22.1 0 40 17.9 40 40s-17.9 40-40 40S9 83.1 9 61s17.9-40 40-40z"
        />
      </g>
    </g>
    <path
      id="check"
      class="st2"
      d="M31.3 64.3c-1.2-1.5-3.4-1.9-4.9-.7-1.5 1.2-1.9 3.4-.7 4.9l7.8 10.4c1.3 1.7 3.8 1.9 5.3.4L71.1 47c1.4-1.4 1.4-3.6 0-5s-3.6-1.4-5 0L36.7 71.5l-5.4-7.2z"
    />
  </svg>
</template>

<style scoped>
.st0 {
  fill: #b40238;
  fill-opacity: 0.4;
}
.st1 {
  fill: #b40238;
  fill-opacity: 0.1;
}
.st2 {
  fill: #c0003e;
}
#completion {
  width: 200px;
  height: 200px;
  margin: 0;
  display: block;
}

@keyframes hideshow {
  0% {
    opacity: 0.2;
  }
  10% {
    opacity: 0.2;
  }
  15% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

#cirkel {
  animation: hideshow 0.4s ease;
}

#check {
  animation: hideshow 0.4s ease;
}

#stars {
  animation: hideshow 0.8s ease;
  opacity: 0.9;
}

@keyframes hideshow {
  0% {
    transform: scale(0.2);
    transform-origin: initial;
  }
  100% {
    transform: scale(1);
    transform-origin: initial;
  }
}

@keyframes draaien {
  0% {
    transform: rotate(40deg);
    transform-origin: initial;
  }
  100% {
    transform: scale(0deg);
    transform-origin: initial;
  }
}

#check {
  animation: draaien 0.8s ease;
}

@keyframes transparant {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#check {
  animation: transparant 2s;
}
</style>
