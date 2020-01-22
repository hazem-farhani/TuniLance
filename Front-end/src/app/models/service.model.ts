export class Service {
  constructor(
    public id: number,
    public title: String,
    public description: String,
    public price: number,
    public rating: number,
	public comments : any = null
  ){}
}
