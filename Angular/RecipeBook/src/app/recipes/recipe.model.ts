export class Recipe {
  public name: string;
  public descripton: string;
  public imagePath: string;

  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.descripton = desc;
    this.imagePath = imagePath;
  }
}
