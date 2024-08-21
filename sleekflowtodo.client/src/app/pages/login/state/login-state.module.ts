import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { todoFeature } from "./reducers/todo.reducers";
import { TodoEffects } from './effects/todo.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(todoFeature),
    EffectsModule.forFeature([TodoEffects]),
  ],
})
export class TodoStateModule { }
