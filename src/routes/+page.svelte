<script>
  import { onMount } from "svelte";
  import { getCars } from "../lib/api.js";

  let cars = [];
  let make = "";
  let model = "";
  let photoFile = null;

  // Load cars on mount
  onMount(async () => {
    cars = await getCars();
  });

  // Handle file input
  function handlePhoto(e) {
    photoFile = e.target.files[0];
  }

  // Submit new car
  async function submit() {
    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    if (photoFile) formData.append("photo", photoFile);

    const res = await fetch("https://bumpahead.pythonanywhere.com/cars", {
      method: "POST",
      body: formData
    });
    const newCar = await res.json();

    cars = [...cars, newCar]; // add to array
    make = "";
    model = "";
    photoFile = null;
    document.querySelector("input[type=file]").value = null;
  }
</script>

<h1>🚗 Car Gallery</h1>

<form on:submit|preventDefault={submit}>
  <input placeholder="Make" bind:value={make} required />
  <input placeholder="Model" bind:value={model} required />
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
  .card {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 10px;
  }
  img {
    width: 100%;
    border-radius: 10px;
  }
</style>