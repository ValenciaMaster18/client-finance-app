import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blogs } from '../../../../shared/model/blogs.model';
import { BlogService } from 'src/app/shared/services/asesoria/blog/blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
    blogs :Blogs[] = [];
    responsiveOptionsGrafico!: any[];
    subscription: Subscription;
    constructor(
      private _blogsService: BlogService
    ) {
      this.subscription = new Subscription()
      this.responsiveOptionsGrafico = [
        {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
        },
        {
          breakpoint: '991px',
          numVisible: 1,
          numScroll: 1
        },
        {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
        }
      ];
    }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit(): void {
    this.subscription = this._blogsService.getJsonBlog().subscribe(
      {
        next: (value: Blogs[]) => {
          this.blogs = value;
        }
      }
    )
  }
}
