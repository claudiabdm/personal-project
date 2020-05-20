import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { Button } from '../shared/models/button';
import { filter, takeUntil, first } from 'rxjs/operators';
import { SocketioService } from '../services/socketio.service';
import { DataService } from '../services/data.service';
import { Message } from '../shared/models/message';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public navbarVisible: boolean = false;
  public headerVisible: boolean = false;
  public gridActive: boolean = false;
  public gridAll: boolean = false;
  public button: Button;
  public switchVisible: boolean = false;
  private currentRoute: string;
  private ngUnsubscribe$ = new Subject<void>();


  constructor(
    public router: Router,
    private socketService: SocketioService,
    private dataService: DataService) {
  }

  ngOnInit(): void {
    this.setSocketIo();
    this.setLayout();
  }

  setSocketIo() {
    this.socketService.setupSocketConnection();
    this.socketService.getAllMessages().pipe(first()).subscribe((messages: Message[]) => {
      messages.forEach(msg => {
        if (msg.createdAt > this.dataService.getUser().lastConnection) {
          this.socketService.notificationsCounter += 1;
        }
      })
    })
    this.socketService.getMessage().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((msg: Message) => {
      if (msg.userId !== this.dataService.getUser()._id) {
        this.socketService.notificationsCounter += 1;
      }
    });
  }

  setLayout() {
    this.currentRoute = this.router.url;
    this.toggleHeaderNavbar(this.currentRoute);
    this.changeButton(this.currentRoute);
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        this.currentRoute = res.url;
        this.changeButton(this.currentRoute);
        this.toggleHeaderNavbar(this.currentRoute);
      })
  }

  toggleHeaderNavbar(currentRoute) {
    if (currentRoute === '/pages/home' || currentRoute === '/pages/notifications') {
      this.headerVisible = false;
      this.navbarVisible = true;
      this.gridActive = true;
      this.gridAll = false;
    } else {
      this.headerVisible = true;
      this.navbarVisible = true;
      this.gridActive = true;
      this.gridAll = true;
    }
  }

  changeButton(currentRoute): void {

    switch (currentRoute) {
      case '/pages/calendar':
        this.button = {
          id: 'newEventBtn',
          name: 'New event',
          modal: 'newEventModal'
        }
        this.switchVisible = false;
        break;
      case '/pages/locator':
        this.button = {
          id: 'newPlaceBtn',
          name: 'New place',
          modal: 'newPlaceModal'
        };
        this.switchVisible = false;
        break;
      case '/pages/list':
        this.switchVisible = true;
        break;
    }

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next()
    this.ngUnsubscribe$.complete();
  }

}
