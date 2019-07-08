import { Component } from '@angular/core';
import Amplify, { API, Analytics } from 'aws-amplify';
import aws_exports from '../aws-exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos = [];
  loading = false;

  ngOnInit(){
    Amplify.configure(aws_exports);
    Analytics.record('app_loaded'); // here we are recording app load analytics

    this.loading = true;
    API.get('sampleCloudApi', '/items', {}).then(data => {
      this.loading = false;
      this.todos = data;
      Analytics.record('todos_loaded'); //here we sending back analytic event that todo list loaded
    });
  }

}
