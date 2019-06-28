import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, PopoverController} from '@ionic/angular';
import {HiveService} from '../../services/hive.service';
import {Hive} from '../../model/hive.model';
import {Hivecard} from '../../model/hive-card.model';
import {Router} from '@angular/router';
import {MoreButtonPage} from '../more-button/more-button.page';
import * as $ from 'jquery';
import {FireDbService} from '../../services/fire-db.service';
import {plainToClass} from 'class-transformer';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  @ViewChild('voelker') voelkerSlide: IonSlides;
  @ViewChild('stockkarten') stockkartenSlide: IonSlides;


  hiveData: Hive[] = [];
  currentHive: Hive = new Hive();

  isNotDashboard: boolean = false;
  showDashboard: boolean = false;

  optionsTabSlide = {
      autoHeight: true,
      slidesPerView: '3',
      centeredSlides: true,
      speed: 400,
      spaceBetween: 1,
  };

    optionsCardsSlide = {
        autoHeight: true,
    };

    dashboardHivecards:  Hivecard[];

    options: string[] = ['test','test'];



  constructor(private fireDb: FireDbService,
              private router: Router,
              public popoverController: PopoverController,) {

      this.fireDb.getHivesOfCurrentUser().subscribe(data => {
          let tempHives: Hive[] = [];
          data.forEach((hive) =>{
              tempHives.push(plainToClass(Hive, hive));
          });

          this.hiveData = tempHives;
          this.dashboardHivecards = this.fireDb.findAllHiveCards();
          if (this.dashboardHivecards.length > 0) {
              this.showDashboard = true;
          }
          this.transitionFromStockkarten();
      });


      //this.hiveData = this.hiveService.findAllHives();
      //this.dashboardHiveCards = this.hiveService.findAllHiveCards();

      // this.fireDb.listenToChange().subscribe(change => {
      //     if(change) {
      //         this.hiveData = this.fireDb.hives;
      //         this.dashboardHivecards = this.fireDb.findAllHiveCards();
      //         this.transitionFromStockkarten();
      //         this.fireDb.emitChange(false);
      //         if (this.dashboardHivecards) {
      //             this.showDashboard = true;
      //         }
      //     }
      // })
  }

  ngOnInit() {
      // this.fireDb.observeHives().subscribe( hives => {
      //     this.hiveData = hives;
      //     this.dashboardHivecards = this.fireDb.findAllHiveCards();
      //     this.transitionFromStockkarten();
      //     if (this.dashboardHivecards.length > 0) {
      //         this.showDashboard = true;
      //     }
      // })
  }


  ionViewWillEnter() {
      this.hiveData = this.fireDb.hives;
      this.dashboardHivecards = this.fireDb.findAllHiveCards();
      // this.transitionFromStockkarten();

      if (this.dashboardHivecards.length > 0) {
          this.showDashboard = true;
      }
      // this.setVisibleSlideRange(1);
  }


    createHiveCard() {
        this.router.navigate(['hive-card-form', {hiveId: this.currentHive.id}]);
    }

  transitionFromStockkarten() {
    this.stockkartenSlide.getActiveIndex()
        .then(ret => {
          this.voelkerSlide.slideTo(ret);
          this.setVisibleSlideRange(ret);

          if (ret == 0 && this.showDashboard) {
              this.isNotDashboard = false;
          } else {
              this.isNotDashboard = true;

          }

          if(this.showDashboard  && ret > 0) {
              this.currentHive = this.hiveData[ret-1];
              // console.log('current Hive: ' + this.currentHive.id);
          } else {
              this.currentHive = this.hiveData[ret];
              // console.log('current Hive: ' + this.currentHive.id);
          }
        })
  }


  transitionFromVoelker() {
    this.voelkerSlide.getActiveIndex()
        .then(ret => {

          this.stockkartenSlide.slideTo(ret);
            this.setVisibleSlideRange(ret);

            if (ret == 0 && this.showDashboard) {
                this.isNotDashboard = false;
            } else {
                this.isNotDashboard = true;
            }

            if(this.showDashboard && ret > 0) {
                this.currentHive = this.hiveData[ret-1];
                //console.log('current Hive: ' + this.currentHive.id);
            } else {
                this.currentHive = this.hiveData[ret];
                // console.log('current Hive: ' + this.currentHive.id);
            }
        })

  }


    setVisibleSlideRange(i: number) {
      let numSlides = this.hiveData.length;
        for (let index = 0; index < numSlides+1; index++)
            if (index == i) {
                this.slideVisibility(index);
            }

    }

    slideVisibility(index: number) {
      if(this.showDashboard) index--;
      if(index >= 0) {
          let testID = this.hiveData[index].id.toString();
          let slide = document.getElementById(testID);
          let slider = document.getElementById('cardSlider')
          console.log('height: ' + slide.offsetHeight.toString());

          if(slide.offsetHeight < window.innerHeight) {
              let ionContent = document.getElementById("ionContent");
              window.setTimeout(function(){slider.style.height = ionContent.offsetHeight.toString() + 'px';}, 100);
          } else {
              window.setTimeout(function(){ slider.style.height = slide.offsetHeight.toString() + 'px'; }, 100);
          }
      } else {
          let slide = document.getElementById('dashboard');
          let slider = document.getElementById('cardSlider')
          if(slide.offsetHeight < window.innerHeight) {
              let ionContent = document.getElementById("ionContent");
              window.setTimeout(function(){slider.style.height = ionContent.offsetHeight.toString() + 'px';}, 100);
          } else {
              window.setTimeout(function(){ slider.style.height = slide.offsetHeight.toString() + 'px'; }, 100);
          }

          console.log('on Dashboard');
      }
    }


    async moreButton(ev: Event) {
      let popover = await this.popoverController.create({
          event: ev,
          component: MoreButtonPage,
        });
        await popover.present();
    }


}
