import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogHttpService } from './../blog-http.service';
import { NotificationService } from '../notification.service'


@Component({
  selector: 'app-blog-c',
  templateUrl: './blog-c.component.html',
  styleUrls: ['./blog-c.component.css']
})
export class BlogCComponent implements OnInit {


  constructor( private notifyService : NotificationService, private _route: ActivatedRoute,private router: Router, private blogHttpService: BlogHttpService) { }

  public blogTitle: string;
  public blogBodyHtml: string;
  public blogDescription: string;
  public blogCategory: string;
  public possibleCategories = ["Comedy", "Drama", "Action", "Technology"];


  ngOnInit(): void {
  }


  createBlog(): any {

    let blogData = {

      title : this.blogTitle,
      description : this.blogDescription,
      blogBody : this.blogBodyHtml,
      category : this.blogCategory

    }// end blog data
    console.log(blogData);

    this.blogHttpService.createBlog(blogData).subscribe(

      data => {
        console.log("Blog Created")
        console.log(data);
        this.notifyService.showSuccess("Blog Created successfully !!", "Created..!!");
 
        //this.toastr.success('Blog Posted successfully', 'Success!');
        setTimeout(()=>{  
          this.router.navigate(['/blogs',data.data.blogId]);
        }, 1000)
        
        

      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
        // this.toastr.error('Some error occured', 'Error');
      }


    )


  }// end create blog function


}
