<script>
  import { onMount } from "svelte";
  import { getCars, addCar } from "../lib/api.js";

  let cars = [];
  let make = "";
  let model = "";
  let photo = null;

  onMount(async () => {
    cars = await getCars();
  });

  function handlePhoto(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      photo = reader.result;
    };
    reader.readAsDataURL(file);
  }

  async function submit() {
    const newCar = await addCar({ make, model, photo });
    cars.push(newCar);
    make = "";
    model = "";
    photo = null;
  }
</script>

<h1>🚗 Car Gallery</h1>

<form on:submit|preventDefault={submit}>
  <input placeholder="Make" bind:value={make} />
  <input placeholder="Model" bind:value={model} />

  <input type="file" accept="image/*" on:change={handlePhoto} />

  <button>Add Car</button>
</form>

<div class="gallery">
  {#each cars as car}
    <div class="card">
      <h2>{car.make} {car.model}</h2>

      {#if car.photo}
        <img src={car.photo} alt="car" />
      {:else}
        <p>No photo</p>
      {/if}
    </div>
  {/each}
</div>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  img {
    width: 100%;
    border-radius: 10px;
  }
</style>