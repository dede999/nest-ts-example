export default class FactoryBot<EntityInterface> {
  constructor(protected createInstance: (...args: any[]) => EntityInterface) {}

  getOne(): EntityInterface {
    return this.createInstance()
  }

  getSome(quantity?: number): EntityInterface[] {
    const instances = quantity || 1
    const returned = []
    for (let index = 0; index < instances; index++) {
      returned[index] = this.getOne()
    }
    return returned;
  }
}
