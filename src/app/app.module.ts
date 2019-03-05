import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfluencersComponent } from './influencers/influencers.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InfluencersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TagInputModule,
    HttpClientModule,
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
