import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {HiveService} from '../../services/hive.service';
import {Hive} from '../../model/hive.model';
import {HiveCard} from '../../model/hive-card.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  @ViewChild('voelker') voelkerSlide: IonSlides;
  @ViewChild('stockkarten') stockkartenSlide: IonSlides;


  hiveData: Hive[];
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

    dashboardHiveCards:  HiveCard[];

    options: string[] = ['test','test'];



  constructor(public hiveService: HiveService,
              private router: Router) {
      this.hiveData = this.hiveService.findAllHives();
      this.dashboardHiveCards = this.hiveService.findAllHiveCards();
      this.hiveService.listenToChange().subscribe(change => {
          if(change) {
              this.transitionFromStockkarten();
              this.hiveService.emitChange(false);
          }
      })
  }

  ngOnInit() {
  }


  ionViewWillEnter() {
      this.hiveData = this.hiveService.findAllHives();
      this.dashboardHiveCards = this.hiveService.findAllHiveCards();

      this.transitionFromStockkarten();

      // this.stockkartenSlide.getActiveIndex()
      //     .then(ret => {
      //
      //         this.currentHive = this.hiveData[ret];
      //         // this.setVisibleSlideRange(ret, ret+1);
      //
      //         if (ret == 0 && this.showDashboard) {
      //             this.isNotDashboard = false;
      //         } else {
      //             this.isNotDashboard = true;
      //
      //         }
      //     });

      // this.showDashboard = true;
      if (this.dashboardHiveCards) {
          this.showDashboard = true;
      }
  }


    createHiveCard() {
        this.router.navigate(['hive-card-form', {id: this.currentHive.id}]);
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

          /*
          dieser Timeout ist notwendig um die Swipe animation beim Seitenwechsel nicht zu unterbrechen
           */
          window.setTimeout(function(){ slider.style.height = slide.offsetHeight.toString() + 'px'; }, 100);
      } else {
          let slide = document.getElementById('dashboard');
          let slider = document.getElementById('cardSlider')
          window.setTimeout(function(){ slider.style.height = slide.offsetHeight.toString() + 'px'; }, 100);
          console.log('on Dashboard');
      }

    }

}
