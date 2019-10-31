import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from "../services/posts.service";
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  displayedColumns = ['sno', 'title', 'description', 'message', 'actions'];
  dataSource: MatTableDataSource<postsListResp>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  postsData: any;
  addPostForm: FormGroup;
  updatePostForm: FormGroup;
  id: any;

  constructor(private postsService: PostsService, private formBuilder: FormBuilder, private cookieService: CookieService, private router: Router) {
    this.addPostForm = this.formBuilder.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'message': ['', [Validators.required]]
    });

    this.updatePostForm = this.formBuilder.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'message': ['', [Validators.required]]
    });

    this.getAllPosts();
  }

  // Get All Posts //
  getAllPosts() {
    this.postsService.getAllPosts().subscribe(resp => {
      this.postsData = resp;
      this.dataSource = new MatTableDataSource(this.postsData);
      this.dataSource.paginator = this.paginator;
    })
  }

  openPostModal() {
    $('#addCategoryModal').modal('show');
    Object.keys(this.addPostForm.controls).forEach(key => {
      this.addPostForm.get(key).setValue('');
      this.addPostForm.get(key).markAsPristine();
      this.addPostForm.get(key).markAsUntouched();
      this.addPostForm.get(key).updateValueAndValidity();
    });
  }

  // Create Post //
  addPost() {
    $('#addCategoryModal').modal('hide');
    let formData = this.addPostForm.value;
    this.postsService.createPost(formData).subscribe(resp => {
      alert('Post Created Successfully....');
      this.getAllPosts();
    })
  }

  
  viewPostDetails(row) {
    $('#viewPostModal').modal('show');
    this.id = row._id;
    this.updatePostForm.setValue({
      title: row.title,
      description: row.description,
      message: row.message,
    })
  }

  // Update Post //
  updatePost() {
    $('#viewPostModal').modal('hide');
    let updatedData = this.updatePostForm.value;
    this.postsService.updatePost(updatedData, this.id).subscribe(resp => {
      alert('Post Updated Successfully....');
        this.getAllPosts();
    });
  }

  // Delete Post //
  confirmDelete(row) {
    let id = row._id;
    if (confirm("Do you want to delete the post??")) {
      this.postsService.deletePost(id).subscribe(resp => {
        this.getAllPosts();
        console.log(resp);
      })
    } else {
      this.getAllPosts();
    }
  }


  ngOnInit() {
  }

  logoutUser() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

}

export interface postsListResp {
  title, description, message
}
