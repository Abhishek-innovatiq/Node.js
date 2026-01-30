import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'  

})
export class App implements OnInit {

  users: User[] = [];
  user: User = { name: '', email: '' };

  isEdit = false;
  editId: string | null = null;

  private baseUrl = 'http://localhost:5000/user';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.get<any>(`${this.baseUrl}/getUser`)
      .subscribe(res => {
        this.users = res.data;
      });
  }


  submitUser() {
    if (this.isEdit && this.editId) {
      this.http.put(`${this.baseUrl}/updateUser/${this.editId}`, this.user)
        .subscribe(() => {
          this.resetForm();
          this.getUsers();
        });
    } else {
      this.http.post(`${this.baseUrl}/addUser`, this.user)
        .subscribe(() => {
          this.resetForm();
          this.getUsers();
        });
    }
  }


  editUser(user: User) {
    this.isEdit = true;
    this.editId = user._id!;
    this.user = {
      name: user.name,
      email: user.email
    };
  }
  deleteUser(id: string) {
    this.http.delete(`${this.baseUrl}/deleteUser/${id}`)
      .subscribe(() => {
        this.getUsers();
      });
  }

  resetForm() {
    this.user = { name: '', email: '' };
    this.isEdit = false;
    this.editId = null;
  }
}
