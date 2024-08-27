<svelte:options accessors={true}/>
<script lang="ts">
import { resultState } from "./stores/resultState";

const SIZE = 1000;

let canvas: HTMLCanvasElement;

function draw(pixels: Uint8Array) {
    if (!canvas) {
        return;
    }
    const context = canvas.getContext('2d');
    const imageData = context?.createImageData(SIZE, SIZE);
    if (!imageData) {
        return;
    }
    const data = imageData?.data;
    pixels.forEach((v, i) => {
        data[i] = v;
    });
    context?.putImageData(imageData, 0, 0);
}

resultState.subscribe(state => {
    draw(state.result);
});
</script>

<div class="main-canvas">
    <canvas bind:this={canvas} width={SIZE} height={SIZE}></canvas>
</div>

<style>
    .main-canvas {
        text-align: center;
    }
</style>