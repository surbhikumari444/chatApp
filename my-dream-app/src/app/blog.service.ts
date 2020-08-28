import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public allBlogs =
   [
    {
    title: 'in side out side',
    description: 'gkgrdrfjgkjkjkhthm gnjsg',
    created: '2017-10-20T12:20:47.854z',
    author: 'Admin',
    blogId: '1',
    bodyHtml: '<h1>Surbhi</h1>',
    category : 'good'

    },
    {
      title: 'in side out side',
      description: 'gkgrdrfjgkjkjkhthm gnjsg',
      created: '2017-10-20T12:20:47.854z',
      author: 'Admin',
      blogId: '2',
      bodyHtml: '<h1>Surbhi</h1>',
      category : 'good'
      },
      {
        title: 'in side out side',
        description: 'gkgrdrfjgkjkjkhthm gnjsg',
        created: '2017-10-20T12:20:47.854z',
        author: 'Admin',
        blogId: '3',
        bodyHtml: '<h1>Surbhi</h1>',
        category : 'good'

        }
     ];
      public currentBlog;
     public getAllBlogs():any 
     {

      return  this.allBlogs;

     }
     public getSingleBlogInfo(currentBlogId):any{
      for (let blog of this.allBlogs){
        if(blog.blogId == currentBlogId){
          this.currentBlog = blog;
  
        }
      }
      return this.currentBlog
     // console.log(this.currentBlog);
    } 
    




  constructor() { 

    console.log("constructor blog service pro")
  }
}
