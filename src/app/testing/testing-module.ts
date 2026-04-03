import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Events } from './events/events';
import { GetsetInputValue } from './getset-input-value/getset-input-value';
import { IfElseComponent } from './if-else-component/if-else-component';
import { LoopComponent } from './loop-component/loop-component';
import { SignalComponent } from './signal-component/signal-component';
import { TwoWayBindingComponent } from './two-way-binding-component/two-way-binding-component';
import { Reactiveform } from './reactiveform/reactiveform';

@NgModule({
  declarations: [],
  imports: [CommonModule,Events,GetsetInputValue,IfElseComponent,LoopComponent,SignalComponent,TwoWayBindingComponent,Reactiveform],
  exports: [Events,GetsetInputValue,IfElseComponent,LoopComponent,SignalComponent,TwoWayBindingComponent,Reactiveform]
})
export class TestingModule {}
