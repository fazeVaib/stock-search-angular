import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TopNavBar } from './nav-bar/nav-bar.components';
import { SearchSegment } from './search-segment/search-segment.components';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBar,
    SearchSegment
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
