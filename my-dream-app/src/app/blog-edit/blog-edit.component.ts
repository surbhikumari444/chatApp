import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service'
  
import { ActivatedRoute, Router } from '@angular/router';
import { BlogHttpService } from './../blog-http.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  public currentBlog;
  public possibleCategories = ["Drama","Comedy","Action","Technology"]

  constructor(private notifyService : NotificationService, private blogHttpService: BlogHttpService, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    // console.log(myBlogId);
    this.currentBlog = this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(

      data => {
        console.log(data);
        this.currentBlog = data["data"];
      },

      error => {

        console.log("Error...!!");
        console.log(error.errorMessage);
      }


    );
  }


  public editThisBlog():any{

    this.blogHttpService.editBlog(this.currentBlog.blogId,this.currentBlog).subscribe(

      data=> {
        console.log(data);
        this.notifyService.showSuccess("Blog Edited successfully !!", "Edited..!!");


       

        setTimeout(()=> {
          this.router.navigate(['/blogs',this.currentBlog.blogId]);
        },1000)

      },

      error => {
        console.log("Error..!!");
        console.log(error.errorMessage);
        //this.notifyService.showError("Something went wrong while editing", "Error");
      }
    )
  }

}
