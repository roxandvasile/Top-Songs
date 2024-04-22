import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SongComponent } from './components/song/song.component';
import { TopComponent } from './components/top/top.component';
import { FormComponent } from './components/form/form.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent, SongComponent, TopComponent, FormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
