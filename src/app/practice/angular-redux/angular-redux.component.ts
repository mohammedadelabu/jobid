import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { INCREMENT } from 'src/STORE/actions';
import { IAppState } from 'src/STORE/store';

@Component({
  selector: 'app-angular-redux',
  templateUrl: './angular-redux.component.html',
  styleUrls: ['./angular-redux.component.scss']
})
export class AngularReduxComponent implements OnInit {
  // counter = 0;
  @select('counter') count!:number | any; // 1st way to use the @select decorator (string)

  // @select(['messaging', 'newMessages']) newMessages!:number | any; // 2nd way to use the @select decorator (array)
  // @select((s:IAppState)=> s.messaging?.newNessages) newMessagesCount!:number | any; // 3rd way to use the @select decorator (arrow function)


  constructor(private _ngRedux: NgRedux<IAppState>) {
    // this._ngRedux.subscribe(()=>{
    //   console.log(_ngRedux.getState())
    // })
  }

  ngOnInit(): void {}

  increment() {
    // this.counter++;
    this._ngRedux.dispatch({ type: INCREMENT });
  }
}
