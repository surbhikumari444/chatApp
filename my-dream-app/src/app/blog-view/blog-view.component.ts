import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { from } from 'rxjs';
import { BlogService } from '../blog.service';
import { BlogHttpService} from '../blog-http.service'
import { NotificationService } from '../notification.service'





@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: variable-name

 

  public currentBlog;

  constructor(private notifyService : NotificationService, private  _route: ActivatedRoute , private router: Router, public blogservice : BlogService,  public blogHttpService: BlogHttpService) {
    console.log('nfv')
    console.log(" blog constructor")

   }
  ngOnDestroy(): void {
    console.log("blog Destroy");
  }

  ngOnInit(){

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


    public deleteThisBlog(): any {

      this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
  
        data => {
  
          console.log(data);
          this.notifyService.showSuccess("Post Deleted..!!", "Deleted..!!");
          setTimeout(()=>{
            this.router.navigate(['/home']);
          },1000);
  
        },
  
        error => {
          console.log("some error occured while deleting");
          console.log(error.errorMessage);
          //this.notifyService.showError("Something is wrong", "Error");
  
        }
      )
    }//end of delete blog
}
