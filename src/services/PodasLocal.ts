class PodasLocal {
  getAll(){
    return JSON.parse(localStorage.getItem("podas"));
  }

  get(id: any): Promise<any> {
    let podas = JSON.parse(localStorage.getItem("podas"));
    return podas;
  }

  create(data: any): Promise<any> {
    try {
      let podas = JSON.parse(localStorage.getItem("podas"));
      if (podas) podas.push(data);
      else podas = [data];
      localStorage.setItem("podas", JSON.stringify(podas));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  update(id: any, data: any): Promise<any> {
    let podas = JSON.parse(localStorage.getItem("podas"));
    podas.push(data);
    localStorage.setItem("podas", JSON.stringify(podas));
  }

  delete(id: any): Promise<any> {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/tutorials`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new PodasLocal();
