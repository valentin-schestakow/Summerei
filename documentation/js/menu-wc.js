'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">summerei documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-8676a627b583d796a1e717633a302691"' : 'data-target="#xs-components-links-module-AppModule-8676a627b583d796a1e717633a302691"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8676a627b583d796a1e717633a302691"' :
                                            'id="xs-components-links-module-AppModule-8676a627b583d796a1e717633a302691"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-8676a627b583d796a1e717633a302691"' : 'data-target="#xs-injectables-links-module-AppModule-8676a627b583d796a1e717633a302691"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8676a627b583d796a1e717633a302691"' :
                                        'id="xs-injectables-links-module-AppModule-8676a627b583d796a1e717633a302691"' }>
                                        <li class="link">
                                            <a href="injectables/FireAuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FireAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FireDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FireDbService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationPageModule.html" data-type="entity-link">AuthenticationPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthenticationPageModule-b50a34caf4ef3ca7287042d744fd130d"' : 'data-target="#xs-components-links-module-AuthenticationPageModule-b50a34caf4ef3ca7287042d744fd130d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationPageModule-b50a34caf4ef3ca7287042d744fd130d"' :
                                            'id="xs-components-links-module-AuthenticationPageModule-b50a34caf4ef3ca7287042d744fd130d"' }>
                                            <li class="link">
                                                <a href="components/AuthenticationPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthenticationPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColorPickerPageModule.html" data-type="entity-link">ColorPickerPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ColorPickerPageModule-b50ecc02f7a09c0f2f6df8ec3945b0e7"' : 'data-target="#xs-components-links-module-ColorPickerPageModule-b50ecc02f7a09c0f2f6df8ec3945b0e7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ColorPickerPageModule-b50ecc02f7a09c0f2f6df8ec3945b0e7"' :
                                            'id="xs-components-links-module-ColorPickerPageModule-b50ecc02f7a09c0f2f6df8ec3945b0e7"' }>
                                            <li class="link">
                                                <a href="components/ColorPickerPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorPickerPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntryPageModule.html" data-type="entity-link">EntryPageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HiveCardFormPageModule.html" data-type="entity-link">HiveCardFormPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HiveCardFormPageModule-1fb3071eb1e3707d6436084dbe8978f7"' : 'data-target="#xs-components-links-module-HiveCardFormPageModule-1fb3071eb1e3707d6436084dbe8978f7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HiveCardFormPageModule-1fb3071eb1e3707d6436084dbe8978f7"' :
                                            'id="xs-components-links-module-HiveCardFormPageModule-1fb3071eb1e3707d6436084dbe8978f7"' }>
                                            <li class="link">
                                                <a href="components/HiveCardFormPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HiveCardFormPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HivedetailPageModule.html" data-type="entity-link">HivedetailPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HivedetailPageModule-f39f937972075e8cce0c001c10833583"' : 'data-target="#xs-components-links-module-HivedetailPageModule-f39f937972075e8cce0c001c10833583"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HivedetailPageModule-f39f937972075e8cce0c001c10833583"' :
                                            'id="xs-components-links-module-HivedetailPageModule-f39f937972075e8cce0c001c10833583"' }>
                                            <li class="link">
                                                <a href="components/HivedetailPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HivedetailPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HiveFormPageModule.html" data-type="entity-link">HiveFormPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HiveFormPageModule-f62048fa237d6f3aed96e3f532cf9d0e"' : 'data-target="#xs-components-links-module-HiveFormPageModule-f62048fa237d6f3aed96e3f532cf9d0e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HiveFormPageModule-f62048fa237d6f3aed96e3f532cf9d0e"' :
                                            'id="xs-components-links-module-HiveFormPageModule-f62048fa237d6f3aed96e3f532cf9d0e"' }>
                                            <li class="link">
                                                <a href="components/HiveFormPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HiveFormPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HivePageModule.html" data-type="entity-link">HivePageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InvitePageModule.html" data-type="entity-link">InvitePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InvitePageModule-1033064bd37ca1c7b1a9d88775f2800c"' : 'data-target="#xs-components-links-module-InvitePageModule-1033064bd37ca1c7b1a9d88775f2800c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InvitePageModule-1033064bd37ca1c7b1a9d88775f2800c"' :
                                            'id="xs-components-links-module-InvitePageModule-1033064bd37ca1c7b1a9d88775f2800c"' }>
                                            <li class="link">
                                                <a href="components/InvitePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvitePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link">LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' : 'data-target="#xs-components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' :
                                            'id="xs-components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MainPageModule.html" data-type="entity-link">MainPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MainPageModule-cad1285e26ba03c4666706e7e1ac500e"' : 'data-target="#xs-components-links-module-MainPageModule-cad1285e26ba03c4666706e7e1ac500e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MainPageModule-cad1285e26ba03c4666706e7e1ac500e"' :
                                            'id="xs-components-links-module-MainPageModule-cad1285e26ba03c4666706e7e1ac500e"' }>
                                            <li class="link">
                                                <a href="components/MainPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MenuPageModule.html" data-type="entity-link">MenuPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MenuPageModule-33917017590fc14b53766360dfbd9fc5"' : 'data-target="#xs-components-links-module-MenuPageModule-33917017590fc14b53766360dfbd9fc5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MenuPageModule-33917017590fc14b53766360dfbd9fc5"' :
                                            'id="xs-components-links-module-MenuPageModule-33917017590fc14b53766360dfbd9fc5"' }>
                                            <li class="link">
                                                <a href="components/MenuPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenuPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MoreButtonPageModule.html" data-type="entity-link">MoreButtonPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MoreButtonPageModule-dddae7720197411941caac74aa3a71fb"' : 'data-target="#xs-components-links-module-MoreButtonPageModule-dddae7720197411941caac74aa3a71fb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MoreButtonPageModule-dddae7720197411941caac74aa3a71fb"' :
                                            'id="xs-components-links-module-MoreButtonPageModule-dddae7720197411941caac74aa3a71fb"' }>
                                            <li class="link">
                                                <a href="components/MoreButtonPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MoreButtonPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageModule.html" data-type="entity-link">SettingsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsPageModule-f5dc1deef3e964dc4591d1d28b0c27d4"' : 'data-target="#xs-components-links-module-SettingsPageModule-f5dc1deef3e964dc4591d1d28b0c27d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsPageModule-f5dc1deef3e964dc4591d1d28b0c27d4"' :
                                            'id="xs-components-links-module-SettingsPageModule-f5dc1deef3e964dc4591d1d28b0c27d4"' }>
                                            <li class="link">
                                                <a href="components/SettingsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SmileyPickerPageModule.html" data-type="entity-link">SmileyPickerPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SmileyPickerPageModule-daf1b9bd9ec92659f4bbd299e9dd32d5"' : 'data-target="#xs-components-links-module-SmileyPickerPageModule-daf1b9bd9ec92659f4bbd299e9dd32d5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SmileyPickerPageModule-daf1b9bd9ec92659f4bbd299e9dd32d5"' :
                                            'id="xs-components-links-module-SmileyPickerPageModule-daf1b9bd9ec92659f4bbd299e9dd32d5"' }>
                                            <li class="link">
                                                <a href="components/SmileyPickerPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SmileyPickerPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StartLoadingPageModule.html" data-type="entity-link">StartLoadingPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StartLoadingPageModule-27dac1aeb8e89d550ca8cf439edaf524"' : 'data-target="#xs-components-links-module-StartLoadingPageModule-27dac1aeb8e89d550ca8cf439edaf524"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StartLoadingPageModule-27dac1aeb8e89d550ca8cf439edaf524"' :
                                            'id="xs-components-links-module-StartLoadingPageModule-27dac1aeb8e89d550ca8cf439edaf524"' }>
                                            <li class="link">
                                                <a href="components/LoadingScreenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadingScreenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StartLoadingPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StartLoadingPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/HiveListComponent.html" data-type="entity-link">HiveListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SliderItemComponent.html" data-type="entity-link">SliderItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WeatherComponent.html" data-type="entity-link">WeatherComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirestoreWeather.html" data-type="entity-link">FirestoreWeather</a>
                            </li>
                            <li class="link">
                                <a href="classes/Forecast.html" data-type="entity-link">Forecast</a>
                            </li>
                            <li class="link">
                                <a href="classes/Hive.html" data-type="entity-link">Hive</a>
                            </li>
                            <li class="link">
                                <a href="classes/Hivecard.html" data-type="entity-link">Hivecard</a>
                            </li>
                            <li class="link">
                                <a href="classes/Settings.html" data-type="entity-link">Settings</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/Weather.html" data-type="entity-link">Weather</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FireAuthService.html" data-type="entity-link">FireAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FireDbService.html" data-type="entity-link">FireDbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalDbService.html" data-type="entity-link">LocalDbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PushService.html" data-type="entity-link">PushService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WeatherService.html" data-type="entity-link">WeatherService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});