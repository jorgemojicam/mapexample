class PodasLocal {
  getAll() {
    const podas = localStorage.getItem("podas");
    if (podas) {
      return JSON.parse(podas);
    } else return [];
  }

  get() {
    let podas = localStorage.getItem("podas");
    if (podas) {
      return JSON.parse(podas);
    } else {
      return [];
    }
  }

  create(data: any) {
    try {
      let podas = localStorage.getItem("podas");
      if (podas) {
        const oldData = JSON.parse(podas);
        oldData.push(data);
        localStorage.setItem("podas", JSON.stringify(podas));
      } else {
        localStorage.setItem("podas", JSON.stringify([data]));
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  update(id: any, data: any) {
    let podas = localStorage.getItem("podas");
    if (podas) {
      console.log(id)
      const oldData = JSON.parse(podas);
      oldData.push(data);
    }
    localStorage.setItem("podas", JSON.stringify(podas));
  }
}

export default new PodasLocal();
