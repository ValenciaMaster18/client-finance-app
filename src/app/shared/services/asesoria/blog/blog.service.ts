import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogs } from 'src/app/shared/model/blogs.model';
import { environmentJsonBlogDev } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  API_URL: string;
  constructor( private httpClient: HttpClient) { 
    this.API_URL = environmentJsonBlogDev.url;
  }

  getJsonBlog(): Observable<Blogs[]>{
    return this.httpClient.get<Blogs[]>(`${this.API_URL}`)
  }
}
