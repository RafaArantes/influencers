import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenubarComponent } from './menubar/menubar.component';
import { InfluencersComponent } from './influencers/influencers.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenubarComponent,
    InfluencersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TagInputModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'influencers', component: InfluencersComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
