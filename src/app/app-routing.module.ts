import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'hive-card-form', loadChildren: './pages/hive-card-form/hive-card-form.module#HiveCardFormPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'create-account', loadChildren: './pages/create-account/create-account.module#CreateAccountPageModule' },
  { path: 'hive-form', loadChildren: './pages/hive-form/hive-form.module#HiveFormPageModule' },
  { path: 'authentication', loadChildren: './pages/authentication/authentication.module#AuthenticationPageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'color-picker', loadChildren: './pages/color-picker/color-picker.module#ColorPickerPageModule' },
  { path: 'smiley-picker', loadChildren: './pages/smiley-picker/smiley-picker.module#SmileyPickerPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
