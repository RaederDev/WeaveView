import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public createConnectionVisible = signal<boolean>(false);

  public async connect() {
    try {
      const res: number = await go.main.App.ConnectToWeaviate('localhost', 'http', 8081);
      console.log('Connected to Weaviate');
      console.log(res);
    } catch (error) {
      console.error('Error while connecting to Weaviate');
      console.error(error);
    }
  }
}
