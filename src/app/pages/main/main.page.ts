import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSearchbar, IonSlides, NavController, PopoverController, ToastController} from '@ionic/angular';
import {Hive} from '../../model/hive.model';
import {Hivecard} from '../../model/hive-card.model';
import {MoreButtonPage} from '../more-button/more-button.page';
import {FireDbService} from '../../services/fire-db.service';
import {LocalDbService} from '../../services/local-db.service';
import {Settings} from '../../model/settings.model';
import {PushService} from '../../services/push.service';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})

/**
 * main page of this application
 */
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

    @ViewChild('searchbar')
    private searchbar: IonSearchbar;
    showSearch: boolean = false;
    showNothingFound: boolean = false;
    tempHiveData: Hive[] = [];


    /**
     *
     * @param fireDb
     * @param router
     * @param popoverController
     * @param localDbService
     * @param toastController
     * @param alertController
     */
    constructor(private fireDb: FireDbService,
                private router: Router,
                private popoverController: PopoverController,
                private localDbService: LocalDbService,
                private toastController: ToastController,
                private alertController: AlertController,) {
    }

    /**
     * subscribes to all data mandatory for a user
     */
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

        if(this.hiveData.length == 0) {

            this.fireDb.hives = this.localDbService.hives;
            this.hiveData = this.localDbService.hives;

            if (this.slideView) {
                // this.presentToast('in slideView')
                this.dashboardHivecards = this.fireDb.findAllHiveCards();
                if (this.dashboardHivecards.length > 0) {
                    this.showDashboard = true;
                } else {
                    this.showDashboard = false;
                }

                this.transitionFromVoelker();
                this.transitionFromStockkarten();
            }
        }




        this.fireDb.listenHivesOfCurrentUser();
        this.fireDb.hivesObservable.subscribe((hives: Hive[]) => {


            if(JSON.stringify((this.hiveData)) !== JSON.stringify(hives)) {
                this.hiveData = hives;
            }
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


    /**
     * routes to hive-card-form
     */
    createHiveCard() {
        this.router.navigate(['hive-card-form', {hiveId: this.currentHive.id}]);
    }


    /**
     * @ignore
     */
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


    /**
     * @ignore
     */
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


    /**
     * @ignore
     */
    setVisibleSlideRange(i: number) {
        let numSlides = this.hiveData.length;
        for (let index = 0; index < numSlides + 1; index++) {
            if (index == i) {
                this.slideVisibility(index);
            }
        }
    }


    /**
     * @ignore
     */
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


    /**
     * creates a popover for more options
     *
     * @param event
     */
    async moreButton(event: Event) {
        let popover = await this.popoverController.create({
            event: event,
            component: MoreButtonPage,
            cssClass: 'custom-popover',
        });
        await popover.present();
    }

    /**
     * @ignore
     */
    checkIfnotNull(object: any) {
        if (object == null) {
            return false;
        }

        if (typeof object === 'undefined') {
            return false;
        }
    }

    /**
     * routes hive-form for editing a given hive
     *
     * @param id
     */
    editHive(id: string) {
        this.router.navigate(['hive-form', {hiveId: this.currentHive.id}]);
    }


    /**
     * @ignore
     */
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'bottom',
        });
        toast.present();
    }

    /**
     * routes to hive-form to create a new hive
     */
    creatHive() {
        this.router.navigateByUrl('hive-form');
    }


    /**
     * self explanatory
     */
    initSearch() {

        if(this.showSearch) {
            this.showSearch = false;
            this.clearSearchbar();
            this.resetSearch();
        } else {
            this.showSearch = true;
            this.tempHiveData = this.hiveData;
            window.setTimeout(() => {
                this.searchbar.setFocus();
            },50);
        }

    }

    /**
     * self explanatory
     */
    doSearch(event) {

        const searchInput = event.target.value;

        if (searchInput && searchInput.trim() != "") {
            this.hiveData = this.hiveData.filter(hive => {
                return hive.name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1;
            });
            if (this.hiveData.length == 0) {
                this.showNothingFound = true;
            } else {
                this.showNothingFound = false;
            }
        } else if(searchInput.trim() == "") {
            this.hiveData = this.tempHiveData;
            this.showNothingFound = false;
        }
    }

    /**
     * @ignore
     */
    clearSearchbar() {
        this.searchbar.value = '';
        this.hiveData = this.tempHiveData;
        this.showNothingFound = false;
    }

    /**
     * @ignore
     */
    resetSearch() {
        this.showSearch = false;
        this.hiveData = this.tempHiveData;
        this.showNothingFound = false;
    }

    /**
     * @ignore
     */
    async anyDialog(msg: string) {
        const alert = await this.alertController.create({
            header: msg,
        });
        await alert.present();
    }

    //@TODO: this function is not even close to a value comparison
    /**
     * @ignore
     */
    compare(hivelist1: Hive[], hivelist2: Hive[]): boolean{

        if(hivelist1.length != hivelist2.length) {
            return false;
        }
        return true;
    }

}
