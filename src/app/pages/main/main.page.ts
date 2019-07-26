import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSlides, NavController, PopoverController, ToastController} from '@ionic/angular';
import {Hive} from '../../model/hive.model';
import {Hivecard} from '../../model/hive-card.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MoreButtonPage} from '../more-button/more-button.page';
import {FireDbService} from '../../services/fire-db.service';
import {LocalDbService} from '../../services/local-db.service';
import {Settings} from '../../model/settings.model';


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
        // speed: 400,
        spaceBetween: 1,
    };

    optionsCardsSlide = {
        autoHeight: true,
        slidesPerView: 1,
        centeredSlides: true,
    };

    dashboardHivecards: Hivecard[];
    slideView: boolean = false;
    private logout: string;


    constructor(private fireDb: FireDbService,
                private router: Router,
                private popoverController: PopoverController,
                private localDbService: LocalDbService,
                private toastController: ToastController,
                private alertController: AlertController,) {
    }

    ngOnInit() {
        this.localDbService.getUserSettings()
            .then(
                () => console.log(''),
                () => console.log('')
            );



        this.localDbService.settingsObservable.subscribe((settings: Settings) => {
            if (settings.viewKind == 'listView') {
                this.slideView = false;
            } else if (settings.viewKind == 'slideView') {
                this.slideView = true;

                //muss leider noch einmal hier sein, da andernfalls bei Änderungen von ViewKind kein Update stattfindet
                this.dashboardHivecards = this.fireDb.findAllHiveCards();
                if (this.dashboardHivecards.length > 0) {
                    this.showDashboard = true;
                } else {
                    this.showDashboard = false;
                }
                this.transitionFromVoelker();
                this.transitionFromStockkarten();
                //muss lider noch einmal hier sein, da andernfalls bei Änderungen von ViewKind kein Update stattfindet
            }
        });

        this.fireDb.listenHivesOfCurrentUser();

        this.fireDb.hivesObservable.subscribe((hives: Hive[]) => {
            this.hiveData = hives;

            //those are only needed if the slideview is selected
            if (this.slideView) {
                this.dashboardHivecards = this.fireDb.findAllHiveCards();
                if (this.dashboardHivecards.length > 0) {
                    this.showDashboard = true;
                } else {
                    this.showDashboard = false;
                }

                this.transitionFromVoelker();
                this.transitionFromStockkarten();
            }
        });
    }


    createHiveCard() {
        this.router.navigate(['hive-card-form', {hiveId: this.currentHive.id}]);
    }


    transitionFromStockkarten() {

        if (this.stockkartenSlide) {
            this.stockkartenSlide.getActiveIndex()
                .then(ret => {
                    this.stockkartenSlide.length()
                        .then((length) => {
                            if (length > 0) {
                                this.voelkerSlide.slideTo(ret);
                                this.setVisibleSlideRange(ret);

                                if (ret == 0 && this.showDashboard) {
                                    this.isNotDashboard = false;
                                } else {
                                    this.isNotDashboard = true;

                                }

                                if (this.showDashboard && ret > 0) {
                                    this.currentHive = this.hiveData[ret - 1];
                                } else {
                                    this.currentHive = this.hiveData[ret];
                                }

                            }
                        });
                });
        }
    }


    transitionFromVoelker() {
        if (this.voelkerSlide) {
            this.voelkerSlide.getActiveIndex()
                .then(ret => {

                    this.voelkerSlide.length()
                        .then((length) => {
                            if (length > 0) {
                                this.stockkartenSlide.slideTo(ret);
                                this.setVisibleSlideRange(ret);

                                if (ret == 0 && this.showDashboard) {
                                    this.isNotDashboard = false;
                                } else {
                                    this.isNotDashboard = true;
                                }

                                if (this.showDashboard && ret > 0) {
                                    this.currentHive = this.hiveData[ret - 1];
                                    //console.log('current Hive: ' + this.currentHive.id);
                                } else {
                                    this.currentHive = this.hiveData[ret];
                                    // console.log('current Hive: ' + this.currentHive.id);
                                }
                            }
                        });
                });
        }

    }


    setVisibleSlideRange(i: number) {
        let numSlides = this.hiveData.length;
        for (let index = 0; index < numSlides + 1; index++) {
            if (index == i) {
                this.slideVisibility(index);
            }
        }
    }

    slideVisibility(index: number) {
        if (this.showDashboard) {
            index--;
        }
        if (index >= 0 && this.hiveData.length > 0) {
            let hiveComponentId = this.hiveData[index].id;
            let slide = document.getElementById(hiveComponentId);
            let slider = document.getElementById('cardSlider');
            // console.log('height: ' + slide.offsetHeight.toString());

            if (slide.offsetHeight < window.innerHeight) {
                let ionContent = document.getElementById('ionContent');
                window.setTimeout(function() {
                    slider.style.height = ionContent.offsetHeight.toString() + 'px';
                }, 100);
            } else {
                window.setTimeout(function() {
                    slider.style.height = slide.offsetHeight.toString() + 'px';
                }, 100);
            }
        } else {
            let slide = document.getElementById('dashboard');
            let slider = document.getElementById('cardSlider');
            if (slide.offsetHeight < window.innerHeight) {
                let ionContent = document.getElementById('ionContent');
                window.setTimeout(function() {
                    slider.style.height = ionContent.offsetHeight.toString() + 'px';
                }, 100);
            } else {
                window.setTimeout(function() {
                    slider.style.height = slide.offsetHeight.toString() + 'px';
                }, 100);
            }
        }
    }


    async moreButton(ev: Event) {
        let popover = await this.popoverController.create({
            event: ev,
            component: MoreButtonPage,
            cssClass: 'custom-popover',
        });
        await popover.present();
    }

    checkIfnotNull(object: any) {
        if (object == null) {
            return false;
        }

        if (object === null) {
            return false;
        }

        if (typeof object === 'undefined') {
            return false;
        }
    }

    editHive(id: string) {
        this.router.navigate(['hive-form', {hiveId: this.currentHive.id}]);
    }


    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'bottom',
        });
        toast.present();
    }

    creatHive() {
        this.router.navigateByUrl('hive-form');
    }
}
