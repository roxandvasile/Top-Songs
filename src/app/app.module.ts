import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SongComponent } from './components/song/song.component';
import { TopComponent } from './components/top/top.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [AppComponent, SongComponent, TopComponent, FormComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
