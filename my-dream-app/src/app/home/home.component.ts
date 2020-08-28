import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ArgumentOutOfRangeError } from 'rxjs';
//import { BlogService } from '../blog.service';
import { BlogHttpService} from '../blog-http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  public allBlogs = [];

  constructor(public blogHttpService : BlogHttpService ) { 
    console.log("constructor")
  }
  ngOnDestroy(): void {
    console.log("Destroy")
  }

  ngOnInit(): void {
    console.log("init")
   // this.allBlogs = this.blogservice.getAllBlogs();
   console.log("Home component onInit called");
   this.allBlogs= this.blogHttpService.getAllBlogs().subscribe(

     data => {
       console.log('logged in');
       console.log(data);
       this.allBlogs=data["data"];
       console.log(this.allBlogs);
     },

     error => {
       console.log("Error..!!");
       console.log(error.errorMessage);
     }
   );

}
}