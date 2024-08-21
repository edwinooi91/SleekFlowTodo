import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { TodoStateModule } from './pages/todo/state/todo-state.module';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './pages/login/components/login.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    LoginComponent,
    TodoStateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
