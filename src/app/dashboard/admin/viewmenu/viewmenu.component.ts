import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-viewmenu',
  templateUrl: './viewmenu.component.html',
  styleUrls: ['./viewmenu.component.scss']
})
export class ViewmenuComponent {

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    })
    this.getRestaurant();
  }
  id: any;
  restaurants: any[] = [];
  menus: Menu[] = [];

  getRestaurant() {
    this.adminService.getAll().subscribe({
      next: (value) => {
        this.restaurants = value
        this.restaurants = this.restaurants.filter(restaurant => {
          return this.id.toString() === restaurant.id;
        })
        this.menus = this.restaurants[0].menuList;
      }, error: e => {
        alert("Dish Already Exist")
      }
    });

  }


}
export interface Menu {
  itemName: string,
  itemPrice: number,
  description:string,
}