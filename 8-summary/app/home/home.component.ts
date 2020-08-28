import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from "../blog-http.service";
import { BlogService } from "../blog.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers :[]
})
export class HomeComponent implements OnInit {

  allBlogs: any;
  errorMessage: any;
 

  constructor(private blogService:BlogService,private blogHttpService:BlogHttpService) {
   

   }

  ngOnInit() {
   // this.blogs = this._blogService.getBlogs();
     this.blogHttpService.getAllBlogs().subscribe(
      
              data => {
                console.log(data);
                this.allBlogs = data["data"];
                return this.allBlogs;
              },
              error =>{
                console.log("some error occured");
                console.log(error.errorMessage)
              }
      
      
            );

    
  }

}
