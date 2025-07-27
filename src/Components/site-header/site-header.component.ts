import { Component, OnInit } from '@angular/core';
import { IUser} from 'src/Services/user.model';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit{
  user : IUser | null = null;
  showSignOutMenu : boolean = false;

  constructor(private userService : UserService) { }
  
  ngOnInit() {
    this.userService.getUser().subscribe({
      next : (user) => this.user = user,
      error : () => this.user = null
    });
  }
  
  toggleSignOutMenu(){
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut(){
    this.userService.signOut();
    this.user = null;
    this.showSignOutMenu = false;
  }

}
