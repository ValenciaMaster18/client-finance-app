import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blogs } from 'src/app/shared/model/blogs.model';
import { BlogService } from 'src/app/shared/services/asesoria/blog/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {
  categoria: string = '';
  jsonBlogs!: Blogs[];
  subscription: Subscription;
  constructor( private _blogService: BlogService ){
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this._blogService.getJsonBlog().subscribe(
      {
        next: (value: Blogs[]) => {
          this.jsonBlogs = value
        },
        error: (err: any) => {

        },
        complete: () => {

        }
      }
    )
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
