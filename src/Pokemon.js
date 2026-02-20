class Pokemon {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.sprite = data.sprites.front_default;
      this.spriteShiny = data.sprites.front_shiny;
      this.type = data.types[0].type.name;
      this.height = data.height;
      this.weight = data.weight;
      this.moves = data.moves;
      this.stats = data.stats;
      this.abilities = data.abilities;
      this.types = data.types;
      this.cries = data.cries;
      this.species_url = data.species.url;
    }
  }
  
  export default Pokemon;