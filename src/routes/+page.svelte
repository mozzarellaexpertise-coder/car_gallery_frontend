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

<script>
  import { onMount } from "svelte";
  import { getCars } from "../lib/api.js";

  let cars = [];
  let make = "";
  let model = "";
  let photoFile = null;

  onMount(async () => {
    cars = await getCars();
  });

  function handlePhoto(e) {
    photoFile = e.target.files[0]; // store raw file
  }

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
    cars.push(newCar);

    make = "";
    model = "";
    photoFile = null;
    document.querySelector("input[type=file]").value = null;
  }
</script>
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